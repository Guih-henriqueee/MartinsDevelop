import emailjs from '@emailjs/browser';

interface EmailParams {
  nome: string;
  email: string;
  mensagem: string;
}

export async function sendContactEmail(params: EmailParams): Promise<void> {
  const serviceId = import.meta.env.VITE_SERVICE_ID;
  const templateId = import.meta.env.VITE_TEMPLATE_ID;       // resposta automática para o visitante
  const templateId_me = import.meta.env.VITE_TEMPLATE_ID_ME; // notificação para você
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;

  if (!serviceId || !templateId || !templateId_me || !publicKey) {
    throw new Error('Missing environment variables for EmailJS');
  }

  await emailjs.send(
    serviceId,
    templateId_me,
    {
      nome: params.nome,
      email: params.email,
      mensagem: params.mensagem,
      time: new Date().toLocaleString('pt-BR'),
    },
    publicKey
  );

  await emailjs.send(
    serviceId,
    templateId,
    {
      nome: params.nome,
      email: params.email,
    },
    publicKey
  );
}
