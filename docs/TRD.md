# Technical Requirements Document (TRD)

## Project Name: IP-SAKTI Sahayak
**Document Version:** 1.0.0  
**Status:** Production  
**Runtime:** Node.js (v20+ / v22+) | React 19 | TypeScript 5.8  
**Architecture:** Full-Stack Express + React SPA with In-Memory Deterministic RAG

---

## 1. System Architecture Overview

IP-SAKTI Sahayak is designed as a **self-contained, high-performance, deterministic web application**. Unlike probabilistic LLM architectures that rely on remote GPU clusters and variable API calls, this system executes its entire retrieval, scoring, classification, and synthesis pipeline in-memory within a lightweight Node.js runtime.

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT TIER                                       |
|                                                                                   |
|  React 19 + TypeScript + Tailwind CSS v4 + Motion                                 |
|                                                                                   |
|  +--------------------+  +---------------------+  +----------------------------+  |
|  |    Header & Nav    |  |  Classification    |  |     Chat Window            |  |
|  |  (Lang & Regime)   |  |     Wizard (5Q)     |  |  (Citations & Checklists)  |  |
|  +--------------------+  +---------------------+  +----------------------------+  |
|  +--------------------+  +---------------------+  +----------------------------+  |
|  | High-Density       |  |  Corpus Explorer    |  |  Automated Audit           |  |
|  | Sidebar (Badges)   |  |  Modal (15 Chunks)  |  |  Test Suite Runner         |  |
|  +--------------------+  +---------------------+  +----------------------------+  |
+------------------------------------------+----------------------------------------+
                                           | HTTP / REST (JSON)
                                           v
