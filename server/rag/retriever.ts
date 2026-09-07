import { LegalChunk, ProductClassification, Jurisdiction } from '../../src/types.js';
import { AYURVEDA_LEGAL_CORPUS } from '../data/corpus/ayurvedaLegalCorpus.js';
import { semanticEngine, HYBRID_CONFIG, HybridRetrieverConfig } from './semanticSearch.js';

export interface RetrievalResult {
  chunk: LegalChunk;
  score: number;
  tfidfScore?: number;
  semanticScore?: number;
  matchReasons: string[];
}

export interface RetrievalQueryOptions {
  query: string;
  jurisdiction: Jurisdiction;
  productType?: ProductClassification;
  topK?: number;
  confidenceThreshold?: number;
  hybridConfig?: Partial<HybridRetrieverConfig>;
}

// Stop words for clean TF-IDF tokenization
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from',
  'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself',
  'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most',
  'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other',
  'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'should', 'so', 'some', 'such', 'than',
  'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this',
  'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what',
  'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'would', 'you', 'your',
  'yours', 'yourself', 'yourselves', 'please', 'tell', 'help', 'know', 'want', 'get', 'give'
]);

export class LegalRetriever {
  private corpus: LegalChunk[];
  private idfMap: Map<string, number> = new Map();
  private docVectors: Map<string, Map<string, number>> = new Map();
  private docMagnitudes: Map<string, number> = new Map();

  constructor(corpus: LegalChunk[] = AYURVEDA_LEGAL_CORPUS) {
    this.corpus = corpus;
    this.buildIndex();
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s\(\)\.\-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
  }

  private buildIndex() {
    const totalDocs = this.corpus.length;
    const docFrequencies: Map<string, number> = new Map();

    // 1. Calculate document frequencies
    for (const chunk of this.corpus) {
      const fullText = `${chunk.act} ${chunk.section} ${chunk.title} ${chunk.summary} ${chunk.content} ${chunk.keywords.join(' ')} ${chunk.topics.join(' ')}`;
      const tokens = new Set(this.tokenize(fullText));
      for (const token of tokens) {
        docFrequencies.set(token, (docFrequencies.get(token) || 0) + 1);
      }
    }

    // 2. Compute IDF: log((N + 1) / (df + 1)) + 1
    for (const [token, df] of docFrequencies.entries()) {
      const idf = Math.log((totalDocs + 1) / (df + 1)) + 1;
      this.idfMap.set(token, idf);
    }

    // 3. Compute TF-IDF vectors for all chunks
    for (const chunk of this.corpus) {
      const fullText = `${chunk.act} ${chunk.section} ${chunk.title} ${chunk.summary} ${chunk.content} ${chunk.keywords.join(' ')} ${chunk.topics.join(' ')}`;
      const tokens = this.tokenize(fullText);
      const tfMap: Map<string, number> = new Map();

      // Weight titles and keywords more heavily
      const titleTokens = this.tokenize(`${chunk.section} ${chunk.title} ${chunk.keywords.join(' ')}`);
      for (const token of tokens) {
        tfMap.set(token, (tfMap.get(token) || 0) + 1);
      }
      for (const token of titleTokens) {
        tfMap.set(token, (tfMap.get(token) || 0) + 2);
      }

      const vector: Map<string, number> = new Map();
      let sumSq = 0;

      for (const [token, count] of tfMap.entries()) {
        const idf = this.idfMap.get(token) || 1;
        const tf = 1 + Math.log(count);
        const weight = tf * idf;
        vector.set(token, weight);
        sumSq += weight * weight;
      }

      this.docVectors.set(chunk.id, vector);
      this.docMagnitudes.set(chunk.id, Math.sqrt(sumSq) || 1);
    }
  }

