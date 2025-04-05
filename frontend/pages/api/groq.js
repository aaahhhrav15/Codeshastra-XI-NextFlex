import { createClient } from "groq"; // Adjust the import based on the library's documentation

const client = createClient({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.2-11b-vision-preview",
      messages: req.body.messages,
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    res.status(200).json({ message: completion.choices[0]?.message?.content || "No response from AI" });
  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({ error: "Failed to fetch response" });
  }
}