import { LegalChunk } from '../../../src/types.js';

export const AYURVEDA_LEGAL_CORPUS: LegalChunk[] = [
  // 1. Patents Act 1970 - Section 3(p)
  {
    id: 'patents-act-sec-3p',
    act: 'The Patents Act, 1970 (India)',
    shortAct: 'Patents Act 1970',
    section: 'Section 3(p)',
    title: 'Exclusion of Traditional Knowledge from Patentability',
    jurisdiction: 'national',
    productTypes: ['classical_formulation', 'phytopharmaceutical', 'new_drug', 'cosmetic', 'nutraceutical'],
    topics: ['patentability', 'traditional_knowledge', 'tkdl', 'prior_art'],
    keywords: [
      'traditional knowledge',
      'patents',
      'patentable',
      'charaka',
      'sushruta',
      'samhita',
      'ancient',
      'ayurvedic formulation',
      'tkdl',
      'known properties',
      'aggregation',
      'exclusion'
    ],
    summary:
      'Inventions that are essentially traditional knowledge or an aggregation of known properties of traditionally known herbal ingredients are non-patentable under Indian law.',
    content:
      'Section 3(p) of the Patents Act, 1970 explicitly provides that "an invention which in effect, is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components" is not an invention within the meaning of the Act and is strictly excluded from patentability. The Indian Patent Office cross-references patent specifications with the Traditional Knowledge Digital Library (TKDL), which contains translated ancient Ayurvedic texts including Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya. Any formulation merely citing or combining known classical therapeutic uses will face a statutory rejection under Section 3(p).',
    complianceSteps: [
      {
        task: 'Conduct exhaustive TKDL and prior art clearance search for all active botanical ingredients.',
        statutoryRef: 'Section 3(p), Patents Act 1970',
        mandatory: true
      },
      {
        task: 'Establish non-obvious technological modification (e.g., novel drug delivery system, specific synthetic nanoparticle carrier, or non-obvious extraction kinetics).',
        statutoryRef: 'Section 2(1)(ja), Patents Act 1970',
        mandatory: true
      },
      {
        task: 'Prepare comparative efficacy data demonstrating results superior to classical Ayurvedic decoctions/extracts.',
        statutoryRef: 'Section 3(d) & 3(p), Patents Act 1970',
        mandatory: true
      }
    ],
    statutoryAuthority: 'Controller General of Patents, Designs and Trade Marks (CGPDTM), India',
    relevanceExplanation:
      'Governs whether an Ayurvedic product or combination can be granted a patent in India when derived from traditional medicinal knowledge.'
  },

  // 2. Patents Act 1970 - Section 3(d)
  {
    id: 'patents-act-sec-3d',
    act: 'The Patents Act, 1970 (India)',
    shortAct: 'Patents Act 1970',
    section: 'Section 3(d)',
    title: 'Enhancement of Known Therapeutic Efficacy Requirement',
    jurisdiction: 'national',
    productTypes: ['new_drug', 'phytopharmaceutical', 'nutraceutical'],
    topics: ['therapeutic_efficacy', 'known_substance', 'bioavailability', 'derivatives', 'patentability'],
    keywords: [
      'section 3d',
      'efficacy',
      'bioavailability',
      'known substance',
      'curcumin',
      'extract',
      'purified',
      'salt',
      'isomer',
      'polymorph',
      'therapeutic',
      'enhancement'
    ],
    summary:
      'Discovery of a new form or new property of a known Ayurvedic substance is non-patentable unless it demonstrates significantly enhanced therapeutic efficacy.',
    content:
      'Under Section 3(d) of the Patents Act, 1970, the mere discovery of a new form of a known substance which does not result in the enhancement of the known efficacy of that substance, or the mere discovery of any new property or new use for a known substance, is not patentable. For pharmaceutical and botanical substances, "efficacy" is strictly interpreted by the Supreme Court of India (Novartis v. Union of India) as "therapeutic efficacy". Showing increased shelf-life, improved solubility, or higher yield alone is insufficient unless accompanied by statistically significant in-vivo clinical or pharmacokinetic proof of heightened therapeutic response.',
    complianceSteps: [
      {
        task: 'Provide comparative in-vivo pharmacological data proving significant enhancement of therapeutic efficacy over the known herbal extract.',
        statutoryRef: 'Section 3(d) Explanation, Patents Act 1970',
        mandatory: true
      },
      {
        task: 'Identify the exact known substance/phytochemical in the prior art and document the structural or compositional distinction.',
        statutoryRef: 'Section 3(d), Patents Act 1970',
        mandatory: true
      }
    ],
    statutoryAuthority: 'Indian Patent Office (IPO)',
    relevanceExplanation:
      'Crucial for entrepreneurs claiming novel extracts, modified phytopharmaceuticals, or bio-enhanced curcumin/boswellia/ashwagandha formulations.'
  },

  // 3. Patents Act 1970 - Section 3(e)
  {
    id: 'patents-act-sec-3e',
    act: 'The Patents Act, 1970 (India)',
    shortAct: 'Patents Act 1970',
    section: 'Section 3(e)',
    title: 'Prohibition on Mere Admixtures & Requirement for Synergism',
    jurisdiction: 'national',
    productTypes: ['classical_formulation', 'phytopharmaceutical', 'nutraceutical', 'cosmetic'],
    topics: ['mere_admixture', 'synergy', 'herbal_combinations', 'patentability'],
    keywords: [
      'admixture',
      'mere admixture',
      'section 3e',
      'synergy',
      'synergistic',
      'combination',
      'polyherbal',
      'herbal mix',
      'aggregation of properties'
    ],
    summary:
      'Polyherbal combinations that merely aggregate individual properties of components are excluded. Quantitative proof of synergy is mandatory.',
    content:
      'Section 3(e) excludes "a substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof or a process for producing such substance". Polyherbal Ayurvedic formulations (e.g. blending Ashwagandha, Giloy, and Tulsi) are presumed by patent examiners to be mere admixtures. To overcome this bar, the applicant must present rigorous empirical experimental data demonstrating unexpected synergistic interaction (e.g., Combination Index < 1.0 or super-additive therapeutic response) between the specific ratios of the botanical components.',
    complianceSteps: [
      {
        task: 'Conduct experimental combination index (CI) or isobologram analyses demonstrating super-additive synergy.',
        statutoryRef: 'Section 3(e), Patents Act 1970',
        mandatory: true
      },
      {
        task: 'Claim specific defined quantitative ratios rather than broad open-ended ranges of botanical ingredients.',
        statutoryRef: 'Section 10(4), Patents Act 1970',
        mandatory: true
      }
    ],
    statutoryAuthority: 'Indian Patent Office (IPO)',
    relevanceExplanation:
      'Affects all polyherbal blends, wellness powders, and multi-ingredient Ayurvedic medicines seeking patent claims.'
  },

  // 4. Patents Act 1970 - Section 10(4)(d)(ii)
  {
    id: 'patents-act-sec-10',
    act: 'The Patents Act, 1970 (India)',
    shortAct: 'Patents Act 1970',
    section: 'Section 10(4)(d)(ii)',
    title: 'Mandatory Disclosure of Biological Source and Geographical Origin',
    jurisdiction: 'national',
    productTypes: ['classical_formulation', 'new_drug', 'phytopharmaceutical', 'cosmetic', 'nutraceutical'],
    topics: ['biological_resources', 'disclosure', 'geographical_origin', 'mandatory_filing'],
    keywords: [
      'biological source',
      'geographical origin',
      'section 10',
      'mandatory disclosure',
      'herb source',
      'specimen',
      'botanical origin',
      'nba approval'
    ],
    summary:
      'Patent specifications utilizing biological material from India must mandatorily disclose the exact source and geographical origin in the application.',
    content:
      'Section 10(4)(d)(ii) mandates that every patent specification must disclose the source and geographical origin of the biological material when used in an invention. Failure to disclose or wrongful disclosure is an express statutory ground for pre-grant opposition under Section 25(1)(j), post-grant opposition under Section 25(2)(j), and revocation under Section 64(1)(p) of the Patents Act. The applicant must clearly state whether the botanical material was obtained from India or abroad, including specific regional provenance.',
    complianceSteps: [
      {
        task: 'Record exact geographical coordinates, forest division, or vendor harvest origin of botanical specimens.',
        statutoryRef: 'Section 10(4)(d)(ii), Patents Act 1970',
        mandatory: true
      },
      {
        task: 'Submit declaration in Form 1 confirming source of biological material and initiate NBA interface if biological material is from India.',
        statutoryRef: 'Section 10(4), Patents Act & Patent Rules 2003',
        mandatory: true
      }
    ],
    statutoryAuthority: 'Indian Patent Office (IPO)',
    relevanceExplanation:
      'Applies to every single Indian patent application mentioning or using plants, microbes, or animal-derived biological materials.'
  },

  // 5. Biological Diversity Act 2002 - Section 6
  {
    id: 'bda-sec-6',
    act: 'The Biological Diversity Act, 2002 & Amendment Act, 2023',
    shortAct: 'Biological Diversity Act 2002',
    section: 'Section 6',
    title: 'Prior Approval of National Biodiversity Authority (NBA) for IPR Applications',
    jurisdiction: 'national',
    productTypes: ['classical_formulation', 'new_drug', 'phytopharmaceutical', 'cosmetic', 'nutraceutical'],
    topics: ['nba', 'approval', 'ipr_filing', 'patents', 'biological_resources', 'abs'],
    keywords: [
      'nba approval',
      'national biodiversity authority',
      'section 6',
      'bda 2002',
      'biological diversity',
      'ipr application',
      'patent filing',
      'prior approval',
      'chennai nba',
      'form iii'
    ],
    summary:
      'No person may apply for any IPR in or outside India for an invention based on Indian biological resources without prior NBA approval or intimation.',
    content:
      'Section 6(1) of the Biological Diversity Act, 2002 mandates that no person shall apply for any intellectual property right, by whatever name called, in or outside India for any invention based on any research or information on a biological resource obtained from India without previous approval of the National Biodiversity Authority (NBA). Under the Biological Diversity (Amendment) Act 2023, while Indian entities may file the patent application, NBA approval must be formally obtained BEFORE the grant of the patent. For foreign patent filings based on Indian bio-resources, prior permission is strictly required before the grant.',
    complianceSteps: [
      {
        task: 'Submit Form III application to the National Biodiversity Authority (NBA, Chennai) for IPR approval.',
        statutoryRef: 'Section 6(1), Biological Diversity Act 2002 & Rule 18',
        mandatory: true
      },
      {
        task: 'Execute Access and Benefit Sharing (ABS) agreement with the NBA before patent grant.',
        statutoryRef: 'Section 21, Biological Diversity Act 2002',
        mandatory: true
      },
      {
        task: 'File the NBA application receipt and certificate with the Indian Patent Controller within the statutory response period.',
        statutoryRef: 'Section 6(1) BDA & Section 10(4) Patents Act',
        mandatory: true
      }
    ],
    statutoryAuthority: 'National Biodiversity Authority (NBA), Chennai, India',
    relevanceExplanation:
      'Mandatory legal gateway before an Indian or foreign patent can be granted for any product incorporating Indian medicinal plants.'
  },

  // 6. Biological Diversity Act 2002 - Section 3 & 7
  {
    id: 'bda-sec-3-7',
    act: 'The Biological Diversity Act, 2002 & Amendment Act, 2023',
    shortAct: 'Biological Diversity Act 2002',
    section: 'Section 3 & Section 7',
    title: 'Access Rules for Foreign Entities & Commercial Utilization Intimation to SBB',
    jurisdiction: 'national',
    productTypes: ['classical_formulation', 'new_drug', 'phytopharmaceutical', 'cosmetic', 'nutraceutical'],
    topics: ['foreign_entities', 'commercial_utilization', 'state_biodiversity_board', 'sbb', 'abs'],
    keywords: [
      'section 3',
      'section 7',
      'foreign investment',
      'fdi',
      'commercial utilization',
      'sbb',
      'state biodiversity board',
      'ayurvedic practitioner',
      'exemptions',
      'ayush exemption'
    ],
    summary:
      'Foreign entities/citizens must obtain NBA approval before accessing Indian bio-resources. Indian commercial users must notify State Biodiversity Boards (SBB), subject to 2023 AYUSH practitioner exemptions.',
    content:
      'Under Section 3, entities with any foreign participation, shareholding, or non-resident directors are categorized as "Section 3(2) companies" and MUST obtain prior approval from the NBA before even obtaining/procuring any biological resource from India. Section 7 requires Indian citizens and entities to give prior intimation to the concerned State Biodiversity Board (SBB) before accessing biological resources for commercial utilization. The Biological Diversity (Amendment) Act 2023 introduced a codified exemption from Section 7 for registered AYUSH practitioners and local traditional healers, but commercial Ayurvedic manufacturing enterprises remain subject to State Biodiversity Board notifications and applicable benefit-sharing levies.',
    complianceSteps: [
      {
        task: 'Audit company shareholding structure to verify if any FDI, foreign director, or NRI holding triggers Section 3(2) NBA requirements.',
        statutoryRef: 'Section 3(2), Biological Diversity Act 2002',
        mandatory: true
      },
      {
        task: 'File Form I with SBB (State Biodiversity Board) for commercial utilization of raw herbs if operating as an Indian corporate manufacturer.',
        statutoryRef: 'Section 7, Biological Diversity Act 2002',
        mandatory: true
      }
    ],
    statutoryAuthority: 'National Biodiversity Authority & State Biodiversity Boards',
    relevanceExplanation:
      'Determines whether foreign-funded startups or local Ayurvedic manufacturers face penalties or benefit-sharing obligations.'
  },

  // 7. Drugs and Cosmetics Act 1940 - Rule 158B
  {
    id: 'dca-rule-158b',
    act: 'The Drugs and Cosmetics Act, 1940 & Rules, 1945',
    shortAct: 'Drugs & Cosmetics Rules 1945',
    section: 'Rule 158B (Chapter IV-A)',
    title: 'Licensing Requirements for Classical ASU Formulations vs Patent/Proprietary Medicines',
    jurisdiction: 'national',
    productTypes: ['classical_formulation', 'new_drug', 'phytopharmaceutical', 'cosmetic'],
    topics: ['licensing', 'ayush_license', 'classical_medicine', 'proprietary_medicine', 'safety_study'],
    keywords: [
      'rule 158b',
      'ayush license',
      'classical formulation',
      'patent or proprietary',
      'first schedule',
      'sla',
      'state licensing authority',
      'clinical trial',
      'safety study',
      'charaka',
      'sushruta',
      'afi'
    ],
    summary:
      'Differentiates licensing for Classical Ayurvedic formulations (no trial required if in First Schedule texts) vs Patent/Proprietary Ayurvedic medicines (safety and clinical pilot studies required).',
    content:
      'Rule 158B of the Drugs and Cosmetics Rules, 1945 categorizes Ayurvedic, Siddha, and Unani (ASU) medicines into two distinct licensing paths: \n1) Classical ASU Drugs: Formulations manufactured strictly according to the authoritative books specified in the First Schedule to the Act (e.g., Charaka Samhita, Sushruta Samhita, Sharangadhara Samhita, Ayurvedic Formulary of India). These require proof of authentic textual reference; no clinical trials or safety studies are required for manufacturing license issuance.\n2) Patent or Proprietary ASU Medicines (Section 3(h)): Formulations containing ingredients mentioned in the First Schedule texts but in novel proportions, forms, or proprietary mixtures. These require submission of published safety literature and/or proof of pilot clinical trials to the State AYUSH Licensing Authority (SLA).',
    complianceSteps: [
      {
        task: 'For Classical Drugs: Identify the exact recipe, Sanskrit verse, and page number in the First Schedule authoritative text.',
        statutoryRef: 'First Schedule & Rule 158B(I), Drugs & Cosmetics Rules 1945',
        mandatory: true
      },
      {
        task: 'For Patent/Proprietary ASU Drugs: Compile safety data (acute oral toxicity data as per OECD guidelines) and clinical pilot efficacy literature.',
        statutoryRef: 'Rule 158B(II), Drugs & Cosmetics Rules 1945',
        mandatory: true
      },
      {
        task: 'Obtain manufacturing license from State AYUSH Licensing Authority on Form 25-D.',
        statutoryRef: 'Rule 151, Drugs & Cosmetics Rules 1945',
        mandatory: true
      }
    ],
    statutoryAuthority: 'State AYUSH Licensing Authority (SLA) & Ministry of Ayush, India',
    relevanceExplanation:
      'The foundational regulatory fork determining clinical testing obligations for any Ayurvedic drug startup.'
  },

  // 8. Drugs and Cosmetics Act 1940 - Schedule T & Rule 161
  {
    id: 'dca-schedule-t-rule-161',
    act: 'The Drugs and Cosmetics Act, 1940 & Rules, 1945',
    shortAct: 'Drugs & Cosmetics Rules 1945',
    section: 'Schedule T & Rule 161',
    title: 'Good Manufacturing Practices (GMP) and Mandatory ASU Labelling Rules',
    jurisdiction: 'national',
    productTypes: ['classical_formulation', 'phytopharmaceutical', 'cosmetic'],
    topics: ['gmp', 'schedule_t', 'labelling', 'rule_161', 'heavy_metals', 'shelf_life'],
    keywords: [
      'schedule t',
      'gmp',
      'rule 161',
      'labelling',
      'shelf life',
      'batch number',
      'heavy metals',
      'good manufacturing practices',
      'ayush gmp',
      'ayurvedic label'
    ],
    summary:
      'Mandates Good Manufacturing Practices (Schedule T) for premises, quality control, heavy metal testing, and Rule 161 mandatory labelling for Ayurvedic drugs.',
    content:
      'Schedule T prescribes Good Manufacturing Practices (GMP) factory specifications for ASU drugs, including factory hygiene, raw material testing, testing for heavy metals (Lead, Mercury, Arsenic, Cadmium), aflatoxins, and microbial loads. Rule 161 governs labelling: every Ayurvedic drug package must state the true list of ingredients with their botanical/classical names and quantities, batch number, manufacturing license number, expiry/shelf-life date (as per Rule 161B), and warning text if containing any poisonous plant listed in Schedule E(1).',
    complianceSteps: [
      {
        task: 'Ensure manufacturing premises hold a valid GMP Certificate issued under Schedule T.',
        statutoryRef: 'Schedule T, Drugs & Cosmetics Rules 1945',
        mandatory: true
      },
      {
        task: 'List all active botanical ingredients with classical name, botanical Latin binomial, and exact quantity per dose on container label.',
        statutoryRef: 'Rule 161(1), Drugs & Cosmetics Rules 1945',
        mandatory: true
      },
      {
        task: 'If containing Schedule E(1) substance (e.g. Bhang, Vatsanabha), print prominent statutory caution label: "Caution: To be taken under medical supervision".',
        statutoryRef: 'Rule 161(2) & Schedule E(1), Drugs & Cosmetics Rules 1945',
        mandatory: true
      }
    ],
    statutoryAuthority: 'State AYUSH Licensing Authority',
    relevanceExplanation:
      'Required for all manufacturing facilities, packaging design, and label compliance.'
  },

  // 9. Phytopharmaceutical Regulations 2015 (CDSCO / DCA)
  {
    id: 'phytopharmaceutical-reg-2015',
    act: 'Drugs and Cosmetics Rules, 1945 (Gazette Notification G.S.R. 918(E) 2015)',
    shortAct: 'Phytopharmaceutical Drug Regulations 2015',
    section: 'Rule 2(eb) & Schedule Y / CT Rules 2019',
    title: 'Regulatory Pathway for Phytopharmaceutical Drugs (Purified Botanical Fractions)',
    jurisdiction: 'national',
    productTypes: ['phytopharmaceutical', 'new_drug'],
    topics: ['phytopharmaceutical', 'cdsco', 'dcgi', 'clinical_trials', 'fingerprinting', 'markers'],
    keywords: [
      'phytopharmaceutical',
      'botanical drug',
      'purified fraction',
      'cdsco',
      'dcgi',
      'marker compounds',
      'chromatographic fingerprint',
      'phase 1',
      'phase 2',
      'clinical trials'
    ],
    summary:
      'Creates a scientific drug pathway under CDSCO for purified, standardized fractions of medicinal plants with at least four bioactive or analytical marker compounds.',
    content:
      'Introduced in 2015 under Rule 2(eb), a "Phytopharmaceutical drug" is defined as a purified and standardized fraction with defined minimum four marker compounds of an extract of a medicinal plant or its part, for internal or external use of human beings or animals for diagnosis, treatment, mitigation or prevention of any disease. Unlike traditional ASU medicines regulated by AYUSH, Phytopharmaceuticals are regulated centrally by the Central Drugs Standard Control Organisation (CDSCO / DCGI). They require stability studies, chromatographic chemical fingerprinting, mutagenicity testing, and human clinical trials (Phase I to Phase III) following the New Drugs and Clinical Trials Rules, 2019.',
    complianceSteps: [
      {
        task: 'Identify and quantify minimum four chemical marker compounds (bioactive/analytical) via HPLC/HPTLC/LC-MS.',
        statutoryRef: 'Rule 2(eb), Drugs & Cosmetics Rules 1945',
        mandatory: true
      },
      {
        task: 'Submit Investigational New Drug (IND) application to CDSCO for clinical trial permissions.',
        statutoryRef: 'New Drugs and Clinical Trials Rules, 2019',
        mandatory: true
      },
      {
        task: 'Obtain DCGI approval on Form CT-20/CT-23 prior to commercial manufacture and marketing.',
        statutoryRef: 'CDSCO Regulatory Guidance Document for Phytopharmaceuticals',
        mandatory: true
      }
    ],
    statutoryAuthority: 'Drugs Controller General of India (DCGI), CDSCO, New Delhi',
    relevanceExplanation:
      'The modern drug route for biotech and pharma entrepreneurs commercializing standardized Ayurvedic fractions globally.'
  },

  // 10. Trade Marks Act 1999 - Section 9
  {
    id: 'trademarks-act-sec-9',
    act: 'The Trade Marks Act, 1999 (India)',
    shortAct: 'Trade Marks Act 1999',
    section: 'Section 9(1)',
    title: 'Absolute Grounds for Refusal — Descriptive Botanical & Ayurvedic Names',
    jurisdiction: 'national',
    productTypes: ['classical_formulation', 'cosmetic', 'nutraceutical', 'phytopharmaceutical', 'new_drug'],
    topics: ['trademark', 'botanical_names', 'generic_terms', 'distinctiveness', 'brand_protection'],
    keywords: [
      'trademark',
      'trade mark',
      'brand name',
      'generic',
      'descriptive',
      'ashwagandha',
      'triphala',
      'chyawanprash',
      'section 9',
      'publici juris',
      'coined mark',
      'class 5',
      'class 3'
    ],
    summary:
      'Common Sanskrit herb names and generic Ayurvedic formulation names cannot be registered as exclusive trademarks. Brand names must be distinctive or coined.',
    content:
      'Section 9(1)(b) of the Trade Marks Act, 1999 provides that marks consisting exclusively of words indicating the kind, quality, intended purpose, or botanical nature of goods cannot be registered. Classical Ayurvedic names such as "Chyawanprash", "Ashwagandha", "Brahmi", "Triphala", or "Taila" are generic terms (publici juris). The Trade Marks Registry will issue Section 9 examination objections if an entrepreneur attempts to trademark a single botanical name. To obtain trademark registration (typically in Class 5 for pharmaceuticals/Ayurvedic medicines or Class 3 for herbal cosmetics), entrepreneurs must coin arbitrary or fanciful names (e.g. "KansaVeda", "Herbocare-Ashwa") or combine them into a distinctive composite logo/label.',
    complianceSteps: [
      {
        task: 'Select a coined or arbitrary brand name rather than a descriptive Sanskrit botanical name.',
        statutoryRef: 'Section 9(1)(a) & (b), Trade Marks Act 1999',
        mandatory: true
      },
      {
        task: 'File trademark application in Nice Class 5 (Ayurvedic/medicinal) and/or Class 3 (herbal cosmetics) via IP India portal.',
        statutoryRef: 'Trade Marks Rules 2017',
        mandatory: true
      },
      {
        task: 'Include a disclaimer in the trademark application disclaiming exclusive right to any descriptive botanical word in the mark.',
        statutoryRef: 'Section 17 & Section 9, Trade Marks Act 1999',
        mandatory: false
      }
    ],
    statutoryAuthority: 'Trade Marks Registry (TMR), CGPDTM, India',
    relevanceExplanation:
      'Protects entrepreneurs from having their trademark applications rejected for attempting to monopolize common Ayurvedic terms.'
  },

  // 11. FSSAI Ayurveda Aahar Regulations 2022
  {
    id: 'fssai-ayurveda-aahar-2022',
    act: 'Food Safety and Standards (Ayurveda Aahar) Regulations, 2022',
    shortAct: 'FSSAI Ayurveda Aahar Regs 2022',
    section: 'Regulation 3, 5 & 6',
    title: 'Standards, Labelling, and Prohibition of Disease Treatment Claims for Food Supplements',
    jurisdiction: 'national',
    productTypes: ['nutraceutical'],
    topics: ['fssai', 'ayurveda_aahar', 'food_supplement', 'prohibited_claims', 'labelling_logo'],
    keywords: [
      'ayurveda aahar',
      'fssai',
      'nutraceutical',
      'food supplement',
      'dietary',
      'wellness powder',
      'herbal tea',
      'prohibited claims',
      'ayurveda aahar logo',
      'schedule a',
      'disease cure'
    ],
    summary:
      'Governs Ayurvedic food supplements. Requires the special Ayurveda Aahar logo, authoritative text references, and strictly bans claiming to treat, cure, or prevent disease.',
    content:
      'The FSSAI Ayurveda Aahar Regulations, 2022 define "Ayurveda Aahar" as food prepared in accordance with the recipes, ingredients, and processes described in the authoritative books of Ayurveda listed in Schedule A. Crucially, Regulation 6 prohibits making any claims that Ayurveda Aahar will prevent, treat, mitigate, or cure any specific human disease. Labels must display the mandatory "Ayurveda Aahar" green logo, clear target consumer age guidance, and the disclaimer: "ONLY FOR HEALTH PROMOTION AND WELLNESS — NOT FOR MEDICINAL USE". Formulations using synthetic vitamins or non-approved additives cannot be marketed as Ayurveda Aahar.',
    complianceSteps: [
      {
        task: 'Verify that formulation and ingredients match the authoritative books listed in Schedule A of the Regulations.',
        statutoryRef: 'Regulation 3 & Schedule A, FSSAI Ayurveda Aahar Regulations 2022',
        mandatory: true
      },
      {
        task: 'Affix the official Ayurveda Aahar logo on the primary display panel of packaging.',
        statutoryRef: 'Regulation 5(1), FSSAI Ayurveda Aahar Regulations 2022',
        mandatory: true
      },
      {
        task: 'Scrub all product packaging, website, and promotional literature of any claim to "cure, treat, or prevent" diseases.',
        statutoryRef: 'Regulation 6, FSSAI Ayurveda Aahar Regulations 2022 & Section 24 FSS Act',
        mandatory: true
      }
    ],
    statutoryAuthority: 'Food Safety and Standards Authority of India (FSSAI), New Delhi',
    relevanceExplanation:
      'Governs all Ayurvedic teas, nutrition powders, herbal decoctions sold under the food license rather than drug license.'
  },

  // 12. Geographical Indications Act 1999
  {
    id: 'gi-act-1999',
    act: 'The Geographical Indications of Goods (Registration and Protection) Act, 1999',
    shortAct: 'GI Act 1999',
    section: 'Section 2(e) & Section 9',
    title: 'Protection of Endemic Indian Ayurvedic Cultivars and Herb Provenance',
    jurisdiction: 'national',
    productTypes: ['classical_formulation', 'phytopharmaceutical', 'nutraceutical', 'cosmetic'],
    topics: ['geographical_indication', 'gi_tag', 'alleppey_cardamom', 'malabar_pepper', 'provenance'],
    keywords: [
      'geographical indication',
      'gi tag',
      'gi act',
      'malabar pepper',
      'alleppey cardamom',
      'navara rice',
      'cultivar',
      'provenance',
      'authorized user',
      'section 2e'
    ],
    summary:
      'Protects geographically specific agricultural and medicinal goods. Commercial branding claiming protected GI origins must hold an Authorized User Certificate.',
    content:
      'Under the GI Act 1999, geographical indications protect goods whose quality, reputation, or other characteristics are attributable to their geographical origin. Many famous Ayurvedic ingredients hold registered GI tags in India, such as Malabar Pepper (GI-3), Alleppey Green Cardamom (GI-8), Navara Rice (GI-18, famous in Panchakarma Kizhikkoodu therapy), and Nilambur Teak. An Ayurvedic entrepreneur cannot advertise "Contains authentic Alleppey Cardamom" or use the GI logo unless they register as an "Authorized User" under Section 17 of the GI Act or procure directly from registered producer federations.',
    complianceSteps: [
      {
        task: 'If advertising specific GI botanical origin on labels, apply for Authorized User status on Form GI-3.',
        statutoryRef: 'Section 17, GI Act 1999',
        mandatory: false
      },
      {
        task: 'Obtain procurement receipts and GI batch traceability certificates from registered grower cooperatives.',
        statutoryRef: 'Section 22, GI Act 1999',
        mandatory: true
      }
    ],
    statutoryAuthority: 'Geographical Indications Registry, Chennai, India',
    relevanceExplanation:
      'Essential for premium Ayurvedic brands emphasizing origin purity (e.g., Wayanad Ginger, Alleppey Cardamom).'
  },

  // 13. TRIPS Agreement (WTO) - Article 27
  {
    id: 'trips-article-27',
    act: 'WTO Agreement on Trade-Related Aspects of Intellectual Property Rights (TRIPS)',
    shortAct: 'TRIPS Agreement',
    section: 'Article 27',
    title: 'Patentable Subject Matter, Public Morality Exclusions, and Biological Exceptions',
    jurisdiction: 'international',
    productTypes: ['new_drug', 'phytopharmaceutical', 'classical_formulation'],
    topics: ['trips', 'wto', 'international_patents', 'article_27', 'plant_patents', 'sui_generis'],
    keywords: [
      'trips',
      'wto',
      'article 27',
      'international patent',
      'patentable subject matter',
      'public morality',
      'plant varieties',
      'sui generis',
      'pct',
      'paris convention'
    ],
    summary:
      'Establishes global patent standards while permitting members to exclude diagnostic/therapeutic methods and plants from patentability under Article 27.2 and 27.3(b).',
    content:
      'Article 27.1 of the TRIPS Agreement establishes that patents shall be available for any inventions, whether products or processes, in all fields of technology, provided they are new, involve an inventive step, and are capable of industrial application. However, Article 27.2 permits member nations to exclude inventions to protect human, animal or plant life or health. Article 27.3(b) allows members to exclude plants and animals from patenting, mandating either patents or an effective "sui generis" system for plant varieties (which India implemented via the Protection of Plant Varieties and Farmers Rights Act 2001). For Ayurvedic international patent filings (via PCT), claims must be carefully framed as specific industrial processes or isolated chemical compositions to satisfy Article 27 criteria across jurisdictions.',
    complianceSteps: [
      {
        task: 'Draft international Patent Cooperation Treaty (PCT) claims focusing on novel extraction processes or defined chemical formulations rather than whole plants or therapeutic treatment methods.',
        statutoryRef: 'Article 27.1 & 27.3(a), TRIPS Agreement',
        mandatory: true
      },
      {
        task: 'Review national phase patentability laws of target destination countries (e.g. USPTO 35 USC 101/102 vs EPO EPC Article 53/54) for plant extract eligibility.',
        statutoryRef: 'TRIPS National Phase Guidelines',
        mandatory: true
      }
    ],
    statutoryAuthority: 'World Trade Organization (WTO) & National Patent Offices (USPTO, EPO, JPO)',
    relevanceExplanation:
      'The international treaty framework governing global patent applications for Indian botanical innovations.'
  },

  // 14. WIPO GRATK Treaty (Adopted May 2024)
  {
    id: 'wipo-gratk-2024',
    act: 'WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge (2024)',
    shortAct: 'WIPO GRATK Treaty 2024',
    section: 'Article 3 & Article 4',
    title: 'Mandatory Patent Disclosure Requirements for Genetic Resources & Traditional Knowledge',
    jurisdiction: 'international',
    productTypes: ['classical_formulation', 'new_drug', 'phytopharmaceutical', 'cosmetic', 'nutraceutical'],
    topics: ['wipo', 'gratk', 'biopiracy', 'mandatory_disclosure', 'international_treaty', 'genetic_resources'],
    keywords: [
      'wipo',
      'gratk',
      'wipo treaty 2024',
      'genetic resources',
      'associated traditional knowledge',
      'mandatory disclosure',
      'country of origin',
      'biopiracy',
      'pct disclosure',
      'indigenous knowledge'
    ],
    summary:
      'Historic global treaty requiring patent applicants in all contracting member states to mandatorily disclose the country of origin of genetic resources and traditional knowledge.',
    content:
      'Concluded at WIPO headquarters in Geneva on May 24, 2024, the WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge establishes a breakthrough global obligation. Under Article 3, where a claimed invention in a patent application is based on genetic resources, each contracting party MUST require applicants to disclose the country of origin of the genetic resources (e.g., India). Where the invention is based on associated traditional knowledge, the applicant must disclose the indigenous peoples or local community who provided the traditional knowledge. This creates an international anti-biopiracy shield, harmonizing disclosure requirements across Europe, the Americas, and Asia.',
    complianceSteps: [
      {
        task: 'Include clear declaration of India as the country of origin of botanical genetic resources in all PCT and international patent filings.',
        statutoryRef: 'Article 3.1, WIPO GRATK Treaty 2024',
        mandatory: true
      },
      {
        task: 'Where formulation utilizes documented classical Ayurvedic wisdom, cite the traditional medical system source text to prevent downstream accusations of fraudulent concealment.',
        statutoryRef: 'Article 3.2 & Article 4, WIPO GRATK Treaty 2024',
        mandatory: true
      }
    ],
    statutoryAuthority: 'World Intellectual Property Organization (WIPO), Geneva',
    relevanceExplanation:
      'Crucial new international compliance checkpoint for Indian Ayurvedic exporters filing patents in overseas markets.'
  },

  // 15. Ayurvedic Cosmetics Regulations (Schedule S & DCA 1940)
  {
    id: 'dca-cosmetic-rules',
    act: 'The Drugs and Cosmetics Act, 1940 & Cosmetics Rules, 2020',
    shortAct: 'Cosmetics Rules 2020',
    section: 'Part III & Rule 158B(cosmetics)',
    title: 'Classification Boundary Between Ayurvedic Cosmetic vs Ayurvedic Medicine',
    jurisdiction: 'national',
    productTypes: ['cosmetic'],
    topics: ['cosmetics', 'herbal_cosmetics', 'ayurvedic_cosmetic', 'therapeutic_claim_boundary', 'licensing'],
    keywords: [
      'cosmetic',
      'herbal cosmetic',
      'ayurvedic cosmetic',
      'skincare',
      'hair oil',
      'kumkumadi',
      'anti-aging',
      'acne cure',
      'cosmetics rules 2020',
      'sla license',
      'beautification'
    ],
    summary:
      'Ayurvedic cosmetics intended purely for cleansing, beautifying, or altering appearance cannot claim to treat or cure skin/hair diseases without triggering full Ayurvedic drug licensing.',
    content:
      'Under the Drugs and Cosmetics Act and Cosmetics Rules 2020, "cosmetics" are defined as articles intended to be rubbed, poured, sprinkled or sprayed on the human body for cleansing, beautifying, promoting attractiveness or altering appearance. An Ayurvedic skincare product (e.g., Kumkumadi Tailam, herbal face wash) can be licensed either as an Ayurvedic Drug (under Chapter IV-A, if claiming therapeutic treatment of eczema, psoriasis, or severe acne) or as an Ayurvedic Cosmetic (if claiming beautification, glow, or moisturizing). If marketed as a cosmetic, claiming to "cure acne" or "reverse medical alopecia" is an unlawful misbranding under Section 17C/Section 18. Cosmetic manufacturing requires Form 32 license or compliance with Bureau of Indian Standards (BIS) cosmetic norms.',
    complianceSteps: [
      {
        task: 'Audit marketing and label claims: avoid therapeutic disease verbs ("cures, heals, eliminates dermatological diseases") if holding cosmetic license.',
        statutoryRef: 'Section 17C, Drugs & Cosmetics Act 1940 & Cosmetics Rules 2020',
        mandatory: true
      },
      {
        task: 'If seeking medical therapeutic acne or hair loss claims, transition product to AYUSH Form 25-D medicinal license instead of cosmetic license.',
        statutoryRef: 'Rule 158B, Drugs & Cosmetics Rules 1945',
        mandatory: true
      }
    ],
    statutoryAuthority: 'State Licensing Authority (Cosmetics & AYUSH)',
    relevanceExplanation:
      'Vital for D2C Ayurvedic skincare, hair care, and beauty brands navigating drug vs cosmetic advertising boundaries.'
  }
];
