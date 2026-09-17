/* =========================================
   SEHAD MULTILINGUAL UI SYSTEM
========================================= */

const SEHAD_LANGUAGE_KEY = "sehad_language";

const SEHAD_LANGUAGES = {
    en: "English",
    hi: "हिन्दी",
    or: "ଓଡ଼ିଆ"
};

const SEHAD_TRANSLATIONS = {

    en: {
        home: "Home",
        myCases: "My Cases",
        documents: "Documents",
        previousVisits: "Previous Visits",
        profile: "Profile",
        settings: "Settings",
        logout: "Log Out",

        dashboard: "Dashboard",
        patient: "Patient",

        healthPrivacyTitle:
            "Your health information is private and secure.",

        healthPrivacyText:
            "We follow best practices to keep your health information safe.",

        learnMore: "Learn more",

        hello: "Hello",
        feelingToday: "How are you feeling today?",

        aiCareTitle: "AI-assisted care-taking",
        aiCareText:
            "Share your symptoms and we'll help organize the information.",

        beginConsultation: "BEGIN A NEW CONSULTATION",
        startNewCase: "Start New Case",

        startCaseDescription:
            "Begin AI-assisted case-taking and share your health information with your practitioner.",

        healthOverview: "Your Health Overview",

        activeCases: "Active Cases",
        inProgress: "In Progress",

        previousVisits: "Previous Visits",
        completed: "Completed",

        documents: "Documents",
        uploaded: "Uploaded",

        healthSummary: "View your health summary",

        recentConsultations: "Recent Consultations",
        viewAll: "View All",

        date: "Date",
        reasonForVisit: "Reason for Visit",
        practitioner: "Practitioner",
        status: "Status",

        reviewed: "Reviewed",

        consultationHistory:
            "Consultation history helps your doctor understand you better.",
        
                // Case Taking
        caseTakingTitle: "Tell us what you're experiencing",
        sehadAsks: "SEHAD ASKS",
        initialCaseQuestion: "What brings you here today?",
        caseQuestionHelp:
            "Tell us about the main health concern that you would like to discuss.",
        yourResponse: "Your response",
        clear: "Clear",
        responsePlaceholder: "Type your response here...",
        yourTurn: "Your turn",
        sehadThinking: "SEHAD is thinking...",
        savingCase: "Saving your case...",
        caseTakingComplete: "Case-taking complete",
        caseComplete: "Case complete",
        readyForReview: "Ready for review",
        back: "Back",
        continue: "Continue",
        finalQuestion: "Final question",
        questionRemaining: "question remaining",
        questionsRemaining: "questions remaining",

        caseCompleteTitle: "You're ready for practitioner review",
        caseCompleteText:
            "Your responses have been collected and organized. You can now review your case summary before sharing it with your practitioner.",
        viewCaseSummary: "View Case Summary",
        caseDisclaimer:
            "SEHAD does not diagnose or prescribe treatment. Your practitioner will make clinical decisions based on your case.",
        question: "Question",
        of: "of", 
        readyToListen: "Ready to listen",
        tapMic: "Tap the microphone and speak naturally.",
        spokenResponsePlaceholder:
            "Your spoken response will appear here...",
        listening: "Listening...",
        voiceInputUnavailable: "Voice input unavailable",
        voiceInputError: "Voice input error",
        responseCaptured: "Response captured",
        reviewResponse: "Review your response or tap Continue.",
        pleaseListen: "Please listen to the next question.",
        sehadSpeaking: "SEHAD is speaking...",
        voiceUnsupported:
            "Voice input is not supported by this browser. You can still enter your response using the text box above.",
    },

    hi: {
        home: "होम",
        myCases: "मेरे केस",
        documents: "दस्तावेज़",
        previousVisits: "पिछली मुलाक़ातें",
        profile: "प्रोफ़ाइल",
        settings: "सेटिंग्स",
        logout: "लॉग आउट",

        dashboard: "डैशबोर्ड",
        patient: "मरीज़",

        healthPrivacyTitle:
            "आपकी स्वास्थ्य जानकारी निजी और सुरक्षित है।",

        healthPrivacyText:
            "हम आपकी स्वास्थ्य जानकारी को सुरक्षित रखने के लिए सर्वोत्तम प्रक्रियाओं का पालन करते हैं।",

        learnMore: "और जानें",

        hello: "नमस्ते",
        feelingToday: "आज आप कैसा महसूस कर रहे हैं?",

        aiCareTitle: "AI-सहायित केस-टेकिंग",
        aiCareText:
            "अपने लक्षण साझा करें और हम जानकारी को व्यवस्थित करने में आपकी सहायता करेंगे।",

        beginConsultation: "नई परामर्श प्रक्रिया शुरू करें",
        startNewCase: "नया केस शुरू करें",

        startCaseDescription:
            "AI-सहायित केस-टेकिंग शुरू करें और अपनी स्वास्थ्य जानकारी अपने चिकित्सक के साथ साझा करें।",

        healthOverview: "आपका स्वास्थ्य अवलोकन",

        activeCases: "सक्रिय केस",
        inProgress: "प्रगति में",

        previousVisits: "पिछली मुलाक़ातें",
        completed: "पूर्ण",

        documents: "दस्तावेज़",
        uploaded: "अपलोड किए गए",

        healthSummary: "अपना स्वास्थ्य सारांश देखें",

        recentConsultations: "हाल की परामर्श प्रक्रियाएँ",
        viewAll: "सभी देखें",

        date: "तारीख",
        reasonForVisit: "मुलाक़ात का कारण",
        practitioner: "चिकित्सक",
        status: "स्थिति",

        reviewed: "समीक्षित",

        consultationHistory:
            "परामर्श का इतिहास आपके डॉक्टर को आपको बेहतर समझने में मदद करता है।",

                // Case Taking
        caseTakingTitle: "आप क्या अनुभव कर रहे हैं, हमें बताएं",
        sehadAsks: "SEHAD पूछता है",
        initialCaseQuestion: "आज आपको यहाँ किस समस्या के कारण आना पड़ा?",
        caseQuestionHelp:
            "जिस मुख्य स्वास्थ्य समस्या के बारे में आप चर्चा करना चाहते हैं, उसके बारे में बताएं।",
        yourResponse: "आपका उत्तर",
        clear: "साफ़ करें",
        responsePlaceholder: "अपना उत्तर यहाँ लिखें...",
        yourTurn: "आपकी बारी",
        sehadThinking: "SEHAD सोच रहा है...",
        savingCase: "आपका केस सहेजा जा रहा है...",
        caseTakingComplete: "केस-टेकिंग पूरी हुई",
        caseComplete: "केस पूरा हुआ",
        readyForReview: "समीक्षा के लिए तैयार",
        back: "वापस",
        continue: "जारी रखें",
        finalQuestion: "अंतिम प्रश्न",
        questionRemaining: "प्रश्न शेष",
        questionsRemaining: "प्रश्न शेष",

        caseCompleteTitle: "आपके केस की चिकित्सक द्वारा समीक्षा के लिए तैयारी पूरी है",
        caseCompleteText:
            "आपके उत्तर एकत्र करके व्यवस्थित कर दिए गए हैं। अब आप अपने केस का सारांश देख सकते हैं और उसे अपने चिकित्सक के साथ साझा कर सकते हैं।",
        viewCaseSummary: "केस सारांश देखें",
        caseDisclaimer:
            "SEHAD रोग का निदान या उपचार निर्धारित नहीं करता। आपके चिकित्सक आपके केस के आधार पर चिकित्सकीय निर्णय लेंगे।",
            question: "प्रश्न",
            of: "में से",
            readyToListen: "सुनने के लिए तैयार",
            tapMic: "माइक्रोफ़ोन दबाएं और स्वाभाविक रूप से बोलें।",
            spokenResponsePlaceholder:
                "आपका बोला हुआ उत्तर यहाँ दिखाई देगा...",
            listening: "सुन रहा है...",
            voiceInputUnavailable: "वॉइस इनपुट उपलब्ध नहीं है",
            voiceInputError: "वॉइस इनपुट में समस्या हुई",
            responseCaptured: "उत्तर रिकॉर्ड हो गया",
            reviewResponse: "अपने उत्तर की समीक्षा करें या जारी रखें दबाएं।",
            pleaseListen: "कृपया अगला प्रश्न सुनें।",
            sehadSpeaking: "SEHAD बोल रहा है...",
            voiceUnsupported:
                "इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। आप नीचे दिए गए टेक्स्ट बॉक्स में अपना उत्तर दर्ज कर सकते हैं।",
    },

    or: {
        home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
        myCases: "ମୋ କେସ୍",
        documents: "ଦଲିଲ",
        previousVisits: "ପୂର୍ବ ଭେଟ",
        profile: "ପ୍ରୋଫାଇଲ୍",
        settings: "ସେଟିଂସ୍",
        logout: "ଲଗ୍ ଆଉଟ୍",

        dashboard: "ଡ୍ୟାସବୋର୍ଡ",
        patient: "ରୋଗୀ",

        healthPrivacyTitle:
            "ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ବ୍ୟକ୍ତିଗତ ଏବଂ ସୁରକ୍ଷିତ।",

        healthPrivacyText:
            "ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନାକୁ ସୁରକ୍ଷିତ ରଖିବା ପାଇଁ ଆମେ ଉତ୍ତମ ପ୍ରକ୍ରିୟା ଅନୁସରଣ କରୁଛୁ।",

        learnMore: "ଅଧିକ ଜାଣନ୍ତୁ",

        hello: "ନମସ୍କାର",
        feelingToday: "ଆଜି ଆପଣ କେମିତି ଅନୁଭବ କରୁଛନ୍ତି?",

        aiCareTitle: "AI-ସହାୟିତ କେସ୍-ଟେକିଂ",
        aiCareText:
            "ଆପଣଙ୍କ ଲକ୍ଷଣଗୁଡ଼ିକ ସେୟାର କରନ୍ତୁ ଏବଂ ଆମେ ସୂଚନାକୁ ସୁବ୍ୟବସ୍ଥିତ କରିବାରେ ସାହାଯ୍ୟ କରିବୁ।",

        beginConsultation: "ନୂତନ ପରାମର୍ଶ ଆରମ୍ଭ କରନ୍ତୁ",
        startNewCase: "ନୂତନ କେସ୍ ଆରମ୍ଭ କରନ୍ତୁ",

        startCaseDescription:
            "AI-ସହାୟିତ କେସ୍-ଟେକିଂ ଆରମ୍ଭ କରନ୍ତୁ ଏବଂ ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ଚିକିତ୍ସକଙ୍କ ସହିତ ସେୟାର କରନ୍ତୁ।",

        healthOverview: "ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ଅବଲୋକନ",

        activeCases: "ସକ୍ରିୟ କେସ୍",
        inProgress: "ଚାଲୁଛି",

        previousVisits: "ପୂର୍ବ ଭେଟ",
        completed: "ସମ୍ପୂର୍ଣ୍ଣ",

        documents: "ଦଲିଲ",
        uploaded: "ଅପଲୋଡ୍ ହୋଇଛି",

        healthSummary: "ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ସାରାଂଶ ଦେଖନ୍ତୁ",

        recentConsultations: "ସାମ୍ପ୍ରତିକ ପରାମର୍ଶ",
        viewAll: "ସମସ୍ତ ଦେଖନ୍ତୁ",

        date: "ତାରିଖ",
        reasonForVisit: "ଭେଟର କାରଣ",
        practitioner: "ଚିକିତ୍ସକ",
        status: "ସ୍ଥିତି",

        reviewed: "ସମୀକ୍ଷା କରାଯାଇଛି",

        consultationHistory:
            "ପରାମର୍ଶ ଇତିହାସ ଆପଣଙ୍କ ଡାକ୍ତରଙ୍କୁ ଆପଣଙ୍କୁ ଭଲଭାବେ ବୁଝିବାରେ ସାହାଯ୍ୟ କରେ।",
        
                // Case Taking
        caseTakingTitle: "ଆପଣ କ’ଣ ଅନୁଭବ କରୁଛନ୍ତି, ଆମକୁ କୁହନ୍ତୁ",
        sehadAsks: "SEHAD ପଚାରୁଛି",
        initialCaseQuestion: "ଆଜି ଆପଣ କେଉଁ ସମସ୍ୟା ପାଇଁ ଆସିଛନ୍ତି?",
        caseQuestionHelp:
            "ଆପଣ ଯେଉଁ ମୁଖ୍ୟ ସ୍ୱାସ୍ଥ୍ୟ ସମସ୍ୟା ବିଷୟରେ ଆଲୋଚନା କରିବାକୁ ଚାହୁଁଛନ୍ତି, ସେ ବିଷୟରେ କୁହନ୍ତୁ।",
        yourResponse: "ଆପଣଙ୍କ ଉତ୍ତର",
        clear: "ସଫା କରନ୍ତୁ",
        responsePlaceholder: "ଏଠାରେ ଆପଣଙ୍କ ଉତ୍ତର ଲେଖନ୍ତୁ...",
        yourTurn: "ଆପଣଙ୍କ ପାଳି",
        sehadThinking: "SEHAD ଚିନ୍ତା କରୁଛି...",
        savingCase: "ଆପଣଙ୍କ କେସ୍ ସଂରକ୍ଷଣ କରାଯାଉଛି...",
        caseTakingComplete: "କେସ୍-ଟେକିଂ ସମ୍ପୂର୍ଣ୍ଣ",
        caseComplete: "କେସ୍ ସମ୍ପୂର୍ଣ୍ଣ",
        readyForReview: "ସମୀକ୍ଷା ପାଇଁ ପ୍ରସ୍ତୁତ",
        back: "ପଛକୁ",
        continue: "ଆଗକୁ ବଢ଼ନ୍ତୁ",
        finalQuestion: "ଶେଷ ପ୍ରଶ୍ନ",
        questionRemaining: "ପ୍ରଶ୍ନ ବାକି",
        questionsRemaining: "ପ୍ରଶ୍ନ ବାକି",

        caseCompleteTitle: "ଆପଣଙ୍କ କେସ୍ ଚିକିତ୍ସକଙ୍କ ସମୀକ୍ଷା ପାଇଁ ପ୍ରସ୍ତୁତ",
        caseCompleteText:
            "ଆପଣଙ୍କ ଉତ୍ତରଗୁଡ଼ିକ ସଂଗ୍ରହ କରି ସୁବ୍ୟବସ୍ଥିତ କରାଯାଇଛି। ବର୍ତ୍ତମାନ ଆପଣ ନିଜ କେସ୍ ସାରାଂଶ ଦେଖି ଏହାକୁ ନିଜ ଚିକିତ୍ସକଙ୍କ ସହିତ ସେୟାର କରିପାରିବେ।",
        viewCaseSummary: "କେସ୍ ସାରାଂଶ ଦେଖନ୍ତୁ",
        caseDisclaimer:
            "SEHAD ରୋଗ ନିର୍ଣ୍ଣୟ କିମ୍ବା ଚିକିତ୍ସା ନିର୍ଦ୍ଦେଶ ଦିଏ ନାହିଁ। ଆପଣଙ୍କ କେସ୍ ଆଧାରରେ ଆପଣଙ୍କ ଚିକିତ୍ସକ ଚିକିତ୍ସା ସମ୍ପର୍କିତ ନିଷ୍ପତ୍ତି ନେବେ।",
        question: "ପ୍ରଶ୍ନ",
        of: "ରୁ",
        readyToListen: "ଶୁଣିବା ପାଇଁ ପ୍ରସ୍ତୁତ",
        tapMic: "ମାଇକ୍ରୋଫୋନ୍ ଦବାନ୍ତୁ ଏବଂ ସ୍ୱାଭାବିକ ଭାବରେ କୁହନ୍ତୁ।",
        spokenResponsePlaceholder:
            "ଆପଣ କହିଥିବା ଉତ୍ତର ଏଠାରେ ଦେଖାଯିବ...",
        listening: "ଶୁଣୁଛି...",
        voiceInputUnavailable: "ଭଏସ୍ ଇନପୁଟ୍ ଉପଲବ୍ଧ ନାହିଁ",
        voiceInputError: "ଭଏସ୍ ଇନପୁଟ୍‌ରେ ସମସ୍ୟା ହୋଇଛି",
        responseCaptured: "ଉତ୍ତର ରେକର୍ଡ ହୋଇଛି",
        reviewResponse: "ଆପଣଙ୍କ ଉତ୍ତର ଯାଞ୍ଚ କରନ୍ତୁ କିମ୍ବା ଆଗକୁ ବଢ଼ନ୍ତୁ ଦବାନ୍ତୁ।",
        pleaseListen: "ଦୟାକରି ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ ଶୁଣନ୍ତୁ।",
        sehadSpeaking: "SEHAD କହୁଛି...",
        voiceUnsupported:
            "ଏହି ବ୍ରାଉଜରରେ ଭଏସ୍ ଇନପୁଟ୍ ସମର୍ଥିତ ନୁହେଁ। ଆପଣ ଉପରେ ଥିବା ଟେକ୍ସଟ୍ ବକ୍ସରେ ନିଜ ଉତ୍ତର ଲେଖିପାରିବେ।",
    }
};


