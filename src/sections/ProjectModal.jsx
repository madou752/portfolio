import { motion } from "framer-motion";

export default function ProjectModal({ project, onClose }) {
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
      >
        {/* Bouton fermer */}
        <button className="close-btn" onClick={onClose}>✕</button>

        {/* Titre */}
        <h2 className="modal-title">{project.title}</h2>

        {/* Image */}
        <div className="modal-image">
          <img src={project.image} alt={project.title} />
        </div>

        {/* Description */}
        <p className="modal-description">{project.description}</p>

        {/* Tags */}
        <div className="project-tags">
          {project.stack.map((tech, i) => (
            <span key={i}>{tech}</span>
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
