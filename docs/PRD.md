# Product Requirements Document (PRD)

## Project Name: IP-SAKTI Sahayak
**Document Version:** 1.0.0  
**Status:** Active / Production  
**Target Audience:** Ayurveda Innovators, Herbal Drug Manufacturers, Biotech Startups, AYUSH Researchers, IP Professionals  
**Jurisdictions Covered:** 🇮🇳 Republic of India (National) & 🌐 WIPO / WTO TRIPS (International)

---

## 1. Executive Summary

India's traditional medicine sector (Ayurveda, Siddha, Unani - ASU) is experiencing unprecedented domestic expansion and global export growth. However, Ayurvedic innovators face steep, opaque, and multi-layered regulatory and intellectual property (IP) hurdles:
1. **The Patent Bar**: Under Section 3(p) of the Patents Act, 1970, formulations documented in ancient classical texts (e.g., *Charaka Samhita*, *Sushruta Samhita*) cannot be patented as they constitute traditional knowledge verified by the Traditional Knowledge Digital Library (TKDL).
2. **The Biodiversity Prerequisite**: Under Section 6 of the Biological Diversity Act, 2002 (and 2023 Amendments), any entity seeking an IPR based on Indian biological resources must obtain prior approval and enter into an Access & Benefit Sharing (ABS) agreement with the National Biodiversity Authority (NBA).
3. **Licensing Bifurcation**: Under Rule 158B of the Drugs and Cosmetics Rules, 1945, classical formulations are exempt from clinical trials, whereas proprietary formulations require safety and pilot clinical data.
4. **Trademark Pitfalls**: Under Section 9(1) of the Trade Marks Act, 1999, Sanskrit botanical names (such as *Ashwagandha*, *Triphala*, *Brahmi*) cannot be monopolized as trademarks.
5. **International Disclosure Rules**: The landmark 2024 WIPO GRATK Treaty mandates explicit disclosure of origin for traditional knowledge in foreign and PCT patent filings.

Existing generic AI assistants (ChatGPT, general LLMs) hallucinate nonexistent sections, blur regulatory boundaries, fail to differentiate between classical formulations and phytopharmaceuticals, and leak confidential formulation data to third-party model providers.

**IP-SAKTI Sahayak** is a source-cited, zero-hallucination legal and IP navigation platform. Powered by a 100% deterministic in-memory Retrieval-Augmented Generation (RAG) architecture with no external AI API dependencies, it provides instant statutory citations, actionable compliance checklists, and automated product classification.

---

## 2. Product Vision & Value Proposition

### Vision Statement
To democratize and de-risk intellectual property protection and statutory compliance for India's 10,000+ Ayurveda entrepreneurs, enabling them to protect their genuine technological modifications while preserving traditional knowledge sovereignty.

### Core Value Proposition
- **Zero Hallucination Guarantee**: Every substantive legal statement is mathematically bounded by and cited from verified statutory texts (Act, Section, Rule, Governing Body).
- **Sub-50ms Instant Guidance**: Purely in-memory, deterministic retrieval without network latency or external model round-trips.
- **Privacy by Design**: Sensitive formulation queries never leave the application perimeter; no external cloud AI APIs are invoked.
- **Multilingual Inclusivity**: Full support for 9 Indic languages (Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, and English).
- **Complete Regulatory Route Mapping**: Dynamic 5-step classification wizard determining exact regulatory authority (CDSCO, State AYUSH SLA, NBA, FSSAI, CGPDTM).

---

## 3. Target User Personas

| Persona | Role | Key Pain Points | Core Goals |
| :--- | :--- | :--- | :--- |
| **Dr. Rajesh Sharma** | Ayurvedic Vaidya & Manufacturer | Confused whether his classical syrup modification needs clinical trials or State Licensing approval. | Wants quick confirmation of Rule 158B licensing pathway and label warning rules. |
| **Ananya Sengupta** | Herbal Biotech Startup Founder | Developing a nanoparticle extract of Curcumin; unsure how to overcome Section 3(d) and 3(e) patent bars. | Needs statutory filing requirements, synergy proof thresholds, and NBA Form 1 approval steps. |
| **Vikram Patel** | IP Attorney / Patent Agent | Needs to perform preliminary statutory clearance against TKDL and verify PCT country-of-origin disclosure rules. | Rapid retrieval of exact statutory text, governing bodies, and verifiable legal citations. |
| **Meera Nair** | D2C Herbal Brand Marketer | Unsure if she can trademark "Pure Ashwagandha" or register her capsules as Ayurveda Aahar. | Needs Section 9 trademark bars and FSSAI Ayurveda Aahar 2022 logo/claim constraints. |

---

## 4. Key Functional Requirements (FR)

### FR-1: 5-Step Product Classification Wizard
- **FR-1.1**: The system must provide an interactive 5-question classification workflow assessing:
  1. Formulation Source (Classical texts vs. modern proprietary blend).
  2. Processing Degree (Whole herb/decoction vs. isolated/standardized extract).
  3. Intended Use (Therapeutic treatment vs. dietary wellness vs. cosmetic).
  4. Delivery Mechanism (Traditional taila/asava vs. novel liposome/nanoparticle).
  5. Entity Ownership (100% domestic Indian vs. foreign directorship/investment).
- **FR-1.2**: Compute real-time weighted category matching across 5 statutory categories:
  - Classical Ayurvedic Formulation
  - Patent / Proprietary ASU Medicine
  - Phytopharmaceutical Drug
  - Ayurveda Aahar / Nutraceutical
  - Ayurvedic Cosmetic