  /**
   * Pure TF-IDF Retrieval Pipeline (Deterministic Lexical Cosine Similarity)
   * Kept exactly intact as a standalone retrieval method and component of hybrid search.
   */
  public retrieveTfidf(options: RetrievalQueryOptions): {
    results: RetrievalResult[];
    topScore: number;
    isConfident: boolean;
    confidenceThreshold: number;
  } {
    const {
      query,
      jurisdiction,
      productType,
      topK = 3,
      confidenceThreshold = 0.22 // Default threshold for pure TF-IDF
    } = options;

    const queryTokens = this.tokenize(query);
    if (queryTokens.length === 0) {
      return { results: [], topScore: 0, isConfident: false, confidenceThreshold };
    }

    // Compute Query TF-IDF Vector
    const queryTf: Map<string, number> = new Map();
    for (const token of queryTokens) {
      queryTf.set(token, (queryTf.get(token) || 0) + 1);
    }

    const queryVector: Map<string, number> = new Map();
    let qSumSq = 0;
    for (const [token, count] of queryTf.entries()) {
      const idf = this.idfMap.get(token) || Math.log(this.corpus.length + 1) + 1;
      const tf = 1 + Math.log(count);
      const weight = tf * idf;
      queryVector.set(token, weight);
      qSumSq += weight * weight;
    }
    const queryMag = Math.sqrt(qSumSq) || 1;

    // Filter and score chunks
    const scored: RetrievalResult[] = [];
    const normalizedQuery = query.toLowerCase();

    for (const chunk of this.corpus) {
      // Strict Jurisdiction Filtering
      if (chunk.jurisdiction !== jurisdiction) {
        continue;
      }

      // Product Type Relevance Weighting
      let productBoost = 1.0;
      if (productType) {
        const applies = chunk.productTypes.includes(productType) || chunk.productTypes.includes('all');
        productBoost = applies ? 1.25 : 0.85;
      }

      // Cosine Similarity Calculation
      const docVec = this.docVectors.get(chunk.id);
      const docMag = this.docMagnitudes.get(chunk.id) || 1;
      if (!docVec) continue;

      let dotProduct = 0;
      const matchReasons: string[] = [];

      for (const [token, qWeight] of queryVector.entries()) {
        const dWeight = docVec.get(token);
        if (dWeight) {
          dotProduct += qWeight * dWeight;
          if (matchReasons.length < 4) {
            matchReasons.push(token);
          }
        }
      }

      let rawCosine = dotProduct / (queryMag * docMag);

      // Exact Keyphrase / Section Match Boosts
      if (
        (chunk.section.toLowerCase().includes('3(p)') && normalizedQuery.includes('3(p)')) ||
        (chunk.section.toLowerCase().includes('3(d)') && normalizedQuery.includes('3(d)')) ||
        (chunk.section.toLowerCase().includes('3(e)') && normalizedQuery.includes('3(e)')) ||
        (chunk.section.toLowerCase().includes('158b') && (normalizedQuery.includes('158b') || normalizedQuery.includes('license'))) ||
        (chunk.section.toLowerCase().includes('section 6') && normalizedQuery.includes('nba')) ||
        (chunk.act.toLowerCase().includes('gratk') && normalizedQuery.includes('gratk')) ||
        (chunk.act.toLowerCase().includes('trips') && normalizedQuery.includes('trips')) ||
        (chunk.act.toLowerCase().includes('aahar') && (normalizedQuery.includes('aahar') || normalizedQuery.includes('fssai')))
      ) {
        rawCosine = Math.max(rawCosine, 0.45) * 1.35;
        matchReasons.push('Direct statutory reference match');
      }

      const finalScore = Math.min(1.0, rawCosine * productBoost);

      if (finalScore > 0.02) {
        scored.push({
          chunk,
          score: Math.round(finalScore * 100) / 100,
          tfidfScore: Math.round(finalScore * 100) / 100,
          matchReasons
        });
      }
    }

    // Rank by score descending
    scored.sort((a, b) => b.score - a.score);

    const topResults = scored.slice(0, topK);
    const topScore = topResults.length > 0 ? topResults[0].score : 0;
    const isConfident = topScore >= confidenceThreshold;

    return {
      results: topResults,
      topScore,
      isConfident,
      confidenceThreshold
    };
  }

