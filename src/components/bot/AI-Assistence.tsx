import { useState, useRef, useEffect } from "react";

const BOT_AVATAR = "https://cdn-icons-png.flaticon.com/512/4712/4712027.png";

export function ChatBot() {
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Carrega histórico da sessão
  useEffect(() => {
    const saved = sessionStorage.getItem("chatHistory");
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  // Atualiza histórico na sessão e scroll automático
  useEffect(() => {
    sessionStorage.setItem("chatHistory", JSON.stringify(answers));
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [answers, open]);

  // Ajusta altura da textarea conforme conteúdo
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMessage = message.trim();
    setAnswers([...answers, { sender: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setAnswers(prev => [...prev, { sender: "bot", text: data.answer }]);
    } catch (err) {
      console.error(err);
      setAnswers(prev => [...prev, { sender: "bot", text: "Erro ao enviar a mensagem." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {!open && (
        <button
          className="mb-2 px-4 py-2 rounded-full bg-primary text-white shadow-lg hover:bg-primary/80 transition"
          onClick={() => setOpen(true)}
        >
          Chat
        </button>
      )}

      {open && (
        <div className="w-80 max-h-[400px] bg-base-100 border border-primary rounded-lg shadow-lg flex flex-col overflow-hidden relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 p-1 rounded-full"
            title="Fechar chat"
          >
            &#10005;
          </button>

          {/* Histórico de mensagens */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 mt-6">
            {answers.length === 0 && <p className="text-sm text-gray-500">Comece a conversar!</p>}

            {answers.map((a, i) => (
              <div
                key={i}
                className={`flex items-start ${a.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {a.sender === "bot" && (
                  <img src={BOT_AVATAR} alt="Bot" className="w-6 h-6 rounded-full mr-2 mt-1" />
                )}
                <div
                  className={`p-2 rounded-xl text-white break-words whitespace-pre-wrap max-w-[80%] ${
                    a.sender === "user" ? "bg-secondary" : "bg-primary"
                  }`}
                >
                  {a.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input expansivo */}
          <div className="flex border-t border-primary p-1">
            <textarea
              ref={textareaRef}
              className="flex-1 px-2 py-1 outline-none resize-none max-h-[120px] overflow-y-auto rounded-lg break-words whitespace-pre-wrap"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
            />
            <button
              className="px-3 bg-primary text-white disabled:opacity-50 hover:bg-primary/80 transition ml-1 rounded-lg"
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? "..." : "Enviar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
