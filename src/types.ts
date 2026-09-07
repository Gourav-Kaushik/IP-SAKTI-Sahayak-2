export type ProductClassification =
  | 'classical_formulation'
  | 'new_drug'
  | 'phytopharmaceutical'
  | 'cosmetic'
  | 'nutraceutical';

export type Jurisdiction = 'national' | 'international';

export type LanguageCode =
  | 'en'
  | 'hi'
  | 'ta'
  | 'te'
  | 'mr'
  | 'bn'
  | 'gu'
  | 'kn'
  | 'ml';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
}

export interface LegalChunk {
  id: string;
  act: string;
  shortAct: string;
  section: string;
  title: string;
  jurisdiction: Jurisdiction;
  productTypes: (ProductClassification | 'all')[];
  topics: string[];
  keywords: string[];
  summary: string;
  content: string;
  complianceSteps: {
    task: string;
    statutoryRef: string;
    mandatory: boolean;
  }[];
  statutoryAuthority: string;
  relevanceExplanation: string;
}

export interface Citation {
  chunkId: string;
  act: string;
  section: string;
  title: string;
  exactText: string;
  jurisdiction: Jurisdiction;
  statutoryAuthority: string;
}

export interface ComplianceItem {
  id: string;
  task: string;
  statutoryRef: string;
  mandatory: boolean;
  completed?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: number;
  text: string;
  oneLinerVerdict?: string;
  statutoryChunkText?: string;
  plainExplanation?: string;
  citations?: Citation[];
  complianceChecklist?: ComplianceItem[];
  confidenceScore?: number;
  isGuardrailRefusal?: boolean;
  refusalReason?: string;
  jurisdiction: Jurisdiction;
  productType?: ProductClassification;
  language: LanguageCode;
}

export interface WizardQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    description: string;
    classificationWeight: Partial<Record<ProductClassification, number>>;
  }[];
}

export interface ClassificationResult {
  category: ProductClassification;
  categoryName: string;
  hindiName: string;
  description: string;
  primaryRegulatoryBody: string;
  patentabilityStatus: string;
  statutoryBasis: string;
  recommendedRoute: string;
  keyComplianceRequirements: string[];
}

export interface SessionState {
  sessionId: string;
  jurisdiction: Jurisdiction;
  language: LanguageCode;
  classification?: ClassificationResult;
  history: ChatMessage[];
  createdAt: number;
  lastActiveAt: number;
}

export interface LowConfidenceLog {
  id: string;
  timestamp: number;
  query: string;
  jurisdiction: Jurisdiction;
  productType?: ProductClassification;
  language: LanguageCode;
  topScore: number;
  reason: string;
}

export interface TestResult {
  id: string;
  title: string;
  description: string;
  status: 'passed' | 'failed' | 'running';
  details: string;
  citationsFound?: string[];
  score?: number;
}
