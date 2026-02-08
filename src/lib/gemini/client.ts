import { GoogleGenerativeAI } from "@google/generative-ai";

export function getGeminiModel(systemInstruction?: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  return genAI.getGenerativeModel({
    model: "gemini-flash-lite-latest",
    ...(systemInstruction ? { systemInstruction } : {}),
  });
}
