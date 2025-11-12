
import { GoogleGenAI, GenerateContentRequest, Type, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateContent = async (request: GenerateContentRequest): Promise<GenerateContentResponse> => {
  try {
    const response = await ai.models.generateContent(request);
    return response;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
};
