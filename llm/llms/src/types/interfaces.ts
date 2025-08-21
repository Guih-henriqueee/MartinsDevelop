// Interfaces do LLM
export interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMChoice {
  message: LLMMessage;
}

export interface LLMResponse {
  choices: LLMChoice[];
}

// Interface para resultado do Neon
export interface KnowledgeRow {
  pergunta: string;
  resposta: string;
}
