import {
  Citation,
  ComplianceItem,
  Jurisdiction,
  ProductClassification,
  LanguageCode
} from '../../src/types.js';
import { LegalRetriever, RetrievalResult } from './retriever.js';

export interface ReasonerOutput {
  oneLinerVerdict: string;
  statutoryChunkText: string;
  plainExplanation: string;
  citations: Citation[];
  complianceChecklist: ComplianceItem[];
  confidenceScore: number;
  isGuardrailRefusal: boolean;
  refusalReason?: string;
  statutorySummary: string;
}

export class DeterministicLegalReasoner {
  private retriever: LegalRetriever;

  constructor(retriever: LegalRetriever) {
    this.retriever = retriever;
  }

  public async reason(params: {
    query: string;
    jurisdiction: Jurisdiction;
    productType?: ProductClassification;
    language?: LanguageCode;
    confidenceThreshold?: number;
  }): Promise<ReasonerOutput> {
    const { query, jurisdiction, productType, confidenceThreshold } = params;

    // 1. Perform grounded hybrid retrieval (TF-IDF + Local Semantic Search)
    const retrieval = await this.retriever.retrieve({
      query,
      jurisdiction,
      productType,
      topK: 2,
      confidenceThreshold
    });

    // 2. Guardrail Check: Zero-Hallucination Threshold
    if (!retrieval.isConfident || retrieval.results.length === 0) {
      return {
        oneLinerVerdict: 'Verdict: Query is out of statutory scope or below verification confidence threshold.',
        statutoryChunkText: '',
        plainExplanation:
          "I don't have verified legal information on this query in the statutory corpus — consider consulting a licensed IP professional or the relevant statutory authority (such as the Indian Patent Office, National Biodiversity Authority, or CDSCO).",
        citations: [],
        complianceChecklist: [],
        confidenceScore: retrieval.topScore,
        isGuardrailRefusal: true,
        refusalReason:
          retrieval.topScore === 0
            ? 'Query contains no recognized statutory keywords or concepts within the active legal corpus.'
            : `Retrieval relevance score (${Math.round(retrieval.topScore * 100)}%) did not clear the mandatory confidence threshold (${Math.round(retrieval.confidenceThreshold * 100)}%).`,
        statutorySummary: 'Out-of-Scope / Low Statutory Confidence'
      };
    }

    const primaryResult = retrieval.results[0];
    const chunk = primaryResult.chunk;

    // 3. Extract exact statutory citations
    const citations: Citation[] = retrieval.results.map((res) => ({
      chunkId: res.chunk.id,
      act: res.chunk.act,
      section: res.chunk.section,
      title: res.chunk.title,
      exactText: res.chunk.content,
      jurisdiction: res.chunk.jurisdiction,
      statutoryAuthority: res.chunk.statutoryAuthority
    }));

    // 4. Build Structured Compliance Checklist
    const complianceChecklist: ComplianceItem[] = chunk.complianceSteps.map((step, idx) => ({
      id: `${chunk.id}-step-${idx + 1}`,
      task: step.task,
      statutoryRef: step.statutoryRef,
      mandatory: step.mandatory,
      completed: false
    }));

    // If there is a secondary chunk, include high-priority compliance steps from it
    if (retrieval.results.length > 1) {
      const secondaryChunk = retrieval.results[1].chunk;
      if (secondaryChunk.id !== chunk.id) {
        secondaryChunk.complianceSteps.forEach((step, idx) => {
          if (step.mandatory && complianceChecklist.length < 5) {
            complianceChecklist.push({
              id: `${secondaryChunk.id}-sec-step-${idx + 1}`,
              task: step.task,
              statutoryRef: step.statutoryRef,
              mandatory: step.mandatory,
              completed: false
            });
          }
        });
      }
    }

    // 5. Build Crisp One-Liner Verdict (Can you patent or not? Which act to overcome?)
    const productContext = productType ? this.getProductTypeLabel(productType) : 'Ayurvedic product';
    const oneLinerVerdict = this.buildOneLinerVerdict(chunk, productContext);
    const statutoryChunkText = chunk.content;

    // 6. Synthesize Plain-Language Explanation Grounded Directly in Statute
    const detailedExplanation = this.buildExplanation(query, chunk, productContext, jurisdiction);

    // Structure with one-liner verdict at the very start, followed by the required document chunk, then analysis
    const structuredPlainExplanation = `⚖️ **Patentability Verdict (One-Liner):**\n${oneLinerVerdict}\n\n📜 **Required Statutory Document Chunk (${chunk.shortAct} — ${chunk.section}):**\n"${statutoryChunkText}"\n\n💡 **Legal Analysis & Next Steps:**\n${detailedExplanation}`;

    return {
      oneLinerVerdict,
      statutoryChunkText,
      plainExplanation: structuredPlainExplanation,
      citations,
      complianceChecklist,
      confidenceScore: primaryResult.score,
      isGuardrailRefusal: false,
      statutorySummary: `${chunk.shortAct} — ${chunk.section}: ${chunk.title}`
    };
  }

