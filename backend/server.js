const express = require("express");
const cors = require("cors");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

let geminiClient = null;

async function getGeminiClient() {
    if (!geminiClient) {
        const { GoogleGenAI } = await import("@google/genai");

        geminiClient = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });
    }

    return geminiClient;
}

async function generateGeminiContentWithRetry(ai, request, maxRetries = 2) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await ai.models.generateContent(request);
        } catch (error) {
            if (error?.status !== 503 || attempt === maxRetries) {
                throw error;
            }

            const delay = 1500 * (attempt + 1);

            console.warn(
                `Gemini temporarily unavailable (503). Retrying in ${delay}ms...`
            );

            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Middleware
app.use(cors());
app.use(express.json());

// AI adaptive case-taking
app.post("/api/case/next-question", async (req, res) => {
    try {
        const {
            patientResponse,
            conversationHistory = []
        } = req.body;

        if (!patientResponse || !patientResponse.trim()) {
            return res.status(400).json({
                success: false,
                message: "Patient response is required."
            });
        }

        const ai = await getGeminiClient();

        const systemInstruction = `
You are SEHAD, an AI-assisted clinical case-taking assistant.

Your job is to collect and organize information provided by the patient
so that a practitioner can later review the case.

You are NOT a doctor and must NOT:
- diagnose diseases
- prescribe medicines
- recommend treatment
- invent symptoms, history, test results, or medical facts
- claim that a patient definitely has a dangerous condition
- replace practitioner judgment

Your task is to ask ONE useful follow-up question at a time.

IMPORTANT: This is ADAPTIVE case-taking, not a questionnaire.

Use the patient's current response and the complete previous conversation
to determine whether additional information is actually needed.

Before choosing the next question, review the entire conversation and
determine which major symptoms and their important characteristics have
already been covered and which remain insufficiently explored.

Treat information as covered only when the patient has clearly provided it.
Do not assume that a symptom is adequately explored merely because the
symptom itself has been mentioned.

For each active symptom, consider whether its relevant onset, duration,
severity, character, progression, associated features, or other complaint-
specific details are sufficiently known.

Prioritize the most important missing detail from an active symptom before
moving to broader history.

Every question must have a clear connection to the patient's complaint,
symptoms, previous answers, or information necessary for safe practitioner review.

DO NOT ask questions simply to increase the question count.

DO NOT ask generic questions about unrelated areas of the patient's health
when they are not relevant to the current complaint.

For example, do not automatically ask about:
- medications
- past medical history
- allergies
- lifestyle
- family history

unless that information is relevant or clinically useful for understanding
the patient's current complaint.

EXAMPLE OF PROPER ADAPTIVE COVERAGE:

If a patient reports fever, cough, and body ache, do not immediately move
to medication or unrelated medical history.

First explore the important relevant characteristics of the active symptoms
that have not yet been sufficiently explored.

For example, if fever has already been characterized but cough and body ache
have not been explored, prioritize a useful question about those symptoms.

Do not ask about information that the patient has already clearly provided.

Only after the major active symptoms have been reasonably explored should
you consider medication, previous treatment, or other relevant history if
that information would meaningfully improve practitioner review.

This example is guidance for adaptive reasoning, not a fixed sequence of
questions.

Prioritize relevant information such as:
- main complaint
- location
- onset
- duration
- frequency
- severity
- nature/character of symptoms
- aggravating or relieving factors
- associated symptoms
- relevant medical history
- relevant medications
- relevant allergies
- previous treatment
- other information directly relevant to the current complaint

Do not ask for information that has already been clearly provided.

SYMPTOM COVERAGE RULE:

If the patient reports multiple active symptoms, do not complete the case
after exploring only one symptom.

Identify the major active symptoms explicitly reported by the patient.

Before completing the case, make sure the important characteristics of
the major active symptoms have been reasonably explored.

If one symptom has been sufficiently explored but another important active
symptom has not been explored, ask about the unexplored symptom.

Do not move to medication, past medical history, allergies, lifestyle,
or other general history while important active symptoms remain
insufficiently explored.

Once the major active symptoms have been adequately explored, consider
relevant medication, previous treatment, or relevant medical history if
that information would meaningfully improve practitioner review.

This rule does NOT require a fixed number of questions.

CASE COMPLETION RULE:

You should set case_complete to true as soon as enough useful information
has been collected for a practitioner to review the case.

Do NOT try to reach a fixed number of questions.

A case does NOT need every possible history category to be complete.

If the main complaint is reasonably clear and the important details needed
for practitioner review have already been collected, STOP asking questions.

However, do NOT consider the case complete if significant active symptoms
mentioned by the patient still lack important details.

The main complaint being clear is not sufficient by itself when the patient
has reported multiple active symptoms.

Before setting case_complete to true, verify that the major active symptoms
have been reasonably explored or that no further relevant information can
meaningfully improve practitioner review.

Before asking another question, ask yourself:

"Will the answer to this question meaningfully improve the practitioner's
understanding of this patient's current complaint?"

If the answer is no, set case_complete to true.

Prefer finishing a case early over asking an unnecessary question.

If important information is still missing, ask only the single highest-value
next question.

Never ask multiple questions in one question.

SAFETY:

If the patient's response contains something that may warrant safety attention,
set ai_safety_signal to true.

This is ONLY an AI-generated signal for a separate safety layer.
It must never be treated as a diagnosis or definitive emergency determination.

Do not diagnose the patient's condition even when a safety signal is present.

OUTPUT:

Always return valid JSON matching the requested structure.

When case_complete is true:
- next_question should be an empty string
- reason should briefly explain that sufficient information has been collected
- information_needed should contain only genuinely missing information, if any
- do not invent missing information

When case_complete is false:
- next_question must contain exactly ONE relevant follow-up question
- reason should briefly explain why that specific information is needed
- information_needed should contain the genuinely useful information still missing

Your goal is NOT to maximize the number of questions.

Your goal is to collect enough relevant information efficiently,
naturally, and safely for practitioner review.
`;

        const conversationText = conversationHistory.length > 0
            ? conversationHistory.map((item, index) => {
                return `${index + 1}. ${item.role}: ${item.content}`;
            }).join("\n")
            : "No previous conversation.";

        const prompt = `
Previous conversation:
${conversationText}

Latest patient response:
${patientResponse.trim()}

Determine the next appropriate step in the case-taking conversation.
`;

        const response = await generateGeminiContentWithRetry(ai, {
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
    systemInstruction,
    thinkingConfig: {
        thinkingLevel: "minimal"
    },
    responseMimeType: "application/json",
    responseSchema: {
            type: "object",
            properties: {
                next_question: {
                    type: "string",
                    description: "The single most useful next question to ask the patient."
                },
                reason: {
                    type: "string",
                    description: "Brief explanation of why this information is needed."
                },
                information_needed: {
                    type: "array",
                    items: {
                        type: "string"
                    },
                    description: "The specific pieces of information that are still missing."
                },
                case_complete: {
                    type: "boolean",
                    description: "Whether enough information has been collected for practitioner review."
                },
                ai_safety_signal: {
                    type: "boolean",
                    description: "Whether the response contains something that may require a separate safety check."
                }
            },
            required: [
                "next_question",
                "reason",
                "information_needed",
                "case_complete",
                "ai_safety_signal"
            ]
        }
    }
});

        let aiResult;

        try {
            aiResult = JSON.parse(response.text);
        } catch (parseError) {
            console.error("Invalid Gemini JSON:", response.text);

            return res.status(502).json({
                success: false,
                message: "AI returned an invalid response format."
            });
        }

        if (
            typeof aiResult.next_question !== "string" ||
            typeof aiResult.reason !== "string" ||
            !Array.isArray(aiResult.information_needed) ||
            typeof aiResult.case_complete !== "boolean" ||
            typeof aiResult.ai_safety_signal !== "boolean"
        ) {
            return res.status(502).json({
                success: false,
                message: "AI returned an unexpected response format."
            });
        }

        res.status(200).json({
            success: true,
            data: {
                next_question: aiResult.next_question,
                reason: aiResult.reason,
                information_needed: aiResult.information_needed,
                case_complete: aiResult.case_complete,
                ai_safety_signal: aiResult.ai_safety_signal
            }
        });

    } catch (error) {
        console.error("Adaptive AI error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to process the case response right now."
        });
    }
});