/* =========================================
   LANGUAGE STORAGE
========================================= */

function getSehadLanguage() {
    const savedLanguage =
        localStorage.getItem(SEHAD_LANGUAGE_KEY);

    return SEHAD_LANGUAGES[savedLanguage]
        ? savedLanguage
        : "en";
}


function setSehadLanguage(language) {

    if (!SEHAD_LANGUAGES[language]) {
        return;
    }

    localStorage.setItem(
        SEHAD_LANGUAGE_KEY,
        language
    );

    applySehadTranslations();
}


/* =========================================
   TRANSLATION HELPER
========================================= */

function translateSehad(key) {

    const language = getSehadLanguage();

    return (
        SEHAD_TRANSLATIONS[language]?.[key] ||
        SEHAD_TRANSLATIONS.en[key] ||
        key
    );
}


/* =========================================
   APPLY TRANSLATIONS
========================================= */

function applySehadTranslations() {

    const language = getSehadLanguage();

    document.documentElement.lang = language;

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            const translatedText =
                translateSehad(key);

            element.textContent =
                translatedText;
        });

    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key =
                element.dataset.i18nPlaceholder;

            element.placeholder =
                translateSehad(key);
        });

    updateLanguageSelector();
}


/* =========================================
   LANGUAGE SELECTOR
========================================= */

