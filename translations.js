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
            "Consultation history helps your doctor understand you better."
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
            "परामर्श का इतिहास आपके डॉक्टर को आपको बेहतर समझने में मदद करता है।"
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
            "ପରାମର୍ଶ ଇତିହାସ ଆପଣଙ୍କ ଡାକ୍ତରଙ୍କୁ ଆପଣଙ୍କୁ ଭଲଭାବେ ବୁଝିବାରେ ସାହାଯ୍ୟ କରେ।"
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