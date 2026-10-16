import { useState, useRef } from "react";
import { FaUser, FaEnvelope, FaCommentAlt } from "react-icons/fa";
import "./Contact.css";

// Les messages arrivent dans ma boîte mail via Web3Forms.
// La clé d'accès est publique par conception : elle ne permet que d'envoyer vers l'adresse liée.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;

    // Champ piège invisible : un humain ne le coche jamais, un robot si
    if (form.botcheck.checked) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio : nouveau message de ${form.name.value}`,
          from_name: "Portfolio Mehdi Hammadou",
          name: form.name.value,
          email: form.email.value,
          replyto: form.email.value,
          message: form.message.value,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact">
      <h2>Contact</h2>
      <p>{"Envie de collaborer ? Écrivez-moi, on fera de belles choses ensemble !"}</p>

      <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
        <div className="input-group">
          <div className="icon-label">
            <FaUser className="icon" aria-hidden="true" />
            <label htmlFor="name">Nom</label>
          </div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Votre nom"
            autoComplete="name"
            maxLength={100}
            required
          />
        </div>

        <div className="input-group">
          <div className="icon-label">
            <FaEnvelope className="icon" aria-hidden="true" />
            <label htmlFor="email">Email</label>
          </div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Votre email"
            autoComplete="email"
            maxLength={200}
            required
          />
        </div>

        <div className="input-group">
          <div className="icon-label">
            <FaCommentAlt className="icon" aria-hidden="true" />
            <label htmlFor="message">Message</label>
          </div>
          <textarea
            id="message"
            name="message"
            placeholder="Votre message"
            maxLength={5000}
            required
          />
        </div>

        {/* Anti-spam : invisible pour les humains et les lecteurs d'écran */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />

        <button type="submit" className="btn-submit" disabled={status === "sending"}>
          {status === "sending" ? "Envoi en cours..." : "Envoyer"}
        </button>

        <div aria-live="polite">
          {status === "success" && (
            <p className="form-feedback success">{"Message envoyé ! Je vous répondrai rapidement."}</p>
          )}
          {status === "error" && (
            <p className="form-feedback error">
              {"Une erreur est survenue. Réessayez ou écrivez-moi à "}
              <a href="mailto:mehdihammadou04@gmail.com">mehdihammadou04@gmail.com</a>.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