function updateLanguageSelector() {

    const currentLanguage =
        getSehadLanguage();

    document
        .querySelectorAll(".language-selector, .language-button")
        .forEach(button => {

            const languageText =
                button.querySelector(
                    ".sehad-current-language"
                );

            if (languageText) {
                languageText.textContent =
                    SEHAD_LANGUAGES[currentLanguage];
            }
        });
}


function createLanguageMenu(button) {

    const existingMenu =
        button.parentElement.querySelector(
            ".sehad-language-menu"
        );

    if (existingMenu) {
        existingMenu.remove();
        return;
    }

    const menu =
        document.createElement("div");

    menu.className =
        "sehad-language-menu";

    Object.entries(SEHAD_LANGUAGES)
        .forEach(([code, name]) => {

            const option =
                document.createElement("button");

            option.type = "button";
            option.textContent = name;

            if (code === getSehadLanguage()) {
                option.classList.add("selected");
            }

            option.addEventListener("click", event => {

                event.stopPropagation();

                setSehadLanguage(code);

                menu.remove();
            });

            menu.appendChild(option);
        });

    let wrapper = button.parentElement;

if (!wrapper.classList.contains("language-selector-wrapper")) {

    wrapper = document.createElement("div");

    wrapper.className =
        "language-selector-wrapper";

    button.parentNode.insertBefore(
        wrapper,
        button
    );

    wrapper.appendChild(button);
}

wrapper.appendChild(menu);
}


function initializeLanguageSelector() {

    document
        .querySelectorAll(".language-selector, .language-button")
        .forEach(button => {

            if (
                button.dataset.sehadLanguageReady === "true"
            ) {
                return;
            }

            button.dataset.sehadLanguageReady =
                "true";

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    createLanguageMenu(button);
                }
            );
        });
}


/* =========================================
   START LANGUAGE SYSTEM
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeLanguageSelector();
        applySehadTranslations();
    }
);