import { motion } from "framer-motion";
import "./Cv.css";

export default function Cv() {
  return (
    <section className="cv-section">
      <motion.div
        className="cv-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2>Découvre mon CV</h2>
        <p>Tu veux en savoir plus sur mon parcours, mes compétences et mes expériences ?</p>

        <motion.a
          href="/CV Hammadou Mehdi.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="cv-button"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Cliquez ici
        </motion.a>
      </motion.div>
    </section>
  );
}
