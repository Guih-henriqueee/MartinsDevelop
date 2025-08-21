// llms/src/api/knowledge.ts
import { Router, Request, Response } from "express";
import { query } from "../lib/db";

interface KnowledgePayload {
  pergunta: string;
  resposta: string;
  categoria?: string;
}

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { pergunta, resposta, categoria } = req.body as KnowledgePayload;

    if (!pergunta || !resposta) {
      return res.status(400).json({ error: "Pergunta e resposta são obrigatórias" });
    }

    const result = await query(
      "INSERT INTO base_conhecimento (pergunta, resposta, categoria) VALUES ($1, $2, $3) RETURNING *",
      [pergunta, resposta, categoria || null]
    );

    res.status(201).json({ message: "Registro adicionado com sucesso", data: result[0] });
  } catch (error: any) {
    console.error("❌ Erro no endpoint /api/knowledge:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
