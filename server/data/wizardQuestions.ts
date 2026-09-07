import {
  WizardQuestion,
  ProductClassification,
  ClassificationResult
} from '../../src/types.js';

export const WIZARD_QUESTIONS: WizardQuestion[] = [
  {
    id: 1,
    question: 'What is the recipe and formulation heritage of your product?',
    subtitle: 'Step 1 of 5: Statutory Formulation Origin',
    options: [
      {
        id: 'q1-classical',
        label: 'Classical Ayurvedic Text Reference',
        description:
          'Manufactured strictly according to recipes in authoritative books listed in the First Schedule of DCA 1940 (e.g. Charaka Samhita, Sushruta Samhita, AFI).',
        classificationWeight: { classical_formulation: 12 }
      },
      {
        id: 'q1-proprietary',
        label: 'Proprietary Herbal Innovation / Modern Blend',
        description:
          'Contains classical ingredients combined in novel proportions, or modified into modern capsule/tablet forms not verbatim in ancient texts.',
        classificationWeight: { classical_formulation: 6, phytopharmaceutical: 5, new_drug: 3 }
      },
      {
        id: 'q1-phyto',
        label: 'Purified & Standardized Botanical Fraction',
        description:
          'Contains a scientifically isolated extract fraction with at least 4 chemically characterized marker compounds.',
        classificationWeight: { phytopharmaceutical: 14 }
      },
      {
        id: 'q1-cosmetic',
        label: 'Topical Beauty / Personal Care Preparation',
        description:
          'Formulated into a skincare cream, oil, serum, or shampoo intended strictly for external beautification or cleansing.',
        classificationWeight: { cosmetic: 14 }
      },
      {
        id: 'q1-food',
        label: 'Dietary Nutrition / Wellness Food Preparation',
        description:
          'Herbal wellness drink, nutrition powder, or snack intended as an everyday dietary health supplement.',
        classificationWeight: { nutraceutical: 14 }
      }
    ]
  },
  {
    id: 2,
    question: 'What is your intended primary therapeutic or functional claim?',
    subtitle: 'Step 2 of 5: Regulatory Claim Boundary',
    options: [
      {
        id: 'q2-therapeutic-classical',
        label: 'Traditional Ayurvedic Disease Indication',
        description:
          'Promoting relief for conditions (e.g. Prameha, Amavata, Yakrit Roga) based on classical textual indications.',
        classificationWeight: { classical_formulation: 10 }
      },
      {
        id: 'q2-novel-drug',
        label: 'Novel Medical Therapeutic Claim with GCP Clinical Trials',
        description:
          'Seeking formal regulatory drug approval for a specific disease indication requiring Phase 1-3 clinical trials.',
        classificationWeight: { new_drug: 14, phytopharmaceutical: 6 }
      },
      {
        id: 'q2-phyto-claim',
        label: 'Pharmacological Target Mitigation via Botanical Fraction',
        description:
          'Demonstrating defined biochemical pathway inhibition or clinical endpoints using standardized fractions.',
        classificationWeight: { phytopharmaceutical: 12, new_drug: 4 }
      },
      {
        id: 'q2-cosmetic-beautify',
        label: 'External Beautification, Cleansing & Glow',
        description:
          'Intended solely to cleanse, moisturize, enhance appearance, or promote glow with NO disease cure claims.',
        classificationWeight: { cosmetic: 14 }
      },
      {
        id: 'q2-wellness-supplement',
        label: 'General Wellness & Physiological Balance (No Disease Claims)',
        description:
          'Positioned strictly for general health promotion and Rasayana vitality under food safety rules.',
        classificationWeight: { nutraceutical: 14 }
      }
    ]
  },
  {
    id: 3,
    question: 'What level of analytical and chemical standardization have you completed?',
    subtitle: 'Step 3 of 5: Analytical Characterization',
    options: [
      {
        id: 'q3-classical-api',
        label: 'Ayurvedic Pharmacopoeia of India (API) Monograph Standards',
        description:
          'Identified raw herbs tested for identity, purity, foreign matter, and classical organoleptic criteria.',
        classificationWeight: { classical_formulation: 10 }
      },
      {
        id: 'q3-four-markers',
        label: 'Multi-Marker Chromatographic Fingerprinting (Minimum 4 Markers)',
        description:
          'Validated HPLC/HPTLC/LC-MS chemical profiling quantifying at least four distinct bioactive or analytical marker compounds.',
        classificationWeight: { phytopharmaceutical: 14 }
      },
      {
        id: 'q3-novel-nct',
        label: 'Comprehensive Pre-clinical Toxicology & IND Protocol',
        description:
          'Complete GLP animal toxicology, mutagenicity, safety pharmacology, and human pharmacokinetic dossier.',
        classificationWeight: { new_drug: 14 }
      },
      {
        id: 'q3-dermatology',
        label: 'Dermatological Safety & Cosmetic Preservative Testing',
        description:
          'Skin patch test, ocular irritation safety, and microbial limit testing conforming to Bureau of Indian Standards (BIS).',
        classificationWeight: { cosmetic: 12 }
      },
      {
        id: 'q3-fssai-testing',
        label: 'Food Safety Panel: Heavy Metals, Pesticides & Nutrition Label',
        description:
          'Tested for Lead, Mercury, Arsenic, Cadmium, aflatoxins, and macro/micronutrient breakdown under FSSAI norms.',
        classificationWeight: { nutraceutical: 12 }
      }
    ]
  },
  {
    id: 4,
    question: 'What is the dosage form and route of administration?',
    subtitle: 'Step 4 of 5: Delivery Architecture',
    options: [
      {
        id: 'q4-classical-forms',
        label: 'Classical Ayurvedic Form (Churna, Vati, Asava, Taila, Bhasma)',
        description:
          'Traditional internal or external formulation prepared through classical heating, boiling, or fermentation processes.',
        classificationWeight: { classical_formulation: 10 }
      },
      {
        id: 'q4-phytosome-extract',
        label: 'Standardized Encapsulated Extract / Purified Phytochemical',
        description:
          'Standardized tablet, capsule, or purified dry extract granules with known milligrams of active botanical fractions.',
        classificationWeight: { phytopharmaceutical: 10, nutraceutical: 4 }
      },
      {
        id: 'q4-novel-carrier',
        label: 'Nanoparticle / Liposomal / Novel Drug Delivery Carrier',
        description:
          'Engineered synthetic polymer, liposome, or phospholipid carrier modifying release kinetics or tissue targeting.',
        classificationWeight: { new_drug: 12, phytopharmaceutical: 6 }
      },
      {
        id: 'q4-topical-skin',
        label: 'Topical Cosmetic Emulsion, Serum, or Wash',
        description:
          'Face cream, body butter, scalp oil, or cleansing lotion applied directly to epidermis or hair.',
        classificationWeight: { cosmetic: 12 }
      },
      {
        id: 'q4-food-drink',
        label: 'Herbal Beverage, Health Powder, or Edible Chewable',
        description:
          'Instant herbal tea granules, meal replacement shake, ready-to-drink wellness infusion, or confectionery.',
        classificationWeight: { nutraceutical: 12 }
      }
    ]
  },
  {
    id: 5,
    question: 'Which regulatory agency are you seeking manufacturing authorization from?',
    subtitle: 'Step 5 of 5: Regulatory Gateway Target',
    options: [
      {
        id: 'q5-ayush-sla',
        label: 'State AYUSH Licensing Authority (Drugs & Cosmetics Act)',
        description:
          'Applying for ASU manufacturing license on Form 25-D under Chapter IV-A.',
        classificationWeight: { classical_formulation: 12 }
      },
      {
        id: 'q5-cdsco-dcgi',
        label: 'CDSCO / DCGI Central Authority for New Drugs',
        description:
          'Filing Investigational New Drug (IND) and commercial manufacturing authorization with the DCGI New Delhi.',
        classificationWeight: { new_drug: 14 }
      },
      {
        id: 'q5-phyto-cdsco',
        label: 'CDSCO Phytopharmaceutical Drug Division',
        description:
          'Applying for botanical drug approval under Rule 2(eb) with multi-marker batch consistency data.',
        classificationWeight: { phytopharmaceutical: 14 }
      },
      {
        id: 'q5-cosmetics-license',
        label: 'State Licensing Authority for Cosmetics (Cosmetics Rules 2020)',
        description:
          'Applying for cosmetic manufacturing license on Form 32 / BIS conformity for personal care products.',
        classificationWeight: { cosmetic: 14 }
      },
      {
        id: 'q5-fssai-portal',
        label: 'FSSAI FoSCoS Portal (Ayurveda Aahar Category)',
        description:
          'Applying for central or state food business operator license under the Ayurveda Aahar category.',
        classificationWeight: { nutraceutical: 14 }
      }
    ]
  }
];