  /**
   * Hybrid Retrieval Pipeline: Combines TF-IDF Lexical Cosine Similarity
   * with In-Memory Local Semantic Embeddings.
   * Runs 100% offline with zero external network or API dependencies.
   */
  public async retrieve(options: RetrievalQueryOptions): Promise<{
    results: RetrievalResult[];
    topScore: number;
    isConfident: boolean;
    confidenceThreshold: number;
  }> {
    const {
      query,
      jurisdiction,
      productType,
      topK = 3,
      hybridConfig
    } = options;

    // Merge active config with query overrides
    const config = {
      ...HYBRID_CONFIG,
      ...hybridConfig
    };

    const effectiveThreshold = options.confidenceThreshold ?? config.hybridGuardrailThreshold;

    // 1. Run TF-IDF Lexical Retrieval
    const tfidfOutput = this.retrieveTfidf({
      query,
      jurisdiction,
      productType,
      topK: this.corpus.length,
      confidenceThreshold: 0
    });

    const tfidfScoresMap = new Map<string, { score: number; matchReasons: string[] }>();
    for (const res of tfidfOutput.results) {
      tfidfScoresMap.set(res.chunk.id, {
        score: res.score,
        matchReasons: res.matchReasons
      });
    }

    // 2. Run Local In-Memory Semantic Similarity Retrieval (Zero External Calls)
    const semanticScoresMap = await semanticEngine.computeSemanticScores(query, {
      jurisdiction,
      productType
    });

    // 3. Combine TF-IDF and Semantic Scores per Chunk
    const scoredChunks: RetrievalResult[] = [];

    for (const chunk of this.corpus) {
      if (chunk.jurisdiction !== jurisdiction) {
        continue;
      }

      const tfidfData = tfidfScoresMap.get(chunk.id);
      const rawTfidfScore = tfidfData ? tfidfData.score : 0;
      const rawSemanticScore = semanticScoresMap.get(chunk.id) || 0;

      // Product Type relevance boost
      let productBoost = 1.0;
      if (productType) {
        const applies = chunk.productTypes.includes(productType) || chunk.productTypes.includes('all');
        productBoost = applies ? 1.15 : 0.90;
      }

      const tfidfScore = Math.min(1.0, rawTfidfScore * productBoost);
      const semanticScore = Math.min(1.0, rawSemanticScore * productBoost);

      // Score Fusion Strategy: 'max' vs 'weighted'
      let finalCombinedScore: number;
      if (config.fusionStrategy === 'max') {
        finalCombinedScore = Math.max(tfidfScore, semanticScore);
      } else {
        // Weighted blend: e.g. 0.5 * tfidfScore + 0.5 * semanticScore
        finalCombinedScore = (config.tfidfWeight * tfidfScore) + (config.semanticWeight * semanticScore);
      }

      finalCombinedScore = Math.round(Math.min(1.0, finalCombinedScore) * 100) / 100;

      const combinedMatchReasons: string[] = [];
      if (tfidfData && tfidfData.matchReasons.length > 0) {
        combinedMatchReasons.push(...tfidfData.matchReasons);
      }
      if (rawSemanticScore >= 0.25) {
        combinedMatchReasons.push(`Semantic concept alignment: ${Math.round(rawSemanticScore * 100)}%`);
      }

      if (finalCombinedScore > 0.05) {
        scoredChunks.push({
          chunk,
          score: finalCombinedScore,
          tfidfScore: Math.round(tfidfScore * 100) / 100,
          semanticScore: Math.round(semanticScore * 100) / 100,
          matchReasons: combinedMatchReasons
        });
      }
    }

    // Rank by score descending
    scoredChunks.sort((a, b) => b.score - a.score);

    const topResults = scoredChunks.slice(0, topK);
    const topScore = topResults.length > 0 ? topResults[0].score : 0;
    const isConfident = topScore >= effectiveThreshold;

    return {
      results: topResults,
      topScore,
      isConfident,
      confidenceThreshold: effectiveThreshold
    };
  }

  public getAllChunks(): LegalChunk[] {
    return this.corpus;
  }

  public getChunkById(id: string): LegalChunk | undefined {
    return this.corpus.find((c) => c.id === id);
  }
}

export const globalRetriever = new LegalRetriever();