  public buildOneLinerVerdict(chunk: any, productContext: string): string {
    switch (chunk.id) {
      case 'patents-act-sec-3p':
        return 'You CANNOT patent an existing traditional Ayurvedic formulation directly, but you CAN patent a novel modification, extraction, or targeted delivery system if you overcome Section 3(p) of The Patents Act, 1970 (India).';

      case 'patents-act-sec-3d':
        return 'You CANNOT patent a new form or extract of a known Ayurvedic botanical unless you overcome Section 3(d) of The Patents Act, 1970 by demonstrating statistically validated enhancement of therapeutic efficacy over the known substance.';

      case 'patents-act-sec-3e':
        return 'You CAN patent a polyherbal formulation, but you MUST overcome Section 3(e) of The Patents Act, 1970 by presenting empirical proof of unexpected synergistic efficacy (Combination Index < 1.0) rather than a mere admixture.';

      case 'patents-act-sec-10':
        return 'You CAN patent your botanical invention, but you MUST overcome Section 10(4)(d)(ii) of The Patents Act, 1970 by mandatorily disclosing the biological source and geographical harvest origin in your patent specification.';

      case 'bda-sec-6':
        return 'You CAN patent it, but you MUST overcome Section 6 of The Biological Diversity Act, 2002 by obtaining mandatory prior approval and an ABS agreement from the National Biodiversity Authority (NBA, Chennai) before patent grant.';

      case 'bda-sec-3-7':
        return 'You CANNOT commercially exploit or patent Indian bio-resources without statutory clearance — foreign entities must overcome Section 3 (prior NBA approval) and domestic manufacturers must overcome Section 7 (State Biodiversity Board intimation) of The Biological Diversity Act, 2002.';

      case 'dca-rule-158b':
        return 'You CANNOT patent classical formulations, but you CAN manufacture them under Rule 158B of The Drugs and Cosmetics Rules, 1945 without clinical trials; proprietary formulations can be licensed by overcoming SLA safety and pilot trial requirements.';

      case 'dca-schedule-t-rule-161':
        return 'You CANNOT patent factory manufacturing standards, and you CANNOT legally manufacture or market ASU drugs without overcoming Schedule T (GMP factory certification & heavy metal clearance) and Rule 161 (mandatory botanical binomial labelling) of The Drugs and Cosmetics Rules, 1945.';

      case 'phytopharmaceutical-reg-2015':
        return 'You CAN patent standardized botanical fractions, but you MUST overcome Rule 2(eb) and CT Rules 2019 of The Drugs and Cosmetics Rules by submitting 4-marker chromatographic fingerprints and CDSCO clinical trial evidence.';

      case 'trademarks-act-sec-9':
        return 'You CANNOT patent or trademark generic Sanskrit or botanical herbal names — brand names fall under trademark law, and you can only protect your mark if you overcome Section 9(1) of The Trade Marks Act, 1999 by coining an arbitrary, distinctive invented mark.';

      case 'fssai-ayurveda-aahar-2022':
        return 'You CANNOT patent traditional Ayurvedic food recipes or claim medicinal disease cures, but you CAN market an Ayurveda Aahar food supplement if you overcome Regulations 3, 5 & 6 of the FSSAI Ayurveda Aahar Regulations, 2022.';

      case 'gi-act-1999':
        return 'You CANNOT patent or claim exclusive proprietary rights over protected GI botanical cultivars unless you overcome Section 2(e) & Section 9 of the GI Act, 1999 by securing Authorized User certification.';

      case 'trips-article-27':
        return 'You CAN patent Ayurvedic botanical innovations internationally, but you MUST overcome Article 27 of the TRIPS Agreement by framing claims around novel industrial processes or isolated fractions rather than raw plants or treatment methods.';

      case 'wipo-gratk-2024':
        return 'You CAN patent internationally, but you MUST overcome Article 3 & Article 4 of the WIPO GRATK Treaty (2024) by mandatorily disclosing India as the country of origin and citing the traditional knowledge source.';

      case 'dca-cosmetic-rules':
        return 'You CANNOT patent conventional herbal cosmetics or make therapeutic disease claims under cosmetic rules — you must overcome Part III & Rule 158B of The Drugs and Cosmetics Act & Cosmetics Rules, 2020 by restricting claims to beautification or obtaining an AYUSH drug license.';

      default:
        return `You CAN patent this invention if it demonstrates novelty and non-obviousness, but you MUST overcome ${chunk.shortAct} (${chunk.section}) by complying with statutory clearance and disclosure requirements.`;
    }
  }