+-----------------------------------------------------------------------------------+
|                              SERVER TIER (Node.js / Express)                      |
|                                                                                   |
|  server.ts (Port 3000 / Host 0.0.0.0)                                             |
|  +-----------------------------------------------------------------------------+  |
|  | Middlewares: JSON Body Parser (1MB limit) | Client IP Rate Limiter          |  |
|  +-----------------------------------------------------------------------------+  |
|  | REST Endpoints: /api/chat, /api/classify, /api/corpus, /api/test-run, etc.  |  |
|  +-----------------------------------------------------------------------------+  |
|                                          |                                        |
|  +---------------------------------------v-----------------------------------+    |
|  |                   DETERMINISTIC RAG ENGINE CORE                           |    |
|  |                                                                           |    |
|  |  1. Indic Term Mapper: Regex concept expansion for 8 Indic scripts         |    |
|  |  2. Morphological Tokenizer & Stopword Filter                             |    |
|  |  3. TF-IDF Vectorizer & Cosine Similarity Matrix Calculator               |    |
|  |  4. Hard Guardrail Threshold Evaluator (Theta = 0.22)                     |    |
|  |  5. Exact Citation & Compliance Step Assembler                            |    |
|  +---------------------------------------+-----------------------------------+    |
|                                          |                                        |
|  +---------------------------------------v-----------------------------------+    |
|  |                   IN-MEMORY DATA STORES                                   |    |
|  |                                                                           |    |
|  |  - Statutory Knowledge Corpus: 15 Verified Gazette Chunks                 |    |
|  |  - In-Memory Session Store: Sanitization, History, & Rate Limiting        |    |
|  +---------------------------------------------------------------------------+    |
+-----------------------------------------------------------------------------------+
```

---

## 2. Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Language** | TypeScript | `~5.8.2` | Full-stack static type-safety across shared interfaces. |
| **Frontend Framework**| React | `^19.0.1` | Declarative UI rendering, hooks, component state management. |
| **Client Bundler** | Vite | `^6.2.3` | Development server and tree-shaken static production bundle. |
| **Styling** | Tailwind CSS | `^4.1.14` | High-density utility styling with zero runtime CSS overhead. |
| **Animation** | Motion | `^12.23.24`| Hardware-accelerated transitions and accordion animations. |
| **Icons** | Lucide React | `^0.546.0` | SVG vector icons for regulatory badges and action controls. |
| **Backend Framework** | Express | `^4.21.2` | Lightweight HTTP server, REST endpoints, and middleware. |
| **Backend Runtime** | Node.js / TSX | `v20+` / `^4.21.0` | TypeScript-native development runtime. |
| **Production Bundler**| Esbuild | `^0.25.0` | Compiles `server.ts` into a single standalone `dist/server.cjs`. |
| **Configuration** | Dotenv | `^17.2.3` | Runtime environment variable manager. |

---

## 3. Deterministic RAG Pipeline & Mathematical Foundations

### 3.1 Tokenization and Indic Concept Expansion
The engine normalizes user inputs into canonical statutory search tokens:
1. **Punctuation & Stopword Removal**: Filters out conversational noise words (`"can"`, `"how"`, `"what"`, `"is"`, `"to"`).
2. **Morphological Stemming**: Reduces inflections (`"patenting"` $\to$ `"patent"`, `"medicines"` $\to$ `"medicine"`).
3. **Indic Term Expansion** (`server/rag/translator.ts`):
   Bypasses remote translation APIs using an indexed regex mapping dictionary:
   $$\text{INDIC\_KEYWORD\_MAP}: \{ R_i \to \text{Tokens}_i \}$$
   *Example*: Query containing Hindi `"चरक संहिता"` triggers expansion with:
   `traditional knowledge TKDL Charaka Samhita Section 3(p)`.

### 3.2 TF-IDF Sparse Matrix Math
Each statutory chunk $d$ in corpus $D$ ($|D| = 15$) is vector-indexed across unique vocabulary $V$:

$$\text{TF}(t, d) = \frac{f_{t, d}}{\sum_{t' \in d} f_{t', d}}$$

Where $f_{t, d}$ is the raw frequency of term $t$ in statutory chunk $d$.

$$\text{IDF}(t, D) = \ln\left(1 + \frac{|D|}{|\{d \in D : t \in d\}|}\right)$$

The TF-IDF weight for term $t$ in document $d$ is:

$$w_{t, d} = \text{TF}(t, d) \times \text{IDF}(t, D)$$

For an incoming user query $q$, the query vector is:

$$V_q = \left[ w_{t_1, q}, w_{t_2, q}, \dots, w_{t_{|V|}, q} \right]$$

### 3.3 Cosine Similarity Calculation
The relevance score $S(q, d)$ between query $q$ and legal provision $d$ is computed via the dot product of normalized vectors:

$$S(q, d) = \frac{V_q \cdot V_d}{\|V_q\|_2 \times \|V_d\|_2} = \frac{\sum_{t \in q \cap d} w_{t, q} \cdot w_{t, d}}{\sqrt{\sum_{t \in q} w_{t, q}^2} \sqrt{\sum_{t \in d} w_{t, d}^2}}$$

### 3.4 Hard Guardrail Threshold
To ensure zero hallucination, the system enforces a strict mathematical decision boundary:

$$\text{Decision}(q) = 
\begin{cases} 
\text{Synthesize Substantive Answer} & \text{if } \max_{d \in D} S(q, d) \ge \theta \\
\text{Trigger Statutory Refusal} & \text{if } \max_{d \in D} S(q, d) < \theta 
\end{cases}$$

Where $\theta = 0.22$. If $S(q, d) < \theta$, the system halts retrieval and logs the query to `sessionStore.lowConfidenceLogs`.

---

## 4. REST API Specifications

### 4.1 `POST /api/chat`
Submits a user query for statutory retrieval and compliance synthesis.

- **Request Body**:
  ```json
  {
    "sessionId": "string (optional)",
    "query": "string (required, max 1000 chars)",
    "jurisdiction": "national | international",
    "productType": "classical_formulation | phytopharmaceutical | new_drug | cosmetic | nutraceutical",
    "language": "en | hi | ta | te | mr | bn | gu | kn | ml"
  }
  ```
- **Response (200 OK - Confident Match)**:
  ```json
  {
    "success": true,
    "message": {
      "id": "msg_asst_1725440000000",
      "sender": "assistant",
      "text": "Under Patents Act, 1970, Section 3(p)...",
      "plainExplanation": "Under Patents Act, 1970, Section 3(p)...",
      "citations": [
        {
          "chunkId": "patents-act-sec-3p",
          "act": "The Patents Act, 1970 (India)",
          "section": "Section 3(p)",
          "title": "Exclusion of Traditional Knowledge from Patentability",
          "exactText": "Section 3(p) explicitly provides...",
          "jurisdiction": "national",
          "statutoryAuthority": "Controller General of Patents, Designs and Trade Marks (CGPDTM)"
        }
      ],
      "complianceChecklist": [
        {
          "id": "patents-act-sec-3p-step-1",
          "task": "Conduct exhaustive TKDL and prior art clearance search...",
          "statutoryRef": "Section 3(p), Patents Act 1970",
          "mandatory": true,
          "completed": false
        }
      ],
      "confidenceScore": 0.65,
      "isGuardrailRefusal": false
    },
    "session": { "sessionId": "sess_..." }
  }
  ```
- **Response (200 OK - Guardrail Refusal)**:
  ```json
  {
    "success": true,
    "message": {
      "isGuardrailRefusal": true,
      "confidenceScore": 0.05,
      "text": "I don't have verified legal information on this query in the statutory corpus...",
      "citations": [],
      "complianceChecklist": []
    }
  }
  ```
- **Response (429 Too Many Requests)**:
  ```json
  { "error": "Rate limit exceeded. Please wait a moment before sending another legal query." }
  ```

### 4.2 `POST /api/classify`
Processes responses from the 5-step classification wizard.
- **Request Body**:
  ```json
  {
    "sessionId": "string",
    "answers": ["classical_text", "whole_herb", "therapeutic", "traditional_vehicle", "domestic_entity"],
    "selectedCategory": "classical_formulation (optional manual override)"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "classification": {
      "category": "classical_formulation",
      "categoryName": "Classical Ayurvedic Formulation",
      "hindiName": "शास्त्रीय आयुर्वेदिक योग",
      "primaryRegulatoryBody": "State AYUSH Licensing Authority (SLA)",
      "patentabilityStatus": "Non-patentable per se under Section 3(p)...",
      "clinicalTrialRequired": false
    }
  }
  ```

### 4.3 `GET /api/corpus`
Returns verified statutory chunks with optional jurisdiction filtering.
- **Query Params**: `?jurisdiction=national | international`
- **Response (200 OK)**:
  ```json
  {
    "total": 15,
    "chunks": [ /* Array of LegalChunk objects */ ]
  }
  ```

### 4.4 `POST /api/test-run`
Executes the automated 3-tier audit test suite and returns live verification results.
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "summary": { "total": 3, "passed": 3, "failed": 0 },
    "results": [
      {
        "id": "test-1-citation-completeness",
        "title": "Statutory Citation Verification",
        "status": "passed",
        "citationsFound": [ "The Patents Act, 1970 (Section 3(p))", "..." ]
      },
      {
        "id": "test-2-guardrail-trigger",
        "title": "Guardrail & Out-of-Scope Protection",
        "status": "passed",
        "score": 1.0
      },
      {
        "id": "test-3-jurisdiction-filtering",
        "title": "Jurisdiction Isolation Enforcement",
        "status": "passed"
      }
    ]
  }
  ```