// Gemini connection test
app.get("/api/ai/test", async (req, res) => {
    try {
        const ai = await getGeminiClient();

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: "Respond with exactly: SEHAD Gemini connection successful."
        });

        res.status(200).json({
            success: true,
            message: response.text
        });

    } catch (error) {
        console.error("Gemini test error:", error);

        res.status(500).json({
            success: false,
            message: "Gemini connection failed."
        });
    }
});

// Serve SEHAD frontend
app.use(express.static(path.join(__dirname, "..")));

// Supabase connection
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

// Test route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Supabase connection test
app.get("/api/test-supabase", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("profiles")
            .select("id")
            .limit(1);

        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        res.json({
            success: true,
            message: "Supabase connection successful 🚀",
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Supabase connection failed",
            error: error.message
        });
    }
});

// Patient signup
app.post("/api/auth/signup", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Full name, email and password are required."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long."
            });
        }

        const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
                data: {
                    full_name: fullName.trim()
                }
            }
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        // Create secure authentication cookies
        if (data.session) {
            const accessToken = data.session.access_token;
            const refreshToken = data.session.refresh_token;

            res.setHeader("Set-Cookie", [
                `sehad_access_token=${accessToken}; HttpOnly; Path=/; SameSite=Lax; Max-Age=3600`,
                `sehad_refresh_token=${refreshToken}; HttpOnly; Path=/; SameSite=Lax; Max-Age=2592000`
            ]);
        }

        res.status(201).json({
            success: true,
            message: "Patient account created successfully.",
            user: {
                id: data.user.id,
                email: data.user.email
            }
        });

    } catch (error) {
        console.error("Signup error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to create account right now."
        });
    }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password
        });

        if (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const accessToken = data.session.access_token;
        const refreshToken = data.session.refresh_token;

        const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", data.user.id)
    .single();

if (profileError || !profile) {
    return res.status(500).json({
        success: false,
        message: "Unable to load your profile."
    });
}

        // Store authentication tokens in HttpOnly cookies.
        res.setHeader("Set-Cookie", [
            `sehad_access_token=${accessToken}; HttpOnly; Path=/; SameSite=Lax; Max-Age=3600`,
            `sehad_refresh_token=${refreshToken}; HttpOnly; Path=/; SameSite=Lax; Max-Age=2592000`
        ]);

        res.status(200).json({
            success: true,
            message: "Login successful.",
            user: {
    id: data.user.id,
    email: data.user.email,
    full_name: profile.full_name,
    role: profile.role
}
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to log in right now."
        });
    }
});

