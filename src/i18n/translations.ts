export type Language = 'en' | 'hi';

export interface TranslationStrings {
  appName: string;
  tagline: string;
  emergencyBanner: string;
  tabs: {
    claimLab: string;
    beliefEngine: string;
    familyBridge: string;
    stories: string;
    monitor: string;
  };
  sampleForwards: Array<{
    title: string;
    text: string;
  }>;
  claimLab: {
    title: string;
    description: string;
    trySample: string;
    inputFormat: string;
    textMode: string;
    imageMode: string;
    inputLabel: string;
    textPlaceholder: string;
    uploadTitle: string;
    uploadSubtitle: string;
    changeScreenshot: string;
    privacyCheckTitle: string;
    privacyCheckDesc: string;
    verifyButton: string;
    verifying: string;
    summaryTitle: string;
    individualTitle: string;
    extractedClaim: string;
    verdicts: {
      contradicted: string;
      misleading: string;
      supported: string;
      insufficient: string;
    };
    highRiskWarning: string;
    evidenceAssessment: string;
    clinicalNuance: string;
    safeNextStep: string;
    sourcesCited: string;
    discussInBelief: string;
  };
  beliefEngine: {
    bannerTitle: string;
    bannerBadge: string;
    bannerSub: string;
    bannerDesc: string;
    topicTitle: string;
    viralClaimLabel: string;
    verifiedFactLabel: string;
    inputLabel: string;
    inputSubtitle: string;
    inputPlaceholder: string;
    reflectButton: string;
    reflecting: string;
    reflectionTitle: string;
    concernBadge: string;
    teachBackTitle: string;
    teachBackPlaceholder: string;
    submitTeachBack: string;
    evaluating: string;
    feedbackTitle: string;
    doctorQuestionLabel: string;
  };
  familyBridge: {
    title: string;
    desc: string;
    whatsappTitle: string;
    selectTopic: string;
    topicSummary: string;
    toneLabel: string;
    tones: {
      respectful: string;
      casual: string;
      gentle_warning: string;
    };
    copyWhatsapp: string;
    copied: string;
    clinicianTitle: string;
    clinicianDesc: string;
    copyDoctor: string;
    copiedDoctor: string;
  };
  stories: {
    title: string;
    desc: string;
    cardOf: string;
    auditedOn: string;
    listenButton: string;
    stopButton: string;
    scopeLabel: string;
    sourceLabel: string;
    officialGuidelines: string;
    verifiedStamp: string;
  };
  monitor: {
    localNanoTitle: string;
    promptApiSub: string;
    cloudAiTitle: string;
    cloudAiSub: string;
    inferencesTitle: string;
    offlineSimTitle: string;
    offlineSimButtonOn: string;
    offlineSimButtonOff: string;
    offlineSimSub: string;
    archTitle: string;
    refreshButton: string;
    privateDomainTitle: string;
    privateDomainDesc: string;
    publicDomainTitle: string;
    publicDomainDesc: string;
    liveTelemetryTitle: string;
    noTraces: string;
  };
  privacyVisualizer: {
    tag: string;
    activeStatus: string;
    title: string;
    desc: string;
    privateTitle: string;
    privateSub: string;
    privateBadge: string;
    privateOperationsTitle: string;
    privateOperations: string[];
    privateModel: string;
    privateCapability: string;
    cloudTitle: string;
    cloudSub: string;
    cloudBadge: string;
    cloudOperationsTitle: string;
    cloudOperations: string[];
    cloudModel: string;
    cloudPlatform: string;
    assuranceTitle: string;
    assuranceDesc: string;
  };
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    appName: "veriwell.",
    tagline: "Evidence over misinformation. Empathy over fear.",
    emergencyBanner: "Emergency Notice: If you suspect acute emergency signs (sudden facial droop, arm weakness, or difficulty speaking), call local emergency services (112 / 911) immediately. VeriWell is an educational guide, not clinical diagnosis.",
    tabs: {
      claimLab: "Claim Lab",
      beliefEngine: "Belief Engine",
      familyBridge: "Family Bridge",
      stories: "Evidence Stories",
      monitor: "Hybrid Monitor",
    },
    sampleForwards: [
      {
        title: "Viral '7-Day Cure' Message",
        text: "URGENT FORWARD: Stop taking insulin and metformin! Doctors won't tell you this, but boiling okra and drinking the water every morning completely cures Type 2 diabetes permanently in 7 days! All pills destroy your kidneys anyway. Pass to all family groups!!",
      },
      {
        title: "Hypertension 'No Symptoms' Myth",
        text: "If your blood pressure is high but you feel completely fine with no headaches or dizziness, you don't need daily pills! Medicines make you dependent. Just drink herbal tea and Himalayan pink salt water when you feel dizzy.",
      }
    ],
    claimLab: {
      title: "Public Claim Lab",
      description: "Viral social media forwards spread fear or false hope in seconds. Paste any forwarded tip, clip caption, or WhatsApp screenshot below to cross-reference with verified medical guidelines.",
      trySample: "Try a synthetic sample forward:",
      inputFormat: "Source Input Format:",
      textMode: "Text Forward",
      imageMode: "Screenshot / Image",
      inputLabel: "Forwarded message or health claim text:",
      textPlaceholder: "Paste health message here...",
      uploadTitle: "Click to upload a WhatsApp screenshot or health forward image",
      uploadSubtitle: "Supports PNG, JPG, or WEBP (Max 5MB)",
      changeScreenshot: "Change Screenshot",
      privacyCheckTitle: "Privacy & Sanitization Check:",
      privacyCheckDesc: "I confirm this text contains only public health claims and is stripped of any personal health records, phone numbers, or private identities before cloud processing.",
      verifyButton: "Verify Claims in Cloud",
      verifying: "Verifying with Cloud AI...",
      summaryTitle: "Clinical Synthesis Summary",
      individualTitle: "Individual Claim Verifications",
      extractedClaim: "Extracted Claim:",
      verdicts: {
        contradicted: "Contradicted by Medical Evidence",
        misleading: "Misleading / Missing Context",
        supported: "Supported by Evidence",
        insufficient: "Insufficient Evidence",
      },
      highRiskWarning: "High-Risk Advice Detected: Do not abruptly stop or change prescribed medication without consulting your doctor.",
      evidenceAssessment: "Evidence Assessment:",
      clinicalNuance: "Clinical Nuance:",
      safeNextStep: "Safe Next Step:",
      sourcesCited: "Verified Sources Cited:",
      discussInBelief: "Discuss in Private Belief Engine",
    },
    beliefEngine: {
      bannerTitle: "Private Belief Engine",
      bannerBadge: "100% On-Device Privacy",
      bannerSub: "Gemini Nano in Chrome",
      bannerDesc: "Medical decisions are deeply personal. We never judge your doubts or fears. Everything you type here is processed locally on your device by Gemini Nano — zero tracking, zero bytes sent to any cloud server.",
      topicTitle: "Topic of Discussion",
      viralClaimLabel: "Viral Claim:",
      verifiedFactLabel: "Verified Medical Fact:",
      inputLabel: "What makes this viral claim appealing to you, or what makes your doctor's advice hard to follow?",
      inputSubtitle: "Share freely (e.g. fear of kidney harm, side effects, pill costs, or feeling unheard):",
      inputPlaceholder: "Tell us honestly what worries you...",
      reflectButton: "Reflect Empathetically (Local)",
      reflecting: "Reflecting On-Device...",
      reflectionTitle: "Empathetic Reflection",
      concernBadge: "Core Concern Detected:",
      teachBackTitle: "Reflective Teach-Back Question:",
      teachBackPlaceholder: "In your own words, how would you describe what we just discussed?",
      submitTeachBack: "Submit for On-Device Feedback",
      evaluating: "Evaluating On-Device...",
      feedbackTitle: "Comprehension Feedback",
      doctorQuestionLabel: "Recommended Question for Your Clinician:",
    },
    familyBridge: {
      title: "Family Bridge & Doctor Checklist",
      desc: "Health misinformation spreads in family groups because people care, not because they mean harm. When elders forward unverified tips, arguing causes division. The Family Bridge helps you reply with warmth, respect, and verified clinical sources — turning viral forwards into proactive doctor visits.",
      whatsappTitle: "WhatsApp Family Counter-Forward",
      selectTopic: "Select Topic / Evidence Source:",
      topicSummary: "Claim Topic Summary:",
      toneLabel: "Tone:",
      tones: {
        respectful: "Respectful",
        casual: "Casual",
        gentle_warning: "Gentle Warning",
      },
      copyWhatsapp: "Copy Message for WhatsApp",
      copied: "Copied to Clipboard!",
      clinicianTitle: "Clinician Discussion Card",
      clinicianDesc: "Don't leave doctor visits feeling rushed. Take these exact, personalized questions to your appointment to get clarity without feeling judged:",
      copyDoctor: "Copy Doctor Questions",
      copiedDoctor: "Copied Questions!",
    },
    stories: {
      title: "Verified Evidence Stories",
      desc: "Bite-sized, clinically audited facts from the World Health Organization and NIDDK explaining common diabetes and hypertension questions in plain language.",
      cardOf: "Card",
      auditedOn: "Audited:",
      listenButton: "Listen Aloud (Local TTS)",
      stopButton: "Stop Reading",
      scopeLabel: "Clinical Scope:",
      sourceLabel: "Source:",
      officialGuidelines: "Official Medical Guidelines",
      verifiedStamp: "Clinically Audited Content",
    },
    monitor: {
      localNanoTitle: "Local Gemini Nano",
      promptApiSub: "Chrome Prompt API (LanguageModel)",
      cloudAiTitle: "Firebase Cloud AI",
      cloudAiSub: "Gemini 3.5 Flash-Lite (Developer API)",
      inferencesTitle: "Inference Calls",
      offlineSimTitle: "Offline Simulator",
      offlineSimButtonOn: "Simulating Offline",
      offlineSimButtonOff: "Simulate Offline",
      offlineSimSub: "Test on-device resilience without disconnecting Wi-Fi.",
      archTitle: "Hybrid Routing Architecture",
      refreshButton: "Refresh Status",
      privateDomainTitle: "Private Domain (`ONLY_ON_DEVICE`)",
      privateDomainDesc: "Patient concerns, hesitation reflections, and teach-back comprehension evaluations execute 100% locally on Gemini Nano. Guaranteed zero network leakage.",
      publicDomainTitle: "Public Domain (`ONLY_IN_CLOUD`)",
      publicDomainDesc: "Public viral forwards and clip captions are cross-referenced against WHO/NIDDK medical guidelines via Firebase AI Logic. Sanitization consent required.",
      liveTelemetryTitle: "Live Inference Telemetry",
      noTraces: "No inference requests triggered yet. Run an analysis in the Claim Lab or Belief Engine to see real-time routing telemetry!",
    },
    privacyVisualizer: {
      tag: "Hybrid AI Architecture",
      activeStatus: "Active Separation Enforced",
      title: "Dual-Domain Privacy Boundary",
      desc: "How VeriWell leverages Firebase AI Logic to guarantee private patient thoughts never touch cloud servers.",
      privateTitle: "Private On-Device Domain",
      privateSub: "Mode: ONLY_ON_DEVICE",
      privateBadge: "0 KB Network",
      privateOperationsTitle: "Enclosed Operations:",
      privateOperations: [
        "Patient hesitation & side-effect fears",
        "Belief Engine empathetic reflection",
        "Teach-back comprehension scoring",
        "Local Browser Audio Narration (TTS)",
      ],
      privateModel: "Model: Gemini Nano (Chrome)",
      privateCapability: "100% Offline-Capable",
      cloudTitle: "Public Cloud Domain",
      cloudSub: "Mode: ONLY_IN_CLOUD",
      cloudBadge: "SSL + App Check",
      cloudOperationsTitle: "Enclosed Operations:",
      cloudOperations: [
        "Viral forward message deconstruction",
        "Multimodal WhatsApp screenshot OCR",
        "WHO/NIDDK evidence cross-referencing",
        "Hallucination prevention & citation audit",
      ],
      cloudModel: "Model: Gemini 3.5 Flash-Lite",
      cloudPlatform: "Firebase AI Logic",
      assuranceTitle: "Zero-Leakage Assurance:",
      assuranceDesc: "User concerns are parsed by local browser memory only. No analytics track prompt text or private inputs.",
    },
  },
  hi: {
    appName: "veriwell.",
    tagline: "अफवाहों पर सबूत की जीत। भय पर संवेदनशीलता की जीत।",
    emergencyBanner: "आपातकालीन सूचना: यदि आपको चेहरे का टेढ़ापन, हाथ में कमजोरी या बोलने में अचानक कठिनाई महसूस हो, तो तुरंत आपातकालीन सेवा (112 / 108) पर संपर्क करें। वेरीवेल केवल शैक्षिक मार्गदर्शन है।",
    tabs: {
      claimLab: "दावा लैब",
      beliefEngine: "निजी संवाद",
      familyBridge: "परिवार सेतु",
      stories: "प्रमाणित कहानियां",
      monitor: "हाइब्रिड मॉनिटर",
    },
    sampleForwards: [
      {
        title: "वायरल '7-दिन में शुगर जड़ से खत्म' संदेश",
        text: "जरूरी सूचना: इंसुलिन और शुगर की दवाइयां तुरंत बंद करें! डॉक्टर कभी नहीं बताएंगे, लेकिन रोज सुबह भिंडी का उबला पानी पीने से 7 दिनों में टाइप 2 डायबिटीज हमेशा के लिए ठीक हो जाती है! सभी दवाएं आपकी किडनी को सड़ा देती हैं। सभी परिवार ग्रुप में भेजें!!",
      },
      {
        title: "हाई बीपी 'बिना लक्षण' भ्रम",
        text: "अगर आपका ब्लड प्रेशर 160 भी है पर आपको सिरदर्द या चक्कर नहीं आ रहा, तो रोज गोली खाने की जरूरत नहीं है! अंग्रेजी दवाएं आपको गुलाम बनाती हैं। जब चक्कर आए सिर्फ तब सेंधा नमक का पानी और काढ़ा पिएं।",
      }
    ],
    claimLab: {
      title: "सार्वजनिक दावा विश्लेषण (Claim Lab)",
      description: "सोशल मीडिया पर वायरल संदेश अक्सर झूठी उम्मीद या भय फैलाते हैं। किसी भी फॉरवर्ड किए गए नुस्खे या व्हाट्सएप स्क्रीनशॉट को यहां आधिकारिक चिकित्सा दिशानिर्देशों से जांचें।",
      trySample: "नमूना वायरल संदेश आजमाएं:",
      inputFormat: "इनपुट माध्यम चुनें:",
      textMode: "टेक्स्ट फॉरवर्ड",
      imageMode: "स्क्रीनशॉट / फोटो",
      inputLabel: "फॉरवर्ड किया गया स्वास्थ्य संदेश या दावा:",
      textPlaceholder: "यहां स्वास्थ्य संदेश पेस्ट करें...",
      uploadTitle: "व्हाट्सएप स्क्रीनशॉट या फोटो अपलोड करें",
      uploadSubtitle: "PNG, JPG या WEBP समर्थित (अधिकतम 5MB)",
      changeScreenshot: "स्क्रीनशॉट बदलें",
      privacyCheckTitle: "गोपनीयता व स्वच्छता जांच:",
      privacyCheckDesc: "मैं पुष्टि करता हूं कि इस टेक्स्ट में केवल सार्वजनिक दावे हैं और कोई व्यक्तिगत स्वास्थ्य पहचान, मरीज का नाम या फोन नंबर शामिल नहीं है।",
      verifyButton: "क्लाउड एआई से जांच करें",
      verifying: "क्लाउड एआई जांच रहा है...",
      summaryTitle: "चिकित्सीय निष्कर्ष सारांश",
      individualTitle: "अलग-अलग दावों की वैज्ञानिक जांच",
      extractedClaim: "निकाला गया दावा:",
      verdicts: {
        contradicted: "चिकित्सीय साक्ष्यों के विपरीत (गलत)",
        misleading: "भ्रामक / अधूरा संदर्भ",
        supported: "साक्ष्य समर्थित (सही)",
        insufficient: "अपर्याप्त साक्ष्य",
      },
      highRiskWarning: "अति-जोखिम सलाह पहचानी गई: डॉक्टर की सलाह के बिना निर्धारित दवा कभी भी अचानक बंद न करें।",
      evidenceAssessment: "वैज्ञानिक साक्ष्य मूल्यांकन:",
      clinicalNuance: "चिकित्सीय पहलू:",
      safeNextStep: "सुरक्षित अगला कदम:",
      sourcesCited: "सत्यापित संदर्भ स्रोत:",
      discussInBelief: "निजी विश्वास संवाद में चर्चा करें",
    },
    beliefEngine: {
      bannerTitle: "निजी विश्वास संवाद (Belief Engine)",
      bannerBadge: "100% ऑन-डिवाइस गोपनीयता",
      bannerSub: "क्रोम में जेमिनी नैनो",
      bannerDesc: "दवाओं को लेकर मन में हिचक या डर होना स्वाभाविक है। हम आपकी चिंताओं को कभी गलत नहीं ठहराते। आप जो भी लिखेंगे, वह केवल आपके लैपटॉप पर प्रोसेस होगा — शून्य ट्रैकिंग, शून्य डेटा लीक।",
      topicTitle: "चर्चा का विषय",
      viralClaimLabel: "वायरल दावा:",
      verifiedFactLabel: "प्रमाणित चिकित्सकीय तथ्य:",
      inputLabel: "इस नुस्खे पर भरोसा करने की क्या वजह है, या डॉक्टर की दवा लेने में क्या डर लगता है?",
      inputSubtitle: "बिना किसी झिझक के बताएं (जैसे किडनी खराब होने का डर, गोलियों का खर्च, या साइड इफेक्ट्स):",
      inputPlaceholder: "अपनी असली चिंता यहां साझा करें...",
      reflectButton: "संवेदनशीलता से विचार करें (लोकल)",
      reflecting: "डिवाइस पर विचार हो रहा है...",
      reflectionTitle: "सहानुभूतिपूर्ण समझ",
      concernBadge: "पहचानी गई मुख्य चिंता:",
      teachBackTitle: "आत्म-चिंतन प्रश्न (Teach-Back):",
      teachBackPlaceholder: "अपने शब्दों में बताएं कि आपने इस चर्चा से क्या समझा?",
      submitTeachBack: "लोकल फीडबैक के लिए भेजें",
      evaluating: "डिवाइस पर मूल्यांकन हो रहा है...",
      feedbackTitle: "समझ का मूल्यांकन",
      doctorQuestionLabel: "अपने डॉक्टर से पूछने योग्य सवाल:",
    },
    familyBridge: {
      title: "परिवार सेतु और डॉक्टर चेकलिस्ट (Family Bridge)",
      desc: "परिवार के व्हाट्सएप ग्रुप्स में लोग फिक्र की वजह से नुस्खे भेजते हैं, नुकसान पहुंचाने के लिए नहीं। उनसे बहस करने से रिश्ते खराब होते हैं। परिवार सेतु आपको आदर और वैज्ञानिक सबूतों के साथ एक प्यारा संदेश तैयार करके देता है।",
      whatsappTitle: "व्हाट्सएप पारिवारिक उत्तर संदेश",
      selectTopic: "विषय / साक्ष्य स्रोत चुनें:",
      topicSummary: "दावे का विषय संक्षेप में:",
      toneLabel: "बातचीत का लहजा:",
      tones: {
        respectful: "आदरणीय (बुजुर्गों के लिए)",
        casual: "सरल व सामान्य",
        gentle_warning: "सौम्य चेतावनी",
      },
      copyWhatsapp: "व्हाट्सएप के लिए कॉपी करें",
      copied: "कॉपी हो गया!",
      clinicianTitle: "डॉक्टर परामर्श पर्ची",
      clinicianDesc: "अस्पताल में डॉक्टर से बात करते समय झिझकें नहीं। अपनी अगली मुलाकात में ये तैयार सवाल सीधे डॉक्टर से पूछें:",
      copyDoctor: "डॉक्टर के सवाल कॉपी करें",
      copiedDoctor: "सवाल कॉपी हो गए!",
    },
    stories: {
      title: "प्रमाणित स्वास्थ्य कहानियां (Evidence Stories)",
      desc: "विश्व स्वास्थ्य संगठन (WHO) और NIDDK द्वारा प्रमाणित सरल भाषा में स्वास्थ्य तथ्य।",
      cardOf: "कार्ड",
      auditedOn: "जांच तिथि:",
      listenButton: "आवाज में सुनें (लोकल TTS)",
      stopButton: "आवाज बंद करें",
      scopeLabel: "चिकित्सीय दायरा:",
      sourceLabel: "स्रोत संस्था:",
      officialGuidelines: "आधिकारिक मेडिकल गाइडलाइन",
      verifiedStamp: "चिकित्सकीय रूप से प्रमाणित",
    },
    monitor: {
      localNanoTitle: "लोकल जेमिनी नैनो",
      promptApiSub: "क्रोम प्रॉम्प्ट एपीआई (LanguageModel)",
      cloudAiTitle: "फायरबेस क्लाउड एआई",
      cloudAiSub: "जेमिनी 3.5 फ्लैश-लाइट (Developer API)",
      inferencesTitle: "कुल एआई अनुरोध",
      offlineSimTitle: "ऑफलाइन सिम्युलेटर",
      offlineSimButtonOn: "ऑफलाइन सिमुलेशन सक्रिय",
      offlineSimButtonOff: "ऑफलाइन मोड चालू करें",
      offlineSimSub: "वाई-फाई बंद किए बिना ऑन-डिवाइस क्षमता की जांच करें।",
      archTitle: "हाइब्रिड रूटिंग आर्किटेक्चर",
      refreshButton: "स्थिति ताज़ा करें",
      privateDomainTitle: "निजी डोमेन (`ONLY_ON_DEVICE`)",
      privateDomainDesc: "मरीज की शंकाएं और समझ का मूल्यांकन 100% स्थानीय रूप से जेमिनी नैनो पर निष्पादित होता है। शून्य नेटवर्क ट्रांसमिशन।",
      publicDomainTitle: "सार्वजनिक डोमेन (`ONLY_IN_CLOUD`)",
      publicDomainDesc: "सार्वजनिक वायरल संदेशों और स्क्रीनशॉट्स का सत्यापन फायरबेस एआई लॉजिक के माध्यम से क्लाउड में होता है।",
      liveTelemetryTitle: "लाइव इंफेरेंस टेलीमेट्री",
      noTraces: "अभी तक कोई अनुरोध नहीं हुआ। क्लेम लैब या बिलीफ इंजन में जांच शुरू करें!",
    },
    privacyVisualizer: {
      tag: "हाइब्रिड एआई आर्किटेक्चर",
      activeStatus: "सख्त डोमेन विभाजन सक्रिय",
      title: "द्वि-डोमेन गोपनीयता सीमा (Privacy Boundary)",
      desc: "जानिए कैसे वेरीवेल फायरबेस एआई लॉजिक का उपयोग करके मरीज के निजी विचारों को कभी क्लाउड पर नहीं जाने देता।",
      privateTitle: "निजी ऑन-डिवाइस डोमेन",
      privateSub: "मोड: ONLY_ON_DEVICE",
      privateBadge: "0 KB नेटवर्क ट्रांसमिशन",
      privateOperationsTitle: "सुरक्षित लोकल कार्य:",
      privateOperations: [
        "मरीज की शंकाएं और साइड-इफेक्ट का डर",
        "बिलीफ इंजन की सहानुभूतिपूर्ण सलाह",
        "टीच-बैक समझ का परीक्षण",
        "ब्राउज़र में लोकल वॉयस स्पीच (TTS)",
      ],
      privateModel: "मॉडल: जेमिनी नैनो (Chrome)",
      privateCapability: "100% ऑफलाइन सक्षम",
      cloudTitle: "सार्वजनिक क्लाउड डोमेन",
      cloudSub: "मोड: ONLY_IN_CLOUD",
      cloudBadge: "SSL + App Check प्रमाणित",
      cloudOperationsTitle: "क्लाउड कार्य:",
      cloudOperations: [
        "वायरल फॉरवर्ड संदेशों का विखंडन",
        "व्हाट्सएप स्क्रीनशॉट ओसीआर (OCR)",
        "WHO/NIDDK वैज्ञानिक साक्ष्यों से तुलना",
        "भ्रामक सूचनाओं व गलत दावों की पहचान",
      ],
      cloudModel: "मॉडल: जेमिनी 3.5 फ्लैश-लाइट",
      cloudPlatform: "फायरबेस एआई लॉजिक (Firebase AI Logic)",
      assuranceTitle: "शून्य-लीक गारंटी:",
      assuranceDesc: "उपयोगकर्ता की निजी चिंताएं केवल लैपटॉप की रैम में प्रोसेस होती हैं। कोई एनालिटिक्स या ट्रैकिंग नहीं।",
    },
  },
};
