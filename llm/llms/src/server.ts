import express, { Request, Response } from "express";
import dotenv from "dotenv";
import chatRouter from "./api/chat";
import knowledgeRouter from "./api/knowledge";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/chat", chatRouter);
app.use("/api/knowledge", knowledgeRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("LLM Bot API está rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
