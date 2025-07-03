import React, { useEffect, useState } from "react";
import { scrollHeader } from "../utils/ScrollReveal";
import { Github, Linkedin, Mail, Smartphone } from "lucide-react";
import { sendContactEmail } from "../services/EmailSender";

const Contact = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [isSended, setSended] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSending(true);
    setFeedback(null);
    setSended(false);

    try {
      await sendContactEmail(formData);
      setSended(true); // <-- isso aqui
      setFormData({ nome: "", email: "", mensagem: "" });
    } catch (error) {
      console.error("Erro ao enviar:", error);
      console.log("Ocorreu um erro ao enviar. Tente novamente.");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
  scrollHeader();
}, []);

useEffect(() => {
  if (isSended) {
    const timeout = setTimeout(() => setSended(false), 1700);
    return () => clearTimeout(timeout);
  }
}, [isSended]);


  return (
    <section id="contato" className="space-y-10 px-4 py-16 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-primary text-center reveal-1">
        Contato
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4 reveal-2 w-full">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-100"
              required
              disabled={isSending}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">E-mail</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-100"
              required
              disabled={isSending}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Mensagem</span>
            </label>
            <textarea
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-base-100"
              rows={4}
              required
              disabled={isSending}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={isSending}
          >
            {
              isSending
                ? "Enviando..."
                : isSended
                ? "Enviado!"
                : "Enviar Mensagem"
            }
          </button>

          {feedback && (
            <p
              className={`mt-3 text-center ${feedback.includes("erro")
                  ? "text-error"
                  : "text-success"
                }`}
            >
              {feedback}
            </p>
          )}
        </form>

        {/* Contato visual e ícones */}
        <div className="flex flex-col items-center text-primary reveal-3 gap-6">
          <img
            src="/assets/Footer-contatct.png"
            alt="Ilustração de Contato"
            className="pt-8 w-full h-auto max-h-[300px] object-contain rounded-xl"
          />

          <p className="text-lg text-center">Você também pode me encontrar em:</p>

          <div className="flex justify-center flex-wrap gap-6 text-xl">
            <a
              href="https://api.whatsapp.com/send/?phone=5511967392111&text=Olá!%20Gostaria%20de%20falar%20com%20você."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-primary-content transition"
            >
              <Smartphone size={28} />
            </a>
            <a
              href="mailto:guihenrique.dev@gmail.com"
              aria-label="Email"
              className="hover:text-primary-content transition"
            >
              <Mail size={28} />
            </a>
            <a
              href="https://linkedin.com/in/guih-henriquee"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-primary-content transition"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="https://github.com/Guih-henriqueee"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-primary-content transition"
            >
              <Github size={28} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