export function evaluateClassification(selectedOptionIds: string[]): ClassificationResult {
  const scores: Record<ProductClassification, number> = {
    classical_formulation: 0,
    new_drug: 0,
    phytopharmaceutical: 0,
    cosmetic: 0,
    nutraceutical: 0
  };

  for (const question of WIZARD_QUESTIONS) {
    for (const option of question.options) {
      if (selectedOptionIds.includes(option.id)) {
        for (const [cat, weight] of Object.entries(option.classificationWeight)) {
          scores[cat as ProductClassification] += weight || 0;
        }
      }
    }
  }

  // Determine top category
  let topCategory: ProductClassification = 'classical_formulation';
  let highestScore = -1;

  for (const [cat, score] of Object.entries(scores)) {
    if (score > highestScore) {
      highestScore = score;
      topCategory = cat as ProductClassification;
    }
  }

  return getClassificationDetails(topCategory);
}

export function getClassificationDetails(category: ProductClassification): ClassificationResult {
  switch (category) {
    case 'classical_formulation':
      return {
        category: 'classical_formulation',
        categoryName: 'Classical Ayurvedic Formulation',
        hindiName: 'शास्त्रीय आयुर्वेदिक योग',
        description:
          'Manufactured strictly according to the authoritative Ayurvedic books specified in the First Schedule to the Drugs & Cosmetics Act 1940 (e.g. Charaka Samhita, Sushruta Samhita, Ayurvedic Formulary of India).',
        primaryRegulatoryBody: 'State AYUSH Licensing Authority (SLA)',
        patentabilityStatus:
          'Strictly Non-Patentable in India under Section 3(p) of Patents Act 1970 (Traditional Knowledge). Protected from foreign misappropriation by TKDL.',
        statutoryBasis: 'Drugs & Cosmetics Act 1940, Section 3(a) & Rule 158B(I)',
        recommendedRoute:
          'Secure Form 25-D manufacturing license from State AYUSH Licensing Authority. Protect your distinctive coined commercial brand name under Class 5 of the Trade Marks Act 1999.',
        keyComplianceRequirements: [
          'Verify Sanskrit textual citation and recipe in the First Schedule authoritative books.',
          'Adhere strictly to Schedule T Good Manufacturing Practices (GMP).',
          'Ensure Rule 161 labelling compliance with classical ingredient references.',
          'Execute prior intimation to State Biodiversity Board (SBB) under Section 7 of BDA 2002 if commercial manufacturing.'
        ]
      };

    case 'phytopharmaceutical':
      return {
        category: 'phytopharmaceutical',
        categoryName: 'Phytopharmaceutical Drug',
        hindiName: 'फाइटोफार्मास्युटिकल औषधि',
        description:
          'A purified and standardized botanical fraction with defined minimum four marker compounds (analytical or bioactive) derived from medicinal plants.',
        primaryRegulatoryBody: 'CDSCO / DCGI (Central Drugs Standard Control Organisation)',
        patentabilityStatus:
          'Potentially Patentable if demonstrating non-obvious isolation process or unexpected therapeutic enhancement under Section 3(d) of Patents Act 1970.',
        statutoryBasis: 'Drugs & Cosmetics Rules 1945, Rule 2(eb) & New Drugs and Clinical Trials Rules 2019',
        recommendedRoute:
          'File Investigational New Drug (IND) application with CDSCO. Obtain National Biodiversity Authority (NBA) approval on Form III prior to patent grant.',
        keyComplianceRequirements: [
          'Quantify minimum 4 marker compounds with chromatographic fingerprinting (HPLC/LC-MS).',
          'Conduct GLP non-clinical toxicology and human clinical trials (Phase I-III).',
          'Obtain prior NBA approval under Section 6 of Biological Diversity Act 2002 before patent grant.',
          'Establish non-obvious therapeutic enhancement to overcome Section 3(d) patent objection.'
        ]
      };

    case 'new_drug':
      return {
        category: 'new_drug',
        categoryName: 'New Botanical / Chemical Entity Drug',
        hindiName: 'नवीन औषधि (New Drug)',
        description:
          'Novel chemical entity, synthesized botanical derivative, or modified delivery system requiring formal new drug approval under the New Drugs and Clinical Trials Rules 2019.',
        primaryRegulatoryBody: 'Drugs Controller General of India (DCGI), CDSCO',
        patentabilityStatus:
          'High Patentability potential for novel synthetic molecules or non-obvious modified derivatives clearing Section 3(d) and 3(e) hurdles.',
        statutoryBasis: 'New Drugs and Clinical Trials Rules 2019 & Patents Act 1970',
        recommendedRoute:
          'File provisional patent application with IPO, execute Form III NBA clearance, and conduct formal GCP Phase 1-3 clinical trials.',
        keyComplianceRequirements: [
          'Complete rigorous animal safety, pharmacokinetics, and Phase 1-3 clinical trials.',
          'Submit Form CT-20 application to CDSCO for new drug manufacturing permission.',
          'File mandatory biological origin disclosure under Section 10(4)(d)(ii) of Patents Act.',
          'Ensure ABS benefit sharing agreement is executed with NBA Chennai.'
        ]
      };

    case 'cosmetic':
      return {
        category: 'cosmetic',
        categoryName: 'Ayurvedic Cosmetic / Personal Care',
        hindiName: 'आयुर्वेदिक प्रसाधन (Cosmetic)',
        description:
          'Topical formulation intended solely to be rubbed, poured, or sprayed on the human body for cleansing, beautifying, promoting attractiveness, or altering appearance with NO therapeutic disease-cure claims.',
        primaryRegulatoryBody: 'State Licensing Authority (Cosmetics) & CDSCO',
        patentabilityStatus:
          'Process patents possible for novel extraction methods or novel emulsion carriers; aesthetic formulations must avoid Section 3(e) mere admixture rejections.',
        statutoryBasis: 'Drugs & Cosmetics Act 1940, Section 3(aaa) & Cosmetics Rules 2020',
        recommendedRoute:
          'Obtain Form 32 cosmetic manufacturing license. Strictly avoid therapeutic claims on packaging to avoid misbranding penalties.',
        keyComplianceRequirements: [
          'Comply with Bureau of Indian Standards (BIS) cosmetic quality and microbial specifications.',
          'Strictly purge labels and digital marketing of disease treatment verbs (e.g. "cures eczema, treats alopecia").',
          'Register brand name in Nice Class 3 (Cosmetics and Personal Care) under Trade Marks Act 1999.',
          'Ensure heavy metals and skin irritation tests meet safety parameters.'
        ]
      };

    case 'nutraceutical':
      return {
        category: 'nutraceutical',
        categoryName: 'Ayurveda Aahar / Nutraceutical Food Supplement',
        hindiName: 'आयुर्वेद आहार / न्यूट्रास्युटिकल',
        description:
          'Food prepared in accordance with recipes or authoritative texts documented in Schedule A of the FSSAI Ayurveda Aahar Regulations 2022, intended for health promotion and physiological wellness.',
        primaryRegulatoryBody: 'Food Safety and Standards Authority of India (FSSAI)',
        patentabilityStatus:
          'Food formulations are generally excluded from patents under Section 3(e) (mere admixture); protect unique brand trademarks in Nice Class 5 and Class 29/30.',
        statutoryBasis: 'Food Safety and Standards (Ayurveda Aahar) Regulations 2022',
        recommendedRoute:
          'Obtain FSSAI FoSCoS license under Ayurveda Aahar category. Affix mandatory green Ayurveda Aahar logo on packaging.',
        keyComplianceRequirements: [
          'Verify all botanical ingredients and processing methods are grounded in Schedule A classical texts.',
          'Affix the official green "Ayurveda Aahar" logo on primary packaging panel.',
          'Print mandatory non-medicinal disclaimer: "ONLY FOR HEALTH PROMOTION AND WELLNESS — NOT FOR MEDICINAL USE".',
          'Strictly prohibited from making any claim to cure, mitigate, or treat human diseases.'
        ]
      };
  }
}