  private buildExplanation(
    query: string,
    chunk: any,
    productContext: string,
    jurisdiction: Jurisdiction
  ): string {
    const qLower = query.toLowerCase();

    // Contextual tailoring based on the statutory provision
    if (chunk.section.includes('3(p)')) {
      return `Under ${chunk.act}, ${chunk.section}, traditional Ayurvedic formulations documented in ancient texts (such as Charaka Samhita or Sushruta Samhita) are strictly non-patentable as they constitute traditional knowledge. Patent examiners verify all claims against the Traditional Knowledge Digital Library (TKDL). To seek patent protection for your ${productContext}, you cannot claim the traditional recipe or known aggregation; you must establish a non-obvious technological modification (e.g., a novel targeted delivery system or synthesized derivative) with comparative efficacy data.`;
    }

    if (chunk.section.includes('3(d)')) {
      return `Under ${chunk.act}, ${chunk.section}, discovering a new form, extract, or isolated fraction of a known Ayurvedic botanical (such as Curcumin or Boswellic acid) is not patentable unless you empirically prove a significant enhancement of therapeutic efficacy over the known substance. Under Indian Supreme Court precedent, demonstrating higher solubility, higher yield, or cosmetic elegance alone is insufficient — statistically validated therapeutic/pharmacological data is required.`;
    }

    if (chunk.section.includes('3(e)')) {
      return `Under ${chunk.act}, ${chunk.section}, polyherbal blends are presumed to be mere admixtures aggregating the properties of individual herbs. To overcome this statutory bar for your ${productContext}, you must submit empirical experimental evidence (e.g., Combination Index < 1.0) demonstrating unexpected synergy in specific quantitative ratios.`;
    }

    if (chunk.section.includes('Section 6') || chunk.id === 'bda-sec-6') {
      return `Under the Biological Diversity Act 2002 (${chunk.section}), obtaining prior approval from the National Biodiversity Authority (NBA, Chennai) is a mandatory legal prerequisite before any patent or IPR based on Indian biological resources can be granted. Under the 2023 Amendment, Indian entities may file the patent application, but NBA approval and the execution of an Access and Benefit Sharing (ABS) agreement must be completed prior to the grant.`;
    }

    if (chunk.section.includes('Section 3 & Section 7') || chunk.id === 'bda-sec-3-7') {
      return `Under ${chunk.act}, any company with foreign investment or foreign directorship must obtain prior approval from the NBA under Section 3 before procuring Indian biological resources. For domestic Indian entities utilizing herbs commercially, prior intimation to the respective State Biodiversity Board (SBB) is required under Section 7, though registered traditional AYUSH practitioners hold specific statutory exemptions under the 2023 amendments.`;
    }

    if (chunk.section.includes('Rule 158B')) {
      return `Under Chapter IV-A, ${chunk.section} of the Drugs and Cosmetics Rules 1945, your regulatory licensing path depends on whether your product is a Classical Formulation or a Patent/Proprietary Medicine. Classical formulations referencing authoritative First Schedule texts do not require clinical trials for an AYUSH manufacturing license. In contrast, proprietary formulations using novel herb ratios require published safety literature and pilot clinical trial proof submitted to the State Licensing Authority.`;
    }

    if (chunk.section.includes('Section 9')) {
      return `Under Section 9(1) of the Trade Marks Act 1999, descriptive and generic Sanskrit botanical names (such as "Ashwagandha", "Triphala", "Chyawanprash", or "Brahmi") cannot be registered as exclusive trademarks because they are generic terms (publici juris). To secure trademark protection for your ${productContext}, you must coin an arbitrary, invented brand name or use a distinctive composite label.`;
    }

    if (chunk.id === 'fssai-ayurveda-aahar-2022') {
      return `Under the FSSAI Ayurveda Aahar Regulations 2022 (${chunk.section}), Ayurvedic food supplements must adhere strictly to Schedule A authoritative texts and display the mandatory green Ayurveda Aahar logo. Critically, Regulation 6 prohibits any claims to treat, prevent, or cure human diseases on food supplement labels or advertising. Disease claims trigger immediate drug misbranding penalties.`;
    }

    if (chunk.section.includes('Schedule T') || chunk.section.includes('Rule 161')) {
      return `Under ${chunk.section} of the Drugs & Cosmetics Rules 1945, manufacturing facilities must comply with Schedule T Good Manufacturing Practices (GMP) and conduct testing for heavy metals (Lead, Mercury, Arsenic, Cadmium). Rule 161 mandates complete ingredient disclosures with botanical binomials, license numbers, and statutory warning labels if containing Schedule E(1) poisonous plants.`;
    }

    if (chunk.id === 'wipo-gratk-2024') {
      return `Under the historic WIPO GRATK Treaty (2024, ${chunk.section}), international patent applications across member states now require mandatory disclosure of the country of origin of genetic resources and any associated traditional knowledge. If filing PCT or foreign patents incorporating Indian Ayurvedic knowledge, you must explicitly declare India and cite traditional texts to prevent biopiracy challenges.`;
    }

    if (chunk.id === 'trips-article-27') {
      return `Under TRIPS ${chunk.section}, international patent protection requires novelty, inventive step, and industrial applicability. While Article 27.2 and 27.3 allow exclusion of plants and therapeutic treatment methods, novel extraction methods and isolated chemical compounds can be protected internationally via the Patent Cooperation Treaty (PCT), provided disclosure of biological origin complies with international agreements.`;
    }

    // Default template synthesized directly from chunk content
    return `In response to your query regarding ${productContext} under ${jurisdiction === 'national' ? 'Indian National Law' : 'International IP Regimes'}, ${chunk.shortAct} (${chunk.section}) governs this issue: ${chunk.summary} Specifically, ${chunk.content}`;
  }

  private getProductTypeLabel(type: ProductClassification): string {
    switch (type) {
      case 'classical_formulation':
        return 'Classical Ayurvedic Formulation';
      case 'new_drug':
        return 'New Botanical Drug';
      case 'phytopharmaceutical':
        return 'Phytopharmaceutical Drug';
      case 'cosmetic':
        return 'Ayurvedic Cosmetic';
      case 'nutraceutical':
        return 'Ayurveda Aahar / Nutraceutical';
    }
  }
}
