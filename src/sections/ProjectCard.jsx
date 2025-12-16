import { motion } from "framer-motion";

export default function ProjectCard({ project, onOpen, isCenter }) {
  return (
    <motion.div
      className={`card-inner ${isCenter ? "center-card" : ""}`}
      onClick={() => onOpen(project)}
      whileHover={isCenter ? { scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      <div className="project-image">
        <img src={project.image} alt={project.title} />
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
