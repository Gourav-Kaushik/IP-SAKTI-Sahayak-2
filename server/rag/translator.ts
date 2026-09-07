import { LanguageCode, LanguageOption } from '../../src/types.js';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी', flag: '🇮🇳' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা', flag: '🇮🇳' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം', flag: '🇮🇳' }
];

export const STATIC_LOCALIZATION: Record<LanguageCode, {
  appName: string;
  tagline: string;
  disclaimer: string;
  guardrailRefusal: string;
  sourceLabel: string;
  complianceLabel: string;
  jurisdictionNational: string;
  jurisdictionInternational: string;
  classificationTitle: string;
  restartWizard: string;
  highConfidence: string;
  statutorySource: string;
  testSuiteTitle: string;
  corpusExplorer: string;
  inputPlaceholder: string;
  askAssistant: string;
  mandatoryTag: string;
  optionalTag: string;
}> = {
  en: {
    appName: 'IP-SAKTI Sahayak',
    tagline: 'Source-Cited Legal & IP Assistant for Ayurveda Innovators',
    disclaimer: 'This tool provides informational guidance based strictly on verified statutes, not a substitute for a licensed IP professional.',
    guardrailRefusal: "I don't have verified legal information on this query in the statutory corpus — consider consulting a licensed IP professional or the relevant statutory authority (such as the Indian Patent Office or National Biodiversity Authority).",
    sourceLabel: 'Verified Statutory Citations',
    complianceLabel: 'Statutory Compliance Checklist',
    jurisdictionNational: '🇮🇳 National (Indian Law)',
    jurisdictionInternational: '🌐 International (WIPO / TRIPS)',
    classificationTitle: 'Product Classification Assessment',
    restartWizard: 'Re-classify Product',
    highConfidence: 'Statutory Confidence',
    statutorySource: 'Statutory Authority',
    testSuiteTitle: 'Automated Audit Suite',
    corpusExplorer: 'Knowledge Corpus Explorer',
    inputPlaceholder: 'Ask a legal or IP question regarding your Ayurvedic product...',
    askAssistant: 'Consult Sahayak',
    mandatoryTag: 'Mandatory',
    optionalTag: 'Recommended'
  },
  hi: {
    appName: 'आईपी-शक्ति सहायक',
    tagline: 'आयुर्वेद उद्यमियों के लिए स्रोत-प्रमाणित कानूनी और बौद्धिक संपदा सहायक',
    disclaimer: 'यह उपकरण केवल प्रमाणित कानूनों के आधार पर सूचनात्मक मार्गदर्शन प्रदान करता है, यह किसी लाइसेंस प्राप्त कानूनी पेशेवर का विकल्प नहीं है।',
    guardrailRefusal: 'वैधानिक ज्ञानकोष में इस प्रश्न पर कोई सत्यापित कानूनी जानकारी उपलब्ध नहीं है — कृपया किसी लाइसेंस प्राप्त आईपी पेशेवर या संबंधित वैधानिक प्राधिकरण से परामर्श करें।',
    sourceLabel: 'प्रमाणित वैधानिक संदर्भ (Citations)',
    complianceLabel: 'वैधानिक अनुपालन चेकलिस्ट (Compliance Checklist)',
    jurisdictionNational: '🇮🇳 राष्ट्रीय (भारतीय कानून)',
    jurisdictionInternational: '🌐 अंतर्राष्ट्रीय (WIPO / TRIPS)',
    classificationTitle: 'उत्पाद वर्गीकरण मूल्यांकन',
    restartWizard: 'पुनः वर्गीकरण करें',
    highConfidence: 'वैधानिक विश्वसनीयता',
    statutorySource: 'वैधानिक प्राधिकरण',
    testSuiteTitle: 'स्वचालित परीक्षण सूट',
    corpusExplorer: 'कानूनी ज्ञानकोष अन्वेषक',
    inputPlaceholder: 'अपने आयुर्वेदिक उत्पाद के पेटेंट या विनियामक अनुपालन के बारे में पूछें...',
    askAssistant: 'परामर्श लें',
    mandatoryTag: 'अनिवार्य',
    optionalTag: 'अनुशंसित'
  },
  ta: {
    appName: 'ஐபி-சக்தி சஹாயக்',
    tagline: 'ஆயுர்வேத தொழில்முனைவோருக்கான சட்ட மற்றும் அறிவுசார் சொத்து உதவியாளர்',
    disclaimer: 'இந்த கருவி சரிபார்க்கப்பட்ட சட்டங்களின் அடிப்படையில் தகவல்களை மட்டுமே வழங்குகிறது, உரிமம் பெற்ற சட்ட நிபுணருக்கு மாற்றாகாது.',
    guardrailRefusal: 'சட்டக் களஞ்சியத்தில் இதற்கான சரிபார்க்கப்பட்ட சட்டத் தகவல் இல்லை — உரிமம் பெற்ற அறிவுசார் சொத்து நிபுணரை அணுகவும்.',
    sourceLabel: 'சரிபார்க்கப்பட்ட சட்டக் குறிப்புகள் (Citations)',
    complianceLabel: 'சட்டப்பூர்வ இணக்க சரிபார்ப்புப் பட்டியல்',
    jurisdictionNational: '🇮🇳 தேசியம் (இந்திய சட்டம்)',
    jurisdictionInternational: '🌐 சர்வதேசம் (WIPO / TRIPS)',
    classificationTitle: 'தயாரிப்பு வகைப்படுத்தல்',
    restartWizard: 'மீண்டும் வகைப்படுத்து',
    highConfidence: 'சட்டப்பூர்வ நம்பிக்கை',
    statutorySource: 'சட்டப்பூர்வ ஆணையம்',
    testSuiteTitle: 'தானியங்கி சோதனை தொகுப்பு',
    corpusExplorer: 'சட்ட நூலகம்',
    inputPlaceholder: 'உங்கள் ஆயுர்வேத தயாரிப்பு தொடர்பான சட்டக் கேள்விகளைக் கேட்கவும்...',
    askAssistant: 'ஆலோசனை பெறுக',
    mandatoryTag: 'கட்டாயம்',
    optionalTag: 'பரிந்துரைக்கப்பட்டது'
  },
  te: {
    appName: 'ఐపీ-శక్తి సహాయక్',
    tagline: 'ఆయుర్వేద పారిశ్రామికవేత్తల కోసం చట్టపరమైన మరియు ఐపీ సహాయకుడు',
    disclaimer: 'ఈ సాధనం ధృవీకరించబడిన చట్టాల ఆధారంగా సమాచార మార్గదర్శకత్వాన్ని మాత్రమే అందిస్తుంది, న్యాయ నిపుణులకు ప్రత్యామ్నాయం కాదు.',
    guardrailRefusal: 'చట్టపరమైన సమాచార నిల్వలో దీనిపై ధృవీకరించబడిన సమాచారం లేదు — దయచేసి లైసెన్స్ పొందిన ఐపీ నిపుణుడిని సంప్రదించండి.',
    sourceLabel: 'ధృవీకరించబడిన చట్టపరమైన మూలాలు (Citations)',
    complianceLabel: 'చట్టపరమైన వర్తింపు చెక్‌లిస్ట్',
    jurisdictionNational: '🇮🇳 జాతీయ (భారతీయ చట్టం)',
    jurisdictionInternational: '🌐 అంతర్జాతీయ (WIPO / TRIPS)',
    classificationTitle: 'ఉత్పత్తి వర్గీకరణ',
    restartWizard: 'మళ్లీ వర్గీకరించండి',
    highConfidence: 'చట్టపరమైన ఖచ్చితత్వం',
    statutorySource: 'చట్టపరమైన అధికారం',
    testSuiteTitle: 'స్వయంచాలక పరీక్షలు',
    corpusExplorer: 'చట్టాల అన్వేషణ',
    inputPlaceholder: 'మీ ఆయుర్వేద ఉత్పత్తి చట్టపరమైన ప్రశ్నను ఇక్కడ అడగండి...',
    askAssistant: 'సలహా తీసుకోండి',
    mandatoryTag: 'తప్పనిసరి',
    optionalTag: 'సిఫార్సు చేయబడింది'
  },
  mr: {
    appName: 'आयपी-शक्ती सहायक',
    tagline: 'आयुर्वेद उद्योजकांसाठी स्रोत-प्रमाणित कायदेशीर व आयपी मार्गदर्शक',
    disclaimer: 'हे साधन केवळ प्रमाणित कायद्यांच्या आधारे माहितीपूर्ण मार्गदर्शन देते, परवानाधारक कायदेशीर व्यावसायिकाचा पर्याय नाही.',
    guardrailRefusal: 'वैधानिक माहितीमध्ये या प्रश्नावर सत्यापित कायदेशीर माहिती उपलब्ध नाही — कृपया परवानाधारक आयपी सल्लागाराशी संपर्क साधा.',
    sourceLabel: 'प्रमाणित कायदेशीर संदर्भ (Citations)',
    complianceLabel: 'वैधानिक अनुपालन चेकलिस्ट',
    jurisdictionNational: '🇮🇳 राष्ट्रीय (भारतीय कायदा)',
    jurisdictionInternational: '🌐 आंतरराष्ट्रीय (WIPO / TRIPS)',
    classificationTitle: 'उत्पादन वर्गीकरण मूल्यमापन',
    restartWizard: 'पुन्हा वर्गीकरण करा',
    highConfidence: 'कायदेशीर विश्वासार्हता',
    statutorySource: 'वैधानिक प्राधिकरण',
    testSuiteTitle: 'स्वयंचलित चाचणी संच',
    corpusExplorer: 'कायदेशीर ज्ञानकोश',
    inputPlaceholder: 'आपल्या आयुर्वेदिक उत्पादनाविषयी कायदेशीर किंवा पेटंट प्रश्न विचारा...',
    askAssistant: 'सल्ला घ्या',
    mandatoryTag: 'अनिवार्य',
    optionalTag: 'शिफारस केलेले'
  },
  bn: {
    appName: 'আইপি-শক্তি সহায়ক',
    tagline: 'আয়ুর্বেদ উদ্যোক্তাদের জন্য প্রমাণ-ভিত্তিক আইনি ও বৌদ্ধিক সম্পদ সহায়ক',
    disclaimer: 'এই সরঞ্জামটি শুধুমাত্র যাচাইকৃত আইনের ভিত্তিতে তথ্যমূলক নির্দেশনা প্রদান করে, এটি কোনও লাইসেন্সপ্রাপ্ত আইনজীবীর বিকল্প নয়।',
    guardrailRefusal: 'আইনগত তথ্যভাণ্ডারে এই বিষয়ে কোনও যাচাইকৃত তথ্য নেই — দয়া করে একজন লাইসেন্সপ্রাপ্ত আইপি বিশেষজ্ঞের সাথে পরামর্শ করুন।',
    sourceLabel: 'যাচাইকৃত সংবিধিবদ্ধ উদ্ধৃতি (Citations)',
    complianceLabel: 'সংবিধিবদ্ধ সম্মতি চেকলিস্ট',
    jurisdictionNational: '🇮🇳 জাতীয় (ভারতীয় আইন)',
    jurisdictionInternational: '🌐 আন্তর্জাতিক (WIPO / TRIPS)',
    classificationTitle: 'পণ্য শ্রেণীকরণ মূল্যায়ন',
    restartWizard: 'পুনরায় শ্রেণীকরণ করুন',
    highConfidence: 'আইনি নির্ভুলতা',
    statutorySource: 'আইনি কর্তৃপক্ষ',
    testSuiteTitle: 'স্বয়ংক্রিয় পরীক্ষা স্যুট',
    corpusExplorer: 'আইন অন্বেষক',
    inputPlaceholder: 'আপনার আয়ুর্বেদিক পণ্য সম্পর্কিত আইনি বা পেটেন্ট প্রশ্ন জিজ্ঞাসা করুন...',
    askAssistant: 'পরামর্শ নিন',
    mandatoryTag: 'বাধ্যতামূলক',
    optionalTag: 'প্রস্তাবিত'
  },
  gu: {
    appName: 'આઇપી-શક્તિ સહાયક',
    tagline: 'આયુર્વેદ સાહસિકો માટે કાનૂની અને આઈપી સહાયક',
    disclaimer: 'આ સાધન માત્ર ચકાસાયેલ કાયદાઓના આધારે માહિતીપ્રદ માર્ગદર્શન પૂરું પાડે છે, વકીલનો વિકલ્પ નથી.',
    guardrailRefusal: 'આ પ્રશ્ન પર કોઈ ચકાસાયેલ કાનૂની માહિતી ઉપલબ્ધ નથી — કૃપા કરીને લાયસન્સ પ્રાપ્ત આઈપી પ્રોફેશનલની સલાહ લો.',
    sourceLabel: 'ચકાસાયેલ કાનૂની સંદર્ભો (Citations)',
    complianceLabel: 'કાનૂની પાલન ચેકલિસ્ટ',
    jurisdictionNational: '🇮🇳 રાષ્ટ્રીય (ભારતીય કાયદો)',
    jurisdictionInternational: '🌐 આંતરરાષ્ટ્રીય (WIPO / TRIPS)',
    classificationTitle: 'ઉત્પાદન વર્ગીકરણ',
    restartWizard: 'ફરીથી વર્ગીકૃત કરો',
    highConfidence: 'કાનૂની ચોકસાઈ',
    statutorySource: 'કાનૂની સત્તામંડળ',
    testSuiteTitle: 'સ્વચાલિત પરીક્ષણ',
    corpusExplorer: 'કાયદા સંગ્રહ',
    inputPlaceholder: 'તમારા આયુર્વેદિક ઉત્પાદન અંગે કાનૂની પ્રશ્ન પૂછો...',
    askAssistant: 'સલાહ લો',
    mandatoryTag: 'ફરજિયાત',
    optionalTag: 'ભલામણ કરેલ'
  },
  kn: {
    appName: 'ಐಪಿ-ಶಕ್ತಿ ಸಹಾಯಕ',
    tagline: 'ಆಯುರ್ವೇದ ಉದ್ಯಮಿಗಳಿಗೆ ಕಾನೂನು ಮತ್ತು ಬೌದ್ಧಿಕ ಆಸ್ತಿ ಸಹಾಯಕ',
    disclaimer: 'ಈ ಉಪಕರಣವು ಪರಿಶೀಲಿಸಿದ ಕಾಯ್ದೆಗಳ ಆಧಾರದ ಮೇಲೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ, ಕಾನೂನು ತಜ್ಞರಿಗೆ ಪರ್ಯಾಯವಲ್ಲ.',
    guardrailRefusal: 'ಕಾನೂನು ಭಂಡಾರದಲ್ಲಿ ಈ ಪ್ರಶ್ನೆಗೆ ಯಾವುದೇ ಪರಿಶೀಲಿಸಿದ ಮಾಹಿತಿಯಿಲ್ಲ — ದಯವಿಟ್ಟು ಪರವಾನಗಿ ಪಡೆದ ಐಪಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    sourceLabel: 'ಪರಿಶೀಲಿಸಿದ ಕಾನೂನು ಉಲ್ಲೇಖಗಳು (Citations)',
    complianceLabel: 'ಕಾನೂನು ಅನುಸರಣಾ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ',
    jurisdictionNational: '🇮🇳 ರಾಷ್ಟ್ರೀಯ (ಭಾರತೀಯ ಕಾನೂನು)',
    jurisdictionInternational: '🌐 ಅಂತಾರಾಷ್ಟ್ರೀಯ (WIPO / TRIPS)',
    classificationTitle: 'ಉತ್ಪನ್ನ ವರ್ಗೀಕರಣ',
    restartWizard: 'ಮತ್ತೆ ವರ್ಗೀಕರಿಸಿ',
    highConfidence: 'ಕಾನೂನು ವಿಶ್ವಾಸಾರ್ಹತೆ',
    statutorySource: 'ಕಾನೂನು ಪ್ರಾಧಿಕಾರ',
    testSuiteTitle: 'ಸ್ವಯಂಚಾಲಿತ ಪರೀಕ್ಷೆಗಳು',
    corpusExplorer: 'ಕಾನೂನು ಭಂಡಾರ',
    inputPlaceholder: 'ನಿಮ್ಮ ಆಯುರ್ವೇದ ಉತ್ಪನ್ನದ ಕಾನೂನು ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ...',
    askAssistant: 'ಸಲಹೆ ಪಡೆಯಿರಿ',
    mandatoryTag: 'ಕಡ್ಡಾಯ',
    optionalTag: 'ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ'
  },
  ml: {
    appName: 'ഐപി-ശക്തി സഹായക്',
    tagline: 'ആയുർവേദ സംരംഭകർക്കുള്ള നിയമ, ബൗദ്ധിക സ്വത്ത് സഹായി',
    disclaimer: 'ഈ ഉപകരണം സ്ഥിരീകരിച്ച നിയമങ്ങളുടെ അടിസ്ഥാനത്തിൽ വിവരങ്ങൾ നൽകുന്നു, നിയമജ്ഞർക്ക് പകരമല്ല.',
    guardrailRefusal: 'നിയമ ശേഖരത്തിൽ ഇതിനെക്കുറിച്ച് സ്ഥിരീകരിച്ച വിവരങ്ങൾ ലഭ്യമല്ല — ലൈസൻസുള്ള ഐപി വിദഗ്ദ്ധനെ സമീപിക്കുക.',
    sourceLabel: 'സ്ഥിരീകരിച്ച നിയമപരമായ അവലംബങ്ങൾ (Citations)',
    complianceLabel: 'നിയമാനുസൃത ചെക്ക്‌ലിസ്റ്റ്',
    jurisdictionNational: '🇮🇳 ദേശീയം (ഇന്ത്യൻ നിയമം)',
    jurisdictionInternational: '🌐 അന്തർദേശീയം (WIPO / TRIPS)',
    classificationTitle: 'ഉൽപ്പന്ന വർഗ്ഗീകരണം',
    restartWizard: 'വീണ്ടും വർഗ്ഗീകരിക്കുക',
    highConfidence: 'നിയമപരമായ കൃത്യത',
    statutorySource: 'നിയമപരമായ അതോറിറ്റി',
    testSuiteTitle: 'ടെസ്റ്റ് സ്യൂട്ട്',
    corpusExplorer: 'നിയമ ശേഖരം',
    inputPlaceholder: 'നിങ്ങളുടെ ആയുർവേദ ഉൽപ്പന്നത്തെക്കുറിച്ചുള്ള ചോദ്യങ്ങൾ ചോദിക്കുക...',
    askAssistant: 'ഉപദേശം തേടുക',
    mandatoryTag: 'നിർബന്ധം',
    optionalTag: 'ശുപാർശ ചെയ്യുന്നത്'
  }
};