---

## 5. Core Data Models (`src/types.ts`)

```typescript
export type ProductClassification =
  | 'classical_formulation'
  | 'new_drug'
  | 'phytopharmaceutical'
  | 'cosmetic'
  | 'nutraceutical';

export type Jurisdiction = 'national' | 'international';

export type LanguageCode =
  | 'en' | 'hi' | 'ta' | 'te' | 'mr' | 'bn' | 'gu' | 'kn' | 'ml';

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
```

---

## 6. Frontend Component Architecture

| Component | Path | Responsibility |
| :--- | :--- | :--- |
| `App.tsx` | `/src/App.tsx` | Master coordinator; maintains session state, jurisdiction, language, and modal visibility. |
| `Header.tsx` | `/src/components/Header.tsx` | Top banner; language selector (9 options), jurisdiction toggle (🇮🇳 vs 🌐), and audit trigger. |
| `DisclaimerBar.tsx` | `/src/components/DisclaimerBar.tsx` | Statutory legal disclaimer banner informing users this is not a substitute for counsel. |
| `HighDensitySidebar.tsx` | `/src/components/HighDensitySidebar.tsx` | Left pane; displays active classification badges, TKDL warnings, and live citation stream. |
| `ChatWindow.tsx` | `/src/components/ChatWindow.tsx` | Right pane; streaming conversation, interactive compliance checklists, query chips, and input bar. |
| `ClassificationWizard.tsx`| `/src/components/ClassificationWizard.tsx` | Modal dialogue for the 5-step classification questionnaire. |
| `CitationChip.tsx` | `/src/components/CitationChip.tsx` | Collapsible card displaying exact gazetted statute, section, and statutory authority. |
| `CorpusExplorerModal.tsx` | `/src/components/CorpusExplorerModal.tsx` | Full-text explorer for all 15 gazetted legal chunks with keyword search. |
| `AuditModal.tsx` | `/src/components/AuditModal.tsx` | Real-time runner and results viewer for the 3 automated audit tests. |

---

## 7. Security, Privacy & Sanitization

1. **Strict Input Sanitization**:
   All user queries pass through `sessionStore.sanitizeInput()`:
   - Strips HTML `<tags>` and JavaScript protocols.
   - Truncates oversized payloads to a maximum of 1,000 characters.
2. **In-Memory Rate Limiting**:
   - Max 40 requests per 60-second window per IP.
   - Excess requests receive standard `429 Too Many Requests`.
3. **Complete Network Privacy**:
   - Zero outbound HTTP calls to third-party AI services.
   - Formulation queries are evaluated purely in server RAM and discarded after session expiration.
4. **Session Isolation**:
   - Session data stored in an in-memory `Map<string, UserSession>` with a maximum capacity of 5,000 active sessions and automated 24-hour LRU eviction.

---

## 8. Build, Compilation & Deployment Pipeline

### Scripts (`package.json`)
- **`npm run dev`**: `tsx server.ts` (boots hot development server on port 3000).
- **`npm run build`**:
  1. `vite build` (compiles React application into `dist/`).
  2. `esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs` (creates self-contained single-file backend bundle).
- **`npm run start`**: `node dist/server.cjs` (standalone production launch).
- **`npm run lint`**: `tsc --noEmit` (validates 100% type safety).

### Container Configuration
- **External Port**: `3000` (mandatory ingress binding to `0.0.0.0:3000`).
- **Memory Footprint**: ~120 MB RAM in production.
- **Cold Start Time**: $< 200\text{ms}$.
- **CPU Footprint**: Idle $< 0.1\%$; active query execution $< 5\text{ms}$ CPU time.
