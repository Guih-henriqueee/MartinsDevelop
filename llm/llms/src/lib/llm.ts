import fetch from "node-fetch";
import { LLMResponse } from "../types/interfaces";

export async function callLLM(message: string, context?: string): Promise<string> {
  const payload = {
    model: "llama3-70b-8192",
    messages: [
      { role: "system", content: "Você é um assistente que responde perguntas sobre o portfólio." },
      { role: "user", content: `Pergunta: ${message}\nContexto: ${context || "Sem contexto"}` }
    ]
  };

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    
    body: JSON.stringify(payload),
  });

  const data: LLMResponse = await res.json() as LLMResponse;
  return data.choices[0].message.content;
}
