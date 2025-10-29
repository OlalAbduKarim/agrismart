import { GoogleGenAI, Type } from "@google/genai";
import type { Listing } from "../types";

const API_KEY = process.env.API_KEY;
let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY environment variable not set. AI Guide will not function.");
}


const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const getAIGuideResponseStream = async function* (prompt: string, image?: File): AsyncGenerator<string> {
  if (!ai) {
    yield "The AI Guide is currently unavailable. The API Key is missing.";
    return;
  }

  try {
    const modelParams: { model: string, contents: any } = {
      model: 'gemini-2.5-flash',
      contents: prompt
    };

    if (image) {
      const imagePart = await fileToGenerativePart(image);
      const textPart = { text: prompt };
      modelParams.contents = { parts: [textPart, imagePart] };
    }

    const result = await ai.models.generateContentStream(modelParams);

    for await (const chunk of result) {
      yield chunk.text;
    }

  } catch (error) {
    console.error("Error getting AI stream response:", error);
    yield "Sorry, I encountered an error. Please try again.";
  }
};


export interface SuitabilityAnalysisResult {
    id: number;
    suitabilityScore: number;
    reason: string;
}

export const getLandSuitabilityAnalysis = async (query: string, listings: Listing[]): Promise<SuitabilityAnalysisResult[]> => {
    if (!ai) {
        throw new Error("AI service is unavailable. API Key is missing.");
    }
    
    // We only need to send essential data to the model
    const simplifiedListings = listings.map(l => ({
        id: l.id,
        soilType: l.soilType,
        waterSource: l.waterSource,
        landUse: l.landUse,
        location: l.location,
        aiTips: l.aiTips,
    }));

    const prompt = `A user wants to find land suitable for the following purpose: "${query}". 
    Based on this, analyze the provided list of land plots in Uganda. 
    Consider factors like soil type, water source, land use, and general location suitability. 
    Return a suitability score from 0 to 100 for each plot, where 100 is a perfect match. 
    Also provide a brief, one-sentence reason for your score.
    
    Here is the list of land plots:
    ${JSON.stringify(simplifiedListings)}
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.INTEGER },
                            suitabilityScore: { type: Type.INTEGER },
                            reason: { type: Type.STRING },
                        },
                        required: ["id", "suitabilityScore", "reason"],
                    },
                },
            },
        });
        
        const jsonText = response.text.trim();
        // Fix: Added type assertion to ensure the parsed JSON matches the function's return type signature.
        return JSON.parse(jsonText) as SuitabilityAnalysisResult[];

    } catch (error) {
        console.error("Error getting AI land suitability analysis:", error);
        throw new Error("Failed to analyze land suitability. Please try again.");
    }
};