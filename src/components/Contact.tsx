import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário enviado:", formData);
    alert("Mensagem enviada com sucesso!");
    setFormData({ nome: "", email: "", mensagem: "" });
  };

  return (
    <section id="contato" className="space-y-8">
      <h2 className="text-3xl flex font-bold text-primary text-start">Contato</h2>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nome</span>
          </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="input input-bordered bg-base-100"
            required
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
            className="input input-bordered bg-base-100"
            required
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
            className="textarea textarea-bordered bg-base-100"
            rows={4}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Enviar Mensagem
        </button>
      </form>
    </section>
  );
};

export default Contact;
