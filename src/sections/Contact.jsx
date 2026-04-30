import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaUser, FaEnvelope, FaCommentAlt } from "react-icons/fa";
import "./Contact.css";

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("success");
        formRef.current.reset();
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <section id="contact" className="contact">
      <h2>Contact</h2>
      <p>{"N'hesitez pas a me contacter, on fera de belles choses ensemble !"}</p>

      <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
        <div className="input-group">
          <div className="icon-label">
            <FaUser className="icon" />
            <label htmlFor="name">Nom</label>
          </div>
          <input
            type="text"
            id="name"
            name="from_name"
            placeholder="Votre nom"
            required
          />
        </div>

        <div className="input-group">
          <div className="icon-label">
            <FaEnvelope className="icon" />
            <label htmlFor="email">Email</label>
          </div>
          <input
            type="email"
            id="email"
            name="from_email"
            placeholder="Votre email"
            required
          />
        </div>

        <div className="input-group">
          <div className="icon-label">
            <FaCommentAlt className="icon" />
            <label htmlFor="message">Message</label>
          </div>
          <textarea
            id="message"
            name="message"
            placeholder="Votre message"
            required
          />
        </div>

        <button type="submit" className="btn-submit" disabled={status === "sending"}>
          {status === "sending" ? "Envoi en cours..." : "Envoyer"}
        </button>

        {status === "success" && (
          <p className="form-feedback success">{"Message envoye ! Je vous repondrai rapidement."}</p>
        )}
        {status === "error" && (
          <p className="form-feedback error">{"Une erreur est survenue. Reessayez ou contactez-moi directement."}</p>
        )}
      </form>
    </section>
  );
}