// Multilingual keyword dictionary mapping regional Indic legal terms to statutory keywords
const INDIC_KEYWORD_MAP: Array<{ regex: RegExp; englishEquivalents: string }> = [
  // Patents / Inventions
  { regex: /(पेटेंट|पेटेन्ट|एकस्व|आविष्कार|अविष्कार|काப்புரிமை|காப்புரிமம்|పేటెంట్|పేటెంట్లు|ಆವಿಷ್ಕಾರ|ಪೇಟೆಂಟ್|പേറ്റന്റ്|ಕಂಡುಹಿಡಿ|উদ্ভাবন|পেটেন্ট|પેટન્ટ|शोध|संशोधन)/i, englishEquivalents: 'patent invention non-obvious' },
  // Traditional Knowledge / Ancient texts / TKDL
  { regex: /(चरक|सुश्रुत|संहिता|पारंपरिक|टीकेडीएल|tkdl|গ্রন্থ|பழமையான|சம்கிதை|ಸಂಹಿತೆ|സംഹിത|प्राचीन)/i, englishEquivalents: 'traditional knowledge TKDL Charaka Samhita Section 3(p)' },
  // Biodiversity / NBA / National Biodiversity Authority / Access and Benefit Sharing
  { regex: /(जैव विविधता|एनबीए|प्राधिकरण|राष्ट्रीय जैव विविधता|உயிரியல் பன்முகத்தன்மை|జీవవైవిధ్యం|ಜೀವವೈವಿಧ್ಯ|ബയോഡൈവേഴ്സിറ്റി|জীববৈচিত্র্য|જૈવવિવિધતા)/i, englishEquivalents: 'Biological Diversity Act 2002 NBA National Biodiversity Authority Section 6 ABS' },
  // Foreign investment / foreigners
  { regex: /(विदेश|विदेशी|फॉरेन|வெளிநாட்டு|విదేశీ|ವಿದೇಶಿ|വിദേശ|বিদেশি)/i, englishEquivalents: 'foreign investment company Section 3 NBA approval' },
  // Licensing / Manufacturing / Rule 158B / Classical vs Proprietary
  { regex: /(लाइसेंस|लाइसेंसिंग|अनुमति|शास्त्रीय|स्वामित्व|नियम 158|औषधि|உரிமம்|లైసెన్స్|ಲೈಸೆನ್ಸ್|ലൈസൻസ്|লাইসেন্স|પરવાનો)/i, englishEquivalents: 'manufacturing license Rule 158B classical formulation proprietary AYUSH' },
  // Trademark / Brand name / Sanskrit terms
  { regex: /(ट्रेडमार्क|ब्रांड|नाम|व्यापार चिह्न|ట్రేడ్‌మార్క్|வர்த்தக முத்திரை|ಆಸ್ತಿ|ট্রেডমার্ক|ટ્રેડમાર્ક)/i, englishEquivalents: 'trademark brand name Sanskrit generic botanical Section 9' },
  // Food / Dietary supplement / Ayurveda Aahar / FSSAI
  { regex: /(आहार|खाद्य|सप्लीमेंट|एफएसएसएआई|உணவு|ఆహార|ഭക്ഷണം|খাদ্য|ખોરાક)/i, englishEquivalents: 'Ayurveda Aahar FSSAI regulations food dietary supplement 2022' },
  // GMP / Quality / Heavy metals / Schedule T
  { regex: /(जीएमपी|गुणवत्ता|मानक|धातु|தரம்|నాణ్యత|ഗുണനിലവാരം|ગુણવત્તા|মান)/i, englishEquivalents: 'Schedule T GMP Good Manufacturing Practices heavy metal testing Rule 161' },
  // International / WIPO / TRIPS / PCT
  { regex: /(अंतर्राष्ट्रीय|वाइपो|ट्रिप्स|पीसीटी|சர்வதேச|అంతర్జాతీయ|ಅಂತಾರಾಷ್ಟ್ರೀಯ|അന്താരാഷ്ട്ര|আন্তর্জাতিক|આંતરરાષ્ટ્રીય)/i, englishEquivalents: 'international WIPO GRATK Treaty 2024 TRIPS Article 27 mandatory disclosure PCT' },
  // Botanical herbs
  { regex: /(अश्वगंधा|अश्वगन्धा|அஸ்வகந்தா|అశ్వగంధ|ಅಶ್ವಗಂಧ|അശ്വഗന്ധ|অশ্বগন্ধা|અશ્વગંધા)/i, englishEquivalents: 'Ashwagandha Withania somnifera' },
  { regex: /(हल्दी|हळद|மஞ்சள்|పసుపు|ಹಳದಿ|മഞ്ഞൾ|হলুদ|હળદર)/i, englishEquivalents: 'Curcumin Turmeric botanical extract novel efficacy Section 3(d)' },
  { regex: /(त्रिफला|திரிபலா|త్రిఫల|ತ್ರಿಫಲ|ത്രിഫല|ত্রিফলা|ત્રિફળા)/i, englishEquivalents: 'Triphala formulation polyherbal synergy Section 3(e)' },
  { regex: /(ब्राह्मी|பிராமி|బ్రాహ్మి|ಬ್ರಾಹ್ಮಿ|ബ്രാഹ്മി|ব্রাহ্মী|બ્રાહ્મી)/i, englishEquivalents: 'Brahmi Bacopa monnieri memory enhancement' }
];

