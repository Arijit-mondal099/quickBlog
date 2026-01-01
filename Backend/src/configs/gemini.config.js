import { GoogleGenAI } from "@google/genai";

// Initialize with your API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main(prompt) {
  try {
    // Gemini 2.5 Flash is the stable production standard for 2026
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw error;
  }
}

export default main;
