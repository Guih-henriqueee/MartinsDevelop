// @ts-ignore
// llms/src/api/chat.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../lib/db';
import { callLLM } from '../lib/llm';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

    const { message } = req.body;
    if (!message || message.trim() === '') return res.status(400).json({ error: 'Mensagem é obrigatória' });

    console.log('[API] Mensagem recebida:', message);

    // Buscar resposta na base de conhecimento
    const results = await query(
      'SELECT resposta FROM base_conhecimento WHERE pergunta ILIKE $1 LIMIT 1',
      [`%${message}%`]
    );

    let context = results.length > 0 ? results[0].resposta : '';

    // Se não houver resposta, registrar pergunta na base de aprendizagem
    if (!context) {
      console.log('[API] Nenhuma resposta encontrada, registrando pergunta...');
      try {
        await query(
          'INSERT INTO base_de_aprendizagem (pergunta, resposta, categoria) VALUES ($1, $2, $3)',
          [message, '', null]
        );
        console.log('[API] Pergunta registrada com sucesso na base de aprendizagem.');
      } catch (err) {
        console.error('[API] Erro ao inserir pergunta no banco:', err);
      }
      context = 'Sem dados no banco.';
    } else {
      console.log('[API] Resposta encontrada no contexto:', context);
    }

    // Chamar LLM (mesmo que não tenha contexto)
    const answer = await callLLM(message, context);
    console.log('[API] Resposta do LLM:', answer);

    res.status(200).json({ answer });

  } catch (error: any) {
    console.error('[API] Erro no handler:', error);
    res.status(500).json({ error: error.message });
  }
}
