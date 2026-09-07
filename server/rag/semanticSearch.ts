import path from 'path';
import { pipeline, env, FeatureExtractionPipeline } from '@xenova/transformers';
import { LegalChunk, Jurisdiction, ProductClassification } from '../../src/types.js';
import { AYURVEDA_LEGAL_CORPUS } from '../data/corpus/ayurvedaLegalCorpus.js';

// ============================================================================
// STRICT OFFLINE SETTINGS FOR EMBEDDING INFERENCE
// ============================================================================
// Enforce local-only execution: no remote calls, no telemetry, no HuggingFace network requests
env.allowRemoteModels = false;
env.allowLocalModels = true;
env.localModelPath = path.join(process.cwd(), 'models');

export const LOCAL_EMBEDDING_MODEL = 'Xenova/all-MiniLM-L6-v2';

// ============================================================================
// CONFIGURABLE HYBRID SEARCH PARAMETERS
// ============================================================================
export type FusionStrategy = 'max' | 'weighted';

export interface HybridRetrieverConfig {
  /**
   * 'max': Takes Math.max(tfidfScore, semanticScore) - ideal for combining exact section matches with conceptual paraphrasing
   * 'weighted': Takes (tfidfWeight * tfidfScore) + (semanticWeight * semanticScore)
   */
  fusionStrategy: FusionStrategy;
  /** Weight for TF-IDF score in 'weighted' strategy (0.0 to 1.0) */
  tfidfWeight: number;
  /** Weight for Semantic score in 'weighted' strategy (0.0 to 1.0) */
  semanticWeight: number;
  /**
   * Tunable guardrail threshold (θ) for hybrid scoring.
   * Because embedding cosine similarity distributions differ from sparse TF-IDF,
   * this is configured separately from the pure TF-IDF threshold (0.22).
   * Default: 0.26 (empirically rejects out-of-scope queries while passing paraphrased legal queries).
   */
  hybridGuardrailThreshold: number;
}

export const DEFAULT_HYBRID_CONFIG: HybridRetrieverConfig = {
  /**
   * Fusion strategy:
   * - 'weighted' (default): finalScore = (tfidfWeight * tfidfScore) + (semanticWeight * semanticScore)
   *   Balances exact statutory lexical matches with conceptual paraphrasing.
   * - 'max': finalScore = Math.max(tfidfScore, semanticScore)
   *   Selects the highest scoring path. Note: if using 'max', hybridGuardrailThreshold should be calibrated to ~0.35.
   */
  fusionStrategy: 'weighted',
  tfidfWeight: 0.5,
  semanticWeight: 0.5,
  /**
   * Tunable guardrail threshold (θ) for hybrid scoring.
   * Because embedding cosine similarity distributions differ from sparse TF-IDF:
   * - For 'weighted' fusion (0.5/0.5), θ = 0.22 provides optimal separation.
   * - For 'max' fusion, θ should be empirically tuned to ~0.35.
   */
  hybridGuardrailThreshold: 0.22
};

// Global active configuration (can be tuned at runtime or via environment)
export const HYBRID_CONFIG: HybridRetrieverConfig = {
  ...DEFAULT_HYBRID_CONFIG,
  fusionStrategy: (process.env.HYBRID_FUSION_STRATEGY as FusionStrategy) || DEFAULT_HYBRID_CONFIG.fusionStrategy,
  tfidfWeight: process.env.TFIDF_WEIGHT ? parseFloat(process.env.TFIDF_WEIGHT) : DEFAULT_HYBRID_CONFIG.tfidfWeight,
  semanticWeight: process.env.SEMANTIC_WEIGHT ? parseFloat(process.env.SEMANTIC_WEIGHT) : DEFAULT_HYBRID_CONFIG.semanticWeight,
  hybridGuardrailThreshold: process.env.HYBRID_GUARDRAIL_THRESHOLD ? parseFloat(process.env.HYBRID_GUARDRAIL_THRESHOLD) : DEFAULT_HYBRID_CONFIG.hybridGuardrailThreshold
};

