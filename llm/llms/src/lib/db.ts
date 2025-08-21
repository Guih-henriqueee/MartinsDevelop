import { Pool } from "pg";
import dotenv from "dotenv";
import { KnowledgeRow } from "../types/interfaces";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // necessário para Neon
  },
});

// Função de query
export async function query(text: string, params?: any[]): Promise<KnowledgeRow[]> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows;
  } finally {
    client.release();
  }
}
