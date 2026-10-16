import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);

  // Échap ferme la modale ; le focus va sur « Fermer » à l'ouverture et revient ensuite à la carte
  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="project-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClose}
    >
      <motion.div
        className="project-modal"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Bouton fermer */}
        <button ref={closeRef} className="modal-close-btn" onClick={onClose} aria-label="Fermer">✕</button>

        {/* Titre */}
        <h2 id="modal-title" className="modal-title">{project.title}</h2>

        {/* Image */}
        <div className="modal-image">
          <img src={project.image} alt={`Aperçu de ${project.title}`} />
        </div>

        {/* Description */}
        <p className="modal-description">{project.description}</p>

        {/* Projet privé / en cours */}
        {project.note && <p className="modal-note">{project.note}</p>}

        {/* Compétences développées */}
        <div className="modal-skills">
          <p>{project.skills}</p>
        </div>

        {/* Date */}
        <div className="modal-date">
          <p>{project.date}</p>
        </div>

        {/* Stack */}
        <div className="modal-stack">
          {project.stack.map((tech, i) => (
            <span key={i} className="stack-tag">{tech}</span>
          ))}
        </div>

        {/* Liens */}
        <div className="project-links">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Voir le site
            </a>
          )}
          {project.code && (
            <a href={project.code} target="_blank" rel="noopener noreferrer">
              Code GitHub
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