// ============================================================================
// IN-MEMORY EMBEDDING CACHE & INFERENCE SERVICE
// ============================================================================
class LocalSemanticEngine {
  private pipelinePromise: Promise<FeatureExtractionPipeline> | null = null;
  private chunkEmbeddings: Map<string, Float32Array> = new Map();
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  /**
   * Loads the local quantized ONNX pipeline.
   * Runs 100% locally with zero external network access.
   */
  private async getPipeline(): Promise<FeatureExtractionPipeline> {
    if (!this.pipelinePromise) {
      this.pipelinePromise = pipeline('feature-extraction', LOCAL_EMBEDDING_MODEL, {
        quantized: true,
        local_files_only: true
      }) as Promise<FeatureExtractionPipeline>;
    }
    return this.pipelinePromise;
  }

  /**
   * Generates rich textual representation of a statutory chunk for embedding.
   */
  private buildChunkEmbeddingText(chunk: LegalChunk): string {
    return `${chunk.act}. ${chunk.section}: ${chunk.title}. ${chunk.summary}. Keywords: ${chunk.keywords.join(', ')}. Topics: ${chunk.topics.join(', ')}. Details: ${chunk.content}`;
  }

  /**
   * Precomputes and caches 384-dimensional unit-normalized embeddings
   * for all 15 statutory chunks in memory once at startup.
   */
  public async initializeIndex(corpus: LegalChunk[] = AYURVEDA_LEGAL_CORPUS): Promise<void> {
    if (this.isInitialized) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      const extractor = await this.getPipeline();
      for (const chunk of corpus) {
        if (!this.chunkEmbeddings.has(chunk.id)) {
          const text = this.buildChunkEmbeddingText(chunk);
          const output = await extractor(text, { pooling: 'mean', normalize: true });
          this.chunkEmbeddings.set(chunk.id, new Float32Array(output.data));
        }
      }
      this.isInitialized = true;
    })();

    return this.initPromise;
  }

  /**
   * Embeds a query string using the local model.
   * Returns a 384-dimensional unit-normalized Float32Array.
   */
  public async embedQuery(query: string): Promise<Float32Array> {
    await this.initializeIndex();
    const extractor = await this.getPipeline();
    const output = await extractor(query, { pooling: 'mean', normalize: true });
    return new Float32Array(output.data);
  }

  /**
   * Calculates cosine similarity between a query vector and precomputed chunk vector.
   * Since both vectors are L2-normalized (unit length), cosine similarity equals their dot product.
   */
  public computeCosineSimilarity(vecA: Float32Array, vecB: Float32Array): number {
    let dot = 0;
    const len = Math.min(vecA.length, vecB.length);
    for (let i = 0; i < len; i++) {
      dot += vecA[i] * vecB[i];
    }
    return dot;
  }

  /**
   * Computes semantic similarity scores for all cached statutory chunks against the query vector.
   */
  public async computeSemanticScores(
    query: string,
    options: { jurisdiction: Jurisdiction; productType?: ProductClassification }
  ): Promise<Map<string, number>> {
    await this.initializeIndex();
    const queryVector = await this.embedQuery(query);
    const scores = new Map<string, number>();

    for (const [chunkId, chunkVector] of this.chunkEmbeddings.entries()) {
      const rawCosine = this.computeCosineSimilarity(queryVector, chunkVector);
      // Bound negative scores to 0
      const normalizedScore = Math.max(0, Math.min(1.0, rawCosine));
      scores.set(chunkId, normalizedScore);
    }

    return scores;
  }

  public isReady(): boolean {
    return this.isInitialized;
  }

  public getCachedChunkCount(): number {
    return this.chunkEmbeddings.size;
  }
}

export const semanticEngine = new LocalSemanticEngine();

export async function initializeSemanticIndex(): Promise<void> {
  await semanticEngine.initializeIndex();
}