app.get("/api/auth/me", async (req, res) => {
    try {
        const cookies = req.headers.cookie || "";

        const accessTokenCookie = cookies
            .split(";")
            .find(cookie => cookie.trim().startsWith("sehad_access_token="));

        if (!accessTokenCookie) {
            return res.status(401).json({
                success: false,
                authenticated: false,
                message: "Not authenticated."
            });
        }

        const accessToken = accessTokenCookie
            .split("=")[1]
            .trim();

        const { data, error } = await supabase.auth.getUser(accessToken);

        if (error || !data.user) {
            return res.status(401).json({
                success: false,
                authenticated: false,
                message: "Session is invalid or expired."
            });
        }

        const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", data.user.id)
    .single();

if (profileError || !profile) {
    return res.status(404).json({
        success: false,
        authenticated: false,
        message: "User profile not found."
    });
}

        res.status(200).json({
    success: true,
    authenticated: true,
    user: {
        id: data.user.id,
        email: data.user.email,
        full_name: profile.full_name,
        role: profile.role
    }
});

    } catch (error) {
        console.error("Auth verification error:", error);

        res.status(500).json({
            success: false,
            authenticated: false,
            message: "Unable to verify authentication."
        });
    }
});

app.post("/api/auth/logout", (req, res) => {
    try {
        res.setHeader("Set-Cookie", [
            "sehad_access_token=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0",
            "sehad_refresh_token=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0"
        ]);

        res.status(200).json({
            success: true,
            message: "Logged out successfully."
        });

    } catch (error) {
        console.error("Logout error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to log out right now."
        });
    }
});

