import { motion, useScroll, useSpring } from "framer-motion";
import "./Timeline.css";

export default function Timeline() {
    const steps = [
        {
            center: true,
            title: "Début de mon parcours",
            description:
                "Tout est parti de ma passion pour les jeux vidéo et l’envie de comprendre comment un jeu était pensé, conçu et développé.",
        },
        {
            year: "Avant 2018",
            title: "Découverte de l'informatique",
            description:
                "Avant toute formation, je m’initie au code grâce à Scratch puis Python. Je découvre la logique de programmation et je crée mes premiers petits projets.",
            icon: "/pc.jpg",
        },
        {
            year: "2021-2022",
            title: "Licence MIASHS",
            description:
                "Je débute mes études supérieures en MIASHS. J’y étudie les mathématiques, l’économie et l’informatique, ce qui me donne des bases solides et polyvalentes.",
            icon: "/univ.png",
        },
        {
            year: "2022-2024",
            title: "L2 Informatique",
            description:
                "Je me spécialise davantage dans l’informatique : algorithmique, développement, fondamentaux du code… Je confirme ma passion pour ce domaine.",
            icon: "/code.jpg",
        },
        {
            year: "2025-2026",
            title: "École & Alternance",
            description:
                "Je rejoins une école orientée développement web en alternance. Je me professionnalise et j’apprends à créer des applications modernes et efficaces.",
            icon: "/web.png",
        },
        {
            center: true,
            year: "Objectif",
            title: "Développeur polyvalent",
            description:
                "Mon ambition est de devenir un développeur complet capable de concevoir des projets utiles, clairs et élégants.",
        },
    ];


    return (
        <section id="timeline" className="timeline">
            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ amount: 0.6, once: true }}
            >
                Mon parcours
            </motion.h2>

            <div className="timeline-container">
                <div className="timeline-line" />

                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className={`timeline-step ${step.center ? "center-step" : ""}`}
                        initial={{ opacity: 0, x: step.center ? 0 : index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ amount: 0.5, once: true }}
                    >
                        {step.icon && (
                            <div className="timeline-icon-wrapper">
                                <img src={step.icon} alt="" className="timeline-icon" />
                            </div>
                        )}
                        <div className="timeline-content">
                            <span className="timeline-year">{step.year}</span>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    </motion.div>
                ))}

            </div>
        </section>
    );
}
