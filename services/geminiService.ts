import { GoogleGenAI, Type } from "@google/genai";
import { Project, MatchResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        matchedProjectIds: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of strings, where each string is the ID of a relevant project."
        },
        suitabilitySummary: {
            type: Type.STRING,
            description: "A concise, professional paragraph (3-5 sentences) explaining why the candidate is a suitable fit for the role."
        }
    },
    required: ["matchedProjectIds", "suitabilitySummary"]
};

export async function findMatchingProjects(jobDescription: string, projects: Project[]): Promise<MatchResult> {
  const model = "gemini-2.5-flash";

  // filepath: c:\Users\Wara\Desktop\ai-portfolio-matcher\services\geminiService.ts
const projectSummaries = projects.map(p => 
  `ID: ${p.id}, Title: "${p.title}", Summary: "${p.description || 'No summary provided.'}"`
).join('\n');

  const prompt = `
    You are an expert AI talent-sourcing assistant. Your task is to analyze a job description and compare it against a candidate's portfolio of projects.

    **Candidate's Projects:**
    ${projectSummaries}

    **Job Description to Analyze:**
    "${jobDescription}"

    **Your Tasks:**
    1.  **Identify Matches:** Carefully read the job description and identify which of the candidate's projects are the most relevant. Consider the technologies, skills, and problem domains mentioned.
    2.  **Generate Summary:** Write a concise, professional paragraph (3-5 sentences) explaining why the candidate is a suitable fit for the role. This summary should directly reference skills and experiences from the matched projects that align with the job requirements.

    **Output Format:**
    You MUST provide your response in a valid JSON format that adheres to the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    // Log the raw response for debugging
    console.log("Gemini raw response:", response);

    const rawText = response.text ?? '';
    let parsedData: MatchResult | null = null;
    try {
      parsedData = JSON.parse(rawText) as MatchResult;
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", rawText);
      throw new Error("AI response was not valid JSON. Raw output: " + rawText);
    }

    if (!parsedData?.matchedProjectIds || !parsedData?.suitabilitySummary) {
        console.error("AI response missing fields:", parsedData);
        throw new Error("AI response is missing required fields. Raw output: " + rawText);
    }

    // Ensure the AI returns only valid project IDs
    const validProjectIds = new Set(projects.map(p => p.id.toString()));
    parsedData.matchedProjectIds = parsedData.matchedProjectIds.filter(id => validProjectIds.has(id));

    return parsedData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
      throw new Error("Failed to get analysis from AI. The model may have returned an invalid response.");
    }
  }