- **FR-1.3**: Display category badge, regulatory authority (e.g. CDSCO vs. SLA vs. FSSAI), patentability threshold, and clinical trial obligations.
- **FR-1.4**: Allow instant re-classification or manual category switching at any time.

### FR-2: Deterministic Statutory Retrieval Engine (RAG)
- **FR-2.1**: Index verified statutory chunks covering:
  - *The Patents Act, 1970*: Sections 3(p), 3(d), 3(e), 2(1)(ja), 10(4)(d)(ii).
  - *The Biological Diversity Act, 2002 & Amendment Act, 2023*: Sections 3, 6, 7.
  - *The Drugs & Cosmetics Act, 1940 & Rules, 1945*: Rule 158B, Schedule T (GMP), Rule 161.
  - *The Trade Marks Act, 1999*: Section 9(1).
  - *FSSAI Ayurveda Aahar Regulations, 2022*: Regulations 3, 4, 6, 9.
  - *WIPO GRATK Treaty (2024)*: Articles 3 & 4.
  - *WTO TRIPS Agreement*: Article 27.
- **FR-2.2**: Calculate cosine similarity between user query vectors and statutory chunk vectors.
- **FR-2.3**: Enforce a strict confidence threshold ($\theta = 0.22$). Queries below this threshold must trigger the **Zero-Hallucination Guardrail Refusal**.
- **FR-2.4**: Generate structured output containing:
  - Plain-language statutory explanation.
  - Exact verified citations with Act, Section, and verbatim text.
  - Actionable compliance checklist with mandatory/recommended badges.
  - Confidence metric (percentage).

### FR-3: Actionable Compliance Checklists
- **FR-3.1**: Every substantive legal response must include specific statutory action steps (e.g., *Conduct TKDL clearance search*, *File Form 1 with NBA*, *Submit acute oral toxicity data*).
- **FR-3.2**: Checklists must support interactive state toggling (completed vs. pending).
- **FR-3.3**: Tag each item as either **Mandatory** or **Recommended**.

### FR-4: Dual-Regime Jurisdiction Isolation
- **FR-4.1**: Users can toggle between **National (Indian Law)** and **International (WIPO/TRIPS)** regimes.
- **FR-4.2**: Under National mode, international treaties must not be retrieved. Under International mode, national acts must not be retrieved.
- **FR-4.3**: Active jurisdiction must update the UI badge and filter the Knowledge Corpus Explorer.

### FR-5: Indic Multilingual Localization (9 Languages)
- **FR-5.1**: Support English, Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, and Malayalam.
- **FR-5.2**: Tokenize and map regional legal terms (e.g., *पेटेंट*, *चरक संहिता*, *காப்புரிமை*, *లైసెన్స్*) to statutory keywords deterministically.
- **FR-5.3**: Maintain verbatim English statutory citations (e.g. *Patents Act, 1970, Section 3(p)*) across all languages to avoid mistranslating legal terminology.

### FR-6: Knowledge Corpus Explorer
- **FR-6.1**: Provide a dedicated modal displaying all 15 statutory chunks.
- **FR-6.2**: Allow full-text searching and filtering by jurisdiction (National vs. International) and statutory authority.
- **FR-6.3**: Display complete verbatim legal provisions, compliance requirements, and official gazette references.

### FR-7: Automated Audit & Verification Suite
- **FR-7.1**: In-app execution of end-to-end automated tests:
  - *Test 1 (Citation Completeness)*: Verifies that 100% of substantive answers contain verified statutory citations.
  - *Test 2 (Guardrail Rejection)*: Verifies that out-of-scope/crypto/cooking queries trigger the guardrail.
  - *Test 3 (Jurisdiction Isolation)*: Verifies zero cross-jurisdiction leakage.
- **FR-7.2**: Display live pass/fail counts, execution timestamps, and inspected citation details.

---

## 5. Non-Functional Requirements (NFR)

### NFR-1: Performance & Latency
- Query-to-response generation latency must not exceed **50ms** under normal load.
- In-memory retrieval time must be under **5ms**.
- Initial client bundle load time must be under **1.2s** on standard 4G connections.

### NFR-2: Reliability & Zero Hallucination
- Substantive legal outputs must never quote non-existent acts or fabricated sections.
- Out-of-scope query rejection rate must be **100%**.

### NFR-3: Security & Privacy
- No user query or product formula may be dispatched to third-party AI APIs.
- Express server must enforce IP rate-limiting (maximum 40 requests/minute per IP).
- All user inputs must be strictly sanitized against script injection and XSS.

### NFR-4: Usability & Accessibility
- High-contrast, dense UI adhering to WCAG 2.1 AA contrast ratios (minimum 4.5:1 for body text).
- Responsive layout across desktop ($1280\text{px}+$ viewport) and mobile ($375\text{px}+$ viewport) with touch targets $\ge 44\text{px}$.
- No decorative gradients or AI clichés; typography optimized for statutory reading.

---

## 6. Success Metrics & Key Performance Indicators (KPIs)

1. **Citation Accuracy Rate**: $100\%$ of substantive answers grounded in the gazetted corpus.
2. **Audit Suite Pass Rate**: $3/3$ tests passing continuously across all commits.
3. **Response Speed**: $< 50\text{ms}$ backend execution time.
4. **Guardrail Protection Score**: $100\%$ safe refusal on irrelevant/adversarial inputs.
5. **Session Continuity**: 100% state persistence across category switches and language toggles.
