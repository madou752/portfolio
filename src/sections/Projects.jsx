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
      "Projet Java visant à digitaliser le jeu Zombicide, avec la mise en place des règles de jeu, la gestion des personnages et des ennemis, et une architecture orientée objet favorisant la lisibilité et l’évolutivité du code.",
    stack: ["Java"],
  },
  {
    title: "Algérie Desert Agro",
    type: "Site vitrine",
    image: "/ada.png",
    description:
      "Site vitrine développé pour une exploitation agricole, avec pour objectif de présenter l’activité, la production et l’identité de la ferme à travers une interface responsive et accessible.",

    stack: ["HTML", "CSS", "JavaScript"],
    link: "https://ada-dz.com",
  },
  {
    title: "Application de Gestion Agricole",
    type: "Application mobile",
    image: "/ada_app.png",
    description:
      "Application mobile en cours de développement visant à centraliser et structurer les données d’une ferme agricole, avec une réflexion sur la gestion des informations et l’expérience utilisateur mobile.",

    stack: ["Flutter", "SQL"],
  },
  {
    title: "Site de Gestion de Voitures",
    type: "Application web",
    image: "/agl.png",
    description:
      "Application web permettant la gestion d’un parc automobile, développée pour mettre en pratique la gestion des données, les interactions utilisateur et l’utilisation d’une base de données relationnelle.",

    stack: ["PHP", "SQL", "React"],
  },
  {
    title: "Projet Fil Rouge – RoseMap",
    type: "Application web",
    image: "/rosemap.png",
    description:
      "Projet fil rouge réalisé en équipe, consistant à développer une application web interactive basée sur une carte dynamique, avec un accent particulier sur la collaboration, l’organisation du code et l’expérience utilisateur.",

    stack: ["React"],
    code: "https://github.com/yanisberthaud/rose-map",
  },
  {
    title: "Portfolio Personnel",
    type: "Application web",
    image: "/portefolio.png",
    description:
      "Portfolio personnel développé en React afin de présenter mes projets et compétences techniques, tout en mettant en pratique le design d’interface, la structuration des composants et les bonnes pratiques du développement front-end.",

    stack: ["React"],
    code : "https://github.com/madou752/portfolio",
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