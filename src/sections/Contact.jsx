import { useState } from "react";
import { FaUser, FaEnvelope, FaCommentAlt } from "react-icons/fa";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message envoyé !");
    setFormData({ name: "", email: "", message: "" });
  };

 return (
  <section id="contact" className="contact">
    <h2>Contact</h2>
    <p>N’hésitez pas à me contacter, on fera de belles choses ensemble !</p>

    <form onSubmit={handleSubmit} className="contact-form">
      <div className="input-group">
        <div className="icon-label">
          <FaUser className="icon" />
          <label htmlFor="name">Nom</label>
        </div>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Votre nom"
          value={formData.name}
          onChange={handleChange}
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
          name="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={handleChange}
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
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn-submit">
        Envoyer
      </button>
    </form>
  </section>
);

}
