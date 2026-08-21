import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Smartphone } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../motion/bootstrap";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { useTheme } from "../../motion/useTheme";
import { palette } from "../../motion/palette";
import { sendContactEmail } from "../../services/EmailSender";
import ReCaptchaGuard from "../ReCaptchaGuard";

const socialLinks = [
  {
    href: "https://api.whatsapp.com/send/?phone=5511967392111&text=Olá!%20Gostaria%20de%20falar%20com%20você.",
    label: "WhatsApp",
    icon: Smartphone,
  },
  { href: "mailto:guihenrique.dev@gmail.com", label: "Email", icon: Mail },
  { href: "https://linkedin.com/in/guih-henriquee", label: "LinkedIn", icon: Linkedin },
  { href: "https://github.com/Guih-henriqueee", label: "GitHub", icon: Github },
];

const footerLinks = [
  { href: "https://github.com/guih-henriqueee", label: "GitHub" },
  { href: "https://linkedin.com/in/guih-henriquee", label: "LinkedIn" },
  { href: "mailto:gmartinsdevelop@gmail.com", label: "E-mail" },
];

export default function ContactClose() {
  const { prefersReducedMotion } = useReducedMotion();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" });
  const [isSending, setIsSending] = useState(false);
  const [isSended, setSended] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecaptchaVerify = (token: string | null) => setRecaptchaToken(token);

  const handleSendAfterRecaptcha = async () => {
    if (!recaptchaToken) {
      setFeedback("Por favor, valide o reCAPTCHA.");
      return;
    }
    setIsSending(true);
    setFeedback(null);
    setSended(false);
    try {
      await sendContactEmail(formData);
      setSended(true);
      setFormData({ nome: "", email: "", mensagem: "" });
      setShowRecaptcha(false);
      setRecaptchaToken(null);
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setFeedback("Ocorreu um erro ao enviar. Tente novamente.");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (isSended) {
      const timeout = setTimeout(() => setSended(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isSended]);

  // Crossfade final do fundo full-bleed — atinge o extremo saturado de --primary,
  // fechando o percurso de cor iniciado no fim do pin da Cena 1 (Hero).
  useGSAP(
    () => {
      const section = sectionRef.current;
      const signalLayer = document.querySelector<HTMLElement>("[data-signal-layer]");
      if (!section || !signalLayer) return;

      const target = palette[theme].primary;

      if (prefersReducedMotion) {
        gsap.set(signalLayer, { backgroundColor: target });
        return;
      }

      const tween = gsap.to(signalLayer, {
        backgroundColor: target,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, theme] }
  );

  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contato"
      ref={sectionRef}
      aria-label="Contato"
      className="relative z-10 bg-primary text-primary-content"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-content/70">
          Canal aberto // Contato
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          Vamos construir a próxima integração
        </h2>

        <div className="mt-12 grid grid-cols-1 items-start gap-10 md:grid-cols-2">
          <form className="w-full space-y-4">
            <div>
              <label htmlFor="contact-nome" className="mb-1 block text-sm text-primary-content/80">
                Nome
              </label>
              <input
                id="contact-nome"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="input input-bordered w-full border-primary-content/30 bg-primary-content/10 text-primary-content placeholder:text-primary-content/50"
                required
                disabled={isSending}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1 block text-sm text-primary-content/80">
                E-mail
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full border-primary-content/30 bg-primary-content/10 text-primary-content placeholder:text-primary-content/50"
                required
                disabled={isSending}
              />
            </div>

            <div>
              <label htmlFor="contact-mensagem" className="mb-1 block text-sm text-primary-content/80">
                Mensagem
              </label>
              <textarea
                id="contact-mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                rows={4}
                className="textarea textarea-bordered w-full border-primary-content/30 bg-primary-content/10 text-primary-content placeholder:text-primary-content/50"
                required
                disabled={isSending}
              />
            </div>

            {!showRecaptcha ? (
              <button
                type="button"
                className="btn w-full border-none bg-primary-content text-primary hover:bg-primary-content/90"
                disabled={isSending}
                onClick={() => {
                  const { nome, email, mensagem } = formData;
                  if (!nome.trim() || !email.trim() || !mensagem.trim()) {
                    setFeedback("Preencha todos os campos antes de enviar.");
                    return;
                  }
                  setFeedback(null);
                  setShowRecaptcha(true);
                }}
              >
                Enviar Mensagem
              </button>
            ) : (
              <>
                <ReCaptchaGuard
                  siteKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onVerify={handleRecaptchaVerify}
                />
                <button
                  type="button"
                  className="btn w-full border-none bg-primary-content text-primary hover:bg-primary-content/90"
                  disabled={isSending || !recaptchaToken}
                  onClick={handleSendAfterRecaptcha}
                >
                  {isSending ? "Enviando..." : isSended ? "Enviado!" : "Confirmar e Enviar"}
                </button>
              </>
            )}

            {feedback && <p className="text-center text-sm text-error-content">{feedback}</p>}
          </form>

          <div className="flex flex-col gap-6">
            <p className="text-lg">Você também pode me encontrar em:</p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-content/40 transition hover:bg-primary-content/15"
                >
                  <Icon size={22} aria-hidden="true" />
                </a>
              ))}
            </div>

            <img
              src="/assets/Footer-contatct.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="mt-4 h-auto max-h-64 w-full rounded-xl object-contain opacity-90"
            />
          </div>
        </div>
      </div>

      <footer className="border-t border-primary-content/20">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm md:flex-row">
          <p>© {currentYear} Guilherme Martins. Todos os direitos reservados.</p>
          <nav className="flex gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="transition hover:text-primary-content/70"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </section>
  );
}