export class LegalTranslator {
  public static async translateQueryToEnglish(query: string, language: LanguageCode): Promise<string> {
    if (language === 'en') return query;

    // Deterministic extraction of legal intent from Indic languages
    const matchedTokens: string[] = [];
    for (const mapping of INDIC_KEYWORD_MAP) {
      if (mapping.regex.test(query)) {
        matchedTokens.push(mapping.englishEquivalents);
      }
    }

    if (matchedTokens.length > 0) {
      // Append statutory equivalents to aid TF-IDF cosine similarity against corpus
      return `${query} ${matchedTokens.join(' ')}`;
    }

    return query;
  }

  public static async translateAnswerToTargetLanguage(
    text: string,
    targetLanguage: LanguageCode
  ): Promise<string> {
    if (targetLanguage === 'en') return text;

    // Localized statutory explanation synthesis by provision
    if (text.includes('Section 3(p)')) {
      switch (targetLanguage) {
        case 'hi':
          return `Patents Act, 1970 के Section 3(p) के तहत, प्राचीन आयुर्वेदिक ग्रंथों (जैसे चरक संहिता या सुश्रुत संहिता) में प्रलेखित पारंपरिक फॉर्मूलेशन को आविष्कार नहीं माना जाता है और यह पेटेंट योग्य नहीं हैं। भारतीय पेटेंट परीक्षक सभी दावों की जांच TKDL (पारंपरिक ज्ञान डिजिटल लाइब्रेरी) से करते हैं। पारंपरिक नुस्खे पर पेटेंट नहीं मिल सकता; इसके लिए आपको एक नवीन तकनीकी संशोधन (जैसे नॉवेल डिलीवरी सिस्टम) और तुलनात्मक प्रभावकारिता डेटा सिद्ध करना होगा।`;
        case 'ta':
          return `Patents Act, 1970 இன் Section 3(p) இன் கீழ், சரக சம்ஹிதை அல்லது சுஸ்ருத சம்ஹிதை போன்ற பாரம்பரிய நூல்களில் உள்ள சூத்திரங்கள் பாரம்பரிய அறிவாகக் கருதப்பட்டு காப்புரிமை பெற முடியாது. TKDL தரவுத்தளத்துடன் ஆய்வு செய்யப்படும். புதிய விநியோக முறை அல்லது தனித்துவமான வேதியியல் மாற்றத்தை நிரூபித்தால் மட்டுமே செயல்முறை காப்புரிமை பெற முடியும்.`;
        case 'te':
          return `Patents Act, 1970 లోని Section 3(p) ప్రకారం, పురాతన ఆయుర్వేద గ్రంథాలలో పేర్కొన్న సాంప్రదాయ ఫార్ములేషన్లు ఆవిష్కరణలు కావు మరియు వాటికి పేటెంట్ లభించదు. TKDL ద్వారా తనిఖీ చేయబడుతుంది. సాంప్రదాయ పద్ధతికి కాకుండా నవల సాంకేతిక లేదా ప్రత్యేకమైన సారంపై మాత్రమే పేటెంట్ సాధ్యమవుతుంది.`;
        default:
          return `[${targetLanguage.toUpperCase()}] Patents Act, 1970, Section 3(p): Traditional Ayurvedic knowledge documented in classical texts is excluded from patentability. Patent examiners cross-reference all claims with TKDL.\n\n${text}`;
      }
    }

    if (text.includes('Biological Diversity Act 2002') || text.includes('Section 6')) {
      switch (targetLanguage) {
        case 'hi':
          return `Biological Diversity Act, 2002 के Section 6 के तहत, भारतीय जैविक संसाधनों पर आधारित किसी भी पेटेंट या आईपीआर आवेदन के लिए राष्ट्रीय जैव विविधता प्राधिकरण (NBA, चेन्नई) से पूर्व स्वीकृति लेना अनिवार्य कानूनी आवश्यकता है। 2023 के संशोधन के अनुसार, पेटेंट आवेदन दाखिल किया जा सकता है, परंतु पेटेंट अनुदान से पहले NBA अनुमोदन और ABS (लाभ साझाकरण) समझौता पूर्ण होना चाहिए।`;
        case 'ta':
          return `Biological Diversity Act, 2002 இன் Section 6 இன் கீழ், இந்திய மூலிகைகள் அடிப்படையிலான காப்புரிமை பெறுவதற்கு முன் தேசிய பல்லுயிர் ஆணையத்தின் (NBA) முன் அனுமதி பெறுவது கட்டாயமாகும்.`;
        case 'te':
          return `Biological Diversity Act, 2002 లోని Section 6 ప్రకారం, భారతీయ మూలికలపై పేటెంట్ పొందే ముందు నేషనల్ బయోడైవర్సిటీ అథారిటీ (NBA) ముందస్తు అనుమతి తప్పనిసరి.`;
        default:
          return `[${targetLanguage.toUpperCase()}] Biological Diversity Act, 2002 (Section 6): Prior approval from National Biodiversity Authority (NBA) is mandatory before patent grant for biological resources.\n\n${text}`;
      }
    }

    if (text.includes('Rule 158B')) {
      switch (targetLanguage) {
        case 'hi':
          return `Drugs and Cosmetics Rules, 1945 के Chapter IV-A, Rule 158B के तहत, आपकी विनियामक लाइसेंसिंग इस बात पर निर्भर करती है कि आपका उत्पाद शास्त्रीय (Classical) है या मालिकाना (Proprietary)। अनुसूची 1 के आधिकारिक ग्रंथों पर आधारित शास्त्रीय फॉर्मूलेशन को विनिर्माण लाइसेंस के लिए क्लिनिकल ट्रायल की आवश्यकता नहीं होती है। नए अनुपात वाले पेटेंट/मालिकाना फॉर्मूलेशन के लिए सुरक्षा साहित्य और पायलट क्लिनिकल साक्ष्य आवश्यक हैं।`;
        case 'ta':
          return `Drugs and Cosmetics Rules, 1945 இன் Rule 158B இன் கீழ், பாரம்பரிய நூல்களின் படியான கிளாசிக்கல் மருந்துகளுக்கு மருத்துவ பரிசோதனை தேவையில்லை; ஆனால் புதிய விகித தயாரிப்புகளுக்கு பாதுகாப்பு ஆதாரங்கள் சமர்ப்பிக்க வேண்டும்.`;
        default:
          return `[${targetLanguage.toUpperCase()}] Drugs and Cosmetics Rules, 1945 (Rule 158B): Classical ASU formulations do not require clinical trials; proprietary formulations require safety and pilot trial proof.\n\n${text}`;
      }
    }

    if (text.includes('Section 9')) {
      switch (targetLanguage) {
        case 'hi':
          return `Trade Marks Act, 1999 के Section 9(1) के तहत, अश्वगंधा, त्रिफला या ब्राह्मी जैसे सामान्य और वर्णनात्मक संस्कृत वानस्पतिक नामों को अनन्य ट्रेडमार्क के रूप में पंजीकृत नहीं किया जा सकता क्योंकि वे सार्वजनिक डोमेन के शब्द हैं। ट्रेडमार्क संरक्षण के लिए आपको एक विशिष्ट या आविष्कृत ब्रांड नाम का उपयोग करना चाहिए।`;
        default:
          return `[${targetLanguage.toUpperCase()}] Trade Marks Act, 1999 (Section 9): Generic Sanskrit botanical names cannot be registered as exclusive trademarks. Use distinctive invented marks.\n\n${text}`;
      }
    }

    if (text.includes('FSSAI Ayurveda Aahar')) {
      switch (targetLanguage) {
        case 'hi':
          return `FSSAI Ayurveda Aahar Regulations 2022 के तहत, आयुर्वेदिक खाद्य सप्लीमेंट्स को शेड्यूल ए के ग्रंथों का पालन करना होगा और विशिष्ट हरा लोगो प्रदर्शित करना अनिवार्य है। विनियम 6 के अनुसार, खाद्य पूरक पर बीमारी को ठीक करने का दावा करना कानूनी रूप से प्रतिबंधित है।`;
        default:
          return `[${targetLanguage.toUpperCase()}] FSSAI Ayurveda Aahar Regulations 2022: Requires Schedule A compliance and official logo. Disease treatment/cure claims strictly prohibited.\n\n${text}`;
      }
    }

    if (text.includes('WIPO GRATK Treaty')) {
      switch (targetLanguage) {
        case 'hi':
          return `ऐतिहासिक WIPO GRATK Treaty (2024) के तहत, अंतरराष्ट्रीय पेटेंट आवेदनों में आनुवंशिक संसाधनों और पारंपरिक ज्ञान के मूल देश का अनिवार्य प्रकटीकरण आवश्यक है। यदि आप भारतीय पारंपरिक ज्ञान का उपयोग कर रहे हैं, तो भारत और पारंपरिक ग्रंथों का स्पष्ट उल्लेख अनिवार्य है।`;
        default:
          return `[${targetLanguage.toUpperCase()}] WIPO GRATK Treaty 2024: Mandatory disclosure of country of origin and traditional knowledge in international patent applications.\n\n${text}`;
      }
    }

    // Default return with statutory reference header
    return text;
  }
}
