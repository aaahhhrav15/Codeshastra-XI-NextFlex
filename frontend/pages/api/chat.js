import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Act as a professional nutritionist. Answer concisely (40-60 words) in a friendly tone: ${question}
      Focus on:
      - Scientifically-backed nutrition facts
      - Practical dietary advice
      - Balanced meal suggestions
      - Avoid medical advice
      Format: Clear, conversational response without markdown`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    res.status(200).json({ answer: text });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      answer: "Sorry, I'm having trouble processing your question. Please try again later.",
    });
  }
}