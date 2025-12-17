import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { AnimatePresence, motion } from "framer-motion";
import "./Projects.css";

const projects = [
  {
    title: "Zombicide – Jeu de plateau digitalisé",
    type: "Application Java",
    image: "/zombicide.png",
    description:
      "Projet de groupe visant à digitaliser le jeu de plateau Zombicide. Le développement inclut la gestion des règles, des personnages, des ennemis et des interactions, avec une architecture orientée objet claire et évolutive.",
    skills:
      "Logique informatique, architecture orientée objet, travail en équipe, modélisation des entités.",
    date: "Mai 2023",
    stack: ["Java"],
    link: null,
    code: null,
  },
  {
    title: "Algérie Desert Agro",
    type: "Site vitrine",
    image: "/ada.png",
    description:
      "Site vitrine moderne et responsive destiné à présenter l’activité d’une exploitation agricole, ses produits et son identité visuelle.",
    skills:
      "Intégration web, responsive design, structuration de contenu, cohérence visuelle.",
    date: "Juillet 2023",
    stack: ["HTML", "CSS", "JavaScript"],
    link: "https://ada-dz.com",
    code: null,
  },
  {
    title: "Application de Gestion Agricole",
    type: "Application mobile",
    image: "/ada_app.png",
    description:
      "Application mobile en cours de développement permettant de gérer les données internes d’une ferme : production, matériel, pannes et ressources.",
    skills:
      "Flutter, conception de base de données, architecture mobile, structuration des données.",
    date: "Juin 2024",
    stack: ["Flutter", "SQL"],
    link: null,
    code: null,
  },
  {
    title: "Site de Gestion de Voitures",
    type: "Application web",
    image: "/agl.png",
    description:
      "Application web professionnelle permettant la gestion d’un parc automobile : ajout de véhicules, gestion des données et localisation via GPS.",
    skills:
      "React, PHP, SQL, intégration de données GPS, développement full-stack.",
    date: "Septembre 2025",
    stack: ["PHP", "SQL", "React"],
    link: null,
    code: null,
  },
  {
    title: "Projet Fil Rouge – RoseMap",
    type: "Application web",
    image: "/rosemap.png",
    description:
      "Projet de groupe réalisé pour Octobre Rose. L’application regroupe toutes les actions liées à l’événement via une carte interactive.",
    skills:
      "React, collaboration avec designers, gestion d’équipe, UX centrée utilisateur.",
    date: "Novembre 2025",
    stack: ["React"],
    link: null,
    code: "https://github.com/yanisberthaud/rose-map",
  },
  {
    title: "Portfolio Personnel",
    type: "Application web",
    image: "/portefolio.png",
    description:
      "Portfolio moderne développé en React pour présenter mes projets, compétences et expériences avec un design soigné et des animations fluides.",
    skills:
      "React, UI/UX, animations front-end, structuration de composants.",
    date: "Novembre 2025",
    stack: ["React"],
    link: null,
    code: "https://github.com/madou752/portfolio",
  },
];

const mod = (n, m) => ((n % m) + m) % m;

const GLOBAL_OFFSET = -200;
const GLOBAL_Y_OFFSET = -240;

function getInitialStyle(position) {
  const final = getCardStyle(position);

  return {
    x: final.x,
    y: final.y + 40,
    z: final.z - 40,
    rotateY: final.rotateY,
    opacity: 0,
  };
}

function getExitStyle(position) {
  const final = getCardStyle(position);

  return {
    x: final.x,
    y: final.y - 40,
    z: final.z + 40,
    rotateY: final.rotateY,
    opacity: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  };
}


function getCardStyle(position) {
  const base = {
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  switch (position) {
    case 0:
      return {
        ...base,
        x: GLOBAL_OFFSET + 0,
        y: GLOBAL_Y_OFFSET + 0,
        z: 0,
        rotateY: 0,
        opacity: 1,
        width: 420,
        height: 520,
        zIndex: 5,
      };

    case 1:
      return {
        ...base,
        x: GLOBAL_OFFSET + 330,
        y: GLOBAL_Y_OFFSET + 20,
        z: -80,
        rotateY: 12,
        opacity: 0.75,
        width: 360,
        height: 440,
        zIndex: 4,
      };

    case -1:
      return {
        ...base,
        x: GLOBAL_OFFSET - 270,
        y: GLOBAL_Y_OFFSET + 20,
        z: -80,
        rotateY: -12,
        opacity: 0.75,
        width: 360,
        height: 440,
        zIndex: 4,
      };

    case 2:
      return {
        ...base,
        x: GLOBAL_OFFSET + 600,
        y: GLOBAL_Y_OFFSET + 40,
        z: -160,
        rotateY: 20,
        opacity: 0.45,
        width: 300,
        height: 380,
        zIndex: 3,
      };

    case -2:
      return {
        ...base,
        x: GLOBAL_OFFSET - 470,
        y: GLOBAL_Y_OFFSET + 40,
        z: -160,
        rotateY: -20,
        opacity: 0.45,
        width: 300,
        height: 380,
        zIndex: 3,
      };

    default:
      return base;
  }
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = projects.length;

  const visibleCards = [
    { index: mod(currentIndex - 2, total), position: -2 },
    { index: mod(currentIndex - 1, total), position: -1 },
    { index: mod(currentIndex, total), position: 0 },
    { index: mod(currentIndex + 1, total), position: 1 },
    { index: mod(currentIndex + 2, total), position: 2 },
  ];

  const next = () => setCurrentIndex((i) => i + 1);
  const prev = () => setCurrentIndex((i) => i - 1);

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Mes projets</h2>

      <div className="carousel-static">
        <button className="arrow-btn left" onClick={prev}>❮</button>

        <div className="cards-row">
          {visibleCards.map(({ index, position }) => (
            <motion.div
              key={index}
              className="card-slot"
              initial={getInitialStyle(position)}
              animate={getCardStyle(position)}
              exit={getExitStyle(position)}
            >
              <ProjectCard
                project={projects[index]}
                onOpen={setSelected}
                isCenter={position === 0}
              />
            </motion.div>
          ))}
        </div>

        <button className="arrow-btn right" onClick={next}>❯</button>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}