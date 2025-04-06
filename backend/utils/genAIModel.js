import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_API;
const genAI = new GoogleGenerativeAI(geminiApiKey);
const genAIModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export default genAIModel;