// Complete and save patient case
app.post("/api/case/complete", async (req, res) => {
    try {
        const {
            conversationHistory = []
        } = req.body;

        if (
            !Array.isArray(conversationHistory) ||
            conversationHistory.length < 2
        ) {
            return res.status(400).json({
                success: false,
                message: "A completed case conversation is required."
            });
        }

        /*
         * Get the logged-in user's access token
         * from the existing HttpOnly cookie.
         */
        const cookies = req.headers.cookie || "";

        const accessTokenCookie = cookies
            .split(";")
            .find(cookie =>
                cookie.trim().startsWith("sehad_access_token=")
            );

        if (!accessTokenCookie) {
            return res.status(401).json({
                success: false,
                message: "You must be logged in to save a case."
            });
        }

        const accessToken = accessTokenCookie
            .split("=")[1]
            .trim();

        const { data: authData, error: authError } =
            await supabase.auth.getUser(accessToken);

        if (authError || !authData.user) {
            return res.status(401).json({
                success: false,
                message: "Your session is invalid or expired."
            });
        }

        /*
         * Only patients should create patient cases.
         */
        const { data: profile, error: profileError } =
            await supabase
                .from("profiles")
                .select("role")
                .eq("id", authData.user.id)
                .single();

        if (profileError || !profile) {
            return res.status(404).json({
                success: false,
                message: "User profile not found."
            });
        }

        if (profile.role !== "patient") {
            return res.status(403).json({
                success: false,
                message: "Only patients can create patient cases."
            });
        }

        /*
         * Convert the conversation into readable text
         * for the summary model.
         */
        const conversationText = conversationHistory
            .map((item, index) => {
                return `${index + 1}. ${item.role}: ${item.content}`;
            })
            .join("\n");

        const ai = await getGeminiClient();

        const systemInstruction = `
You are SEHAD, an AI-assisted clinical case-taking and
information organization assistant.

Your task is to summarize information that was explicitly
provided by the patient during the case-taking conversation.

You MUST NOT:
- diagnose any disease or condition
- prescribe medicines
- recommend treatment
- invent symptoms, history, medications, allergies,
  test results, or other medical information
- convert uncertainty into certainty
- claim that the patient definitely has a condition

If information was not reported by the patient, write:
"Not reported"

The summary is for practitioner review.
It is NOT a medical diagnosis.

Clearly organize the patient's reported information.
`;

        const prompt = `
Create a concise structured clinical case summary from
the following completed patient conversation.

CONVERSATION:
${conversationText}

Return information based ONLY on the conversation.
`;

        const response = await generateGeminiContentWithRetry(ai, {
            model: "gemini-3.5-flash-lite",
            contents: prompt,
            config: {
                systemInstruction,
                thinkingConfig: {
                    thinkingLevel: "minimal"
                },
                responseMimeType: "application/json",
                responseSchema: {
                    type: "object",
                    properties: {
                        chief_complaint: {
                            type: "string"
                        },
                        symptoms: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        },
                        onset_duration: {
                            type: "string"
                        },
                        severity: {
                            type: "string"
                        },
                        associated_symptoms: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        },
                        medical_history: {
                            type: "string"
                        },
                        medications: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        },
                        allergies: {
                            type: "string"
                        },
                        previous_treatment: {
                            type: "string"
                        },
                        additional_information: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        }
                    },
                    required: [
                        "chief_complaint",
                        "symptoms",
                        "onset_duration",
                        "severity",
                        "associated_symptoms",
                        "medical_history",
                        "medications",
                        "allergies",
                        "previous_treatment",
                        "additional_information"
                    ]
                }
            }
        });

        const rawText = response.text;

        if (!rawText) {
            throw new Error("AI returned an empty summary.");
        }

        let summary;

        try {
            summary = JSON.parse(rawText);
        } catch (parseError) {
            console.error("Case summary JSON error:", parseError);

            return res.status(500).json({
                success: false,
                message: "Unable to organize the case summary."
            });
        }

        /*
         * Save the completed case in Supabase.
         */
        const { data: savedCase, error: caseError } =
            await supabase
                .from("cases")
                .insert({
                    patient_id: authData.user.id,
                    status: "completed",
                    conversation: conversationHistory,
                    ai_summary: summary,
                    ayush_summary: null,
                    red_flags: []
                })
                .select()
                .single();

        if (caseError) {
            console.error("Case save error:", caseError);

            return res.status(500).json({
                success: false,
                message: "Unable to save your case."
            });
        }

        res.status(200).json({
            success: true,
            message: "Case completed and saved successfully.",
            data: savedCase
        });

    } catch (error) {
        console.error("Case completion error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to complete and save the case right now."
        });
    }
});

