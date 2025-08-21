import { query } from "./db";

async function testDB() {
  try {
    const rows = await query("SELECT NOW()");
    console.log("Conexão com banco OK:", rows);
  } catch (err) {
    console.error("Erro na conexão:", err);
  }
}

testDB();
