// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ProjectCard({ project, onOpen, isCenter }) {
  return (
    <motion.div
      className={`card-inner ${isCenter ? "center-card" : ""}`}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Voir le détail du projet ${project.title}`}
      whileHover={isCenter ? { scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      <div className="project-image">
        <img src={project.image} alt={`Aperçu de ${project.title}`} loading="lazy" />
      </div>

      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.type}</p>

        <div className="project-tags">
          {project.stack.map((tech, i) => (
            <span key={i}>{tech}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