// Get latest completed case for the logged-in patient
app.get("/api/case/current", async (req, res) => {
    try {

        res.set("Cache-Control", "no-store");

        /*
         * Get the logged-in user's access token
         * from the existing HttpOnly cookie.
         */
        const cookies = req.headers.cookie || "";

        const accessTokenCookie = cookies
            .split(";")
            .find(cookie =>
                cookie.trim().startsWith("sehad_access_token=")
            );

        if (!accessTokenCookie) {
            return res.status(401).json({
                success: false,
                message: "You must be logged in to view your case."
            });
        }

        const accessToken = accessTokenCookie
            .split("=")[1]
            .trim();


        /*
         * Verify the logged-in user.
         */
        const { data: authData, error: authError } =
            await supabase.auth.getUser(accessToken);

        if (authError || !authData.user) {
            return res.status(401).json({
                success: false,
                message: "Your session is invalid or expired."
            });
        }


        /*
         * Make sure the logged-in account is a patient.
         */
        const { data: profile, error: profileError } =
            await supabase
                .from("profiles")
                .select("role")
                .eq("id", authData.user.id)
                .single();

        if (profileError || !profile) {
            return res.status(404).json({
                success: false,
                message: "User profile not found."
            });
        }

        if (profile.role !== "patient") {
            return res.status(403).json({
                success: false,
                message: "Only patients can view patient cases."
            });
        }


        /*
         * Get the latest completed case belonging
         * to the logged-in patient.
         *
         * We intentionally retrieve an array here instead
         * of using maybeSingle(), then take the newest case.
         */
        const { data: completedCases, error: caseError } =
            await supabase
                .from("cases")
                .select(`
                    id,
                    status,
                    conversation,
                    ai_summary,
                    ayush_summary,
                    red_flags,
                    practitioner_verified,
                    created_at,
                    updated_at
                `)
                .eq("patient_id", authData.user.id)
                .eq("status", "completed")
                .order("created_at", { ascending: false })
                .limit(1);

        if (caseError) {
            console.error("Current case retrieval error:", caseError);

            return res.status(500).json({
                success: false,
                message: "Unable to load your case."
            });
        }

        /*
         * No completed case exists yet.
         */
        if (!completedCases || completedCases.length === 0) {
            return res.status(200).json({
                success: true,
                hasCase: false,
                data: null
            });
        }

        const currentCase = completedCases[0];

        res.status(200).json({
            success: true,
            hasCase: true,
            data: currentCase
        });


    } catch (error) {

        console.error(
            "Current case error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to load your current case right now."
        });
    }
});

// Permanently delete the latest completed case for the logged-in patient
app.delete("/api/case/current", async (req, res) => {
    try {
        /*
         * Prevent caching of this authenticated operation.
         */
        res.set("Cache-Control", "no-store");

        /*
         * Get the logged-in user's access token
         * from the existing HttpOnly cookie.
         */
        const cookies = req.headers.cookie || "";

        const accessTokenCookie = cookies
            .split(";")
            .find(cookie =>
                cookie.trim().startsWith("sehad_access_token=")
            );

        if (!accessTokenCookie) {
            return res.status(401).json({
                success: false,
                message: "You must be logged in to delete your case."
            });
        }

        const accessToken = accessTokenCookie
            .split("=")[1]
            .trim();

        /*
         * Verify the logged-in user.
         */
        const { data: authData, error: authError } =
            await supabase.auth.getUser(accessToken);

        if (authError || !authData.user) {
            return res.status(401).json({
                success: false,
                message: "Your session is invalid or expired."
            });
        }

        /*
         * Make sure the logged-in account is a patient.
         */
        const { data: profile, error: profileError } =
            await supabase
                .from("profiles")
                .select("role")
                .eq("id", authData.user.id)
                .single();

        if (profileError || !profile) {
            return res.status(404).json({
                success: false,
                message: "User profile not found."
            });
        }

        if (profile.role !== "patient") {
            return res.status(403).json({
                success: false,
                message: "Only patients can delete patient cases."
            });
        }

        /*
         * Find the latest completed case belonging
         * to this authenticated patient.
         */
        const { data: completedCases, error: findError } =
            await supabase
                .from("cases")
                .select("id")
                .eq("patient_id", authData.user.id)
                .eq("status", "completed")
                .order("created_at", { ascending: false })
                .limit(1);

        if (findError) {
            console.error("Case deletion lookup error:", findError);

            return res.status(500).json({
                success: false,
                message: "Unable to find your current case."
            });
        }

        if (!completedCases || completedCases.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No completed case was found."
            });
        }

        const caseId = completedCases[0].id;

        /*
         * Permanently delete only this patient's case.
         */
        const { error: deleteError } =
            await supabase
                .from("cases")
                .delete()
                .eq("id", caseId)
                .eq("patient_id", authData.user.id);

        if (deleteError) {
            console.error("Case deletion error:", deleteError);

            return res.status(500).json({
                success: false,
                message: "Unable to delete your case."
            });
        }

        res.status(200).json({
            success: true,
            message: "Your case has been permanently deleted."
        });

    } catch (error) {
        console.error("Case deletion error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to delete your case right now."
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`SEHAD backend running at http://localhost:${PORT}`);
});