import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import "./Projects.css";

const projects = [
  {
    title: "Zombicide – Jeu de plateau digitalisé",
    type: "Application Java",
    image: "/zombicide.png",
    description:
      "Projet de groupe consistant à digitaliser le célèbre jeu de plateau Zombicide. Gestion des règles, des personnages, des ennemis, des déplacements et des interactions via une architecture orientée objet robuste.",
    skills:
      "Logique de jeu, architecture orientée objet, collaboration en équipe, modélisation UML.",
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
      "Site vitrine professionnel et entièrement responsive pour une exploitation agricole algérienne. Mise en valeur des produits, de l'identité visuelle et des informations de contact avec un design moderne adapté à la clientèle cible.",
    skills:
      "Intégration web, responsive design, structuration de contenu, SEO de base.",
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
      "Application mobile permettant à une exploitation agricole de gérer ses données internes : suivi de production, gestion du matériel, enregistrement des pannes et gestion des ressources.",
    skills:
      "Flutter, conception de base de données, architecture mobile, UX mobile.",
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
      "Application web complète pour la gestion d'un parc automobile : ajout et suivi des véhicules, interface d'administration et localisation GPS en temps réel. Développement full-stack React + PHP/SQL.",
    skills:
      "React, PHP, SQL, intégration GPS, architecture full-stack, déploiement.",
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
      "Application web réalisée en groupe pour Octobre Rose. Centralise toutes les actions et événements liés à la campagne via une carte interactive, alliant sensibilisation sociale et développement collaboratif.",
    skills:
      "React, Leaflet, gestion d'équipe, UX centrée utilisateur, Git.",
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
      "Portfolio moderne développé en React pour présenter mes projets, compétences et parcours. Animations fluides avec Framer Motion, design responsive et expérience utilisateur soignée.",
    skills:
      "React, Framer Motion, UI/UX, animations front-end, composants réutilisables.",
    date: "Novembre 2025",
    stack: ["React"],
    link: null,
    code: "https://github.com/madou752/portfolio",
  },
  {
    title: "Doums IA – Générateur de prompts",
    type: "Application web",
    image: "/doumsIA.png",
    description:
      "Outil interactif permettant de générer des prompts optimisés pour des intelligences artificielles. Interface épurée développée en JavaScript vanilla, rapide et accessible sans dépendance à un framework.",
    skills:
      "JavaScript, manipulation du DOM, conception UX, déploiement Vercel.",
    date: "2025",
    stack: ["HTML", "CSS", "JavaScript"],
    link: "https://doums-ia.vercel.app/",
    code: "https://github.com/madou752/doumsIA",
  },
  {
    title: "GladiaDOUMS – Jeu de gladiateurs",
    type: "Jeu navigateur (Blazor)",
    image: "/gladiadoums.png",
    description:
      "Jeu de combat de gladiateurs développé avec Blazor WebAssembly. Les joueurs s'affrontent dans une arène avec des personnages aux capacités variées, dans une logique de tour par tour.",
    skills:
      "C#, Blazor WebAssembly, .NET, logique de jeu, composants Razor.",
    date: "2025",
    stack: ["C#", "Blazor", ".NET"],
    link: "https://gladiadoums.vercel.app/",
    code: "https://github.com/madou752/gladiadoums",
  },
  {
    title: "DoumsDeal – Marketplace",
    type: "Application web full-stack",
    image: "/doumsdeal.png",
    description:
      "Plateforme de petites annonces inspirée de LeBonCoin : publication d'annonces, recherche par catégorie et gestion des utilisateurs. Développée en TypeScript pour une base de code robuste et typée.",
    skills:
      "TypeScript, développement full-stack, gestion des utilisateurs, déploiement.",
    date: "2025",
    stack: ["TypeScript"],
    link: "http://78.138.58.85:8080/",
    code: "https://github.com/madou752/doumsdeal",
  },
  {
    title: "PokéDex – Projet Front-End",
    type: "Application web",
    image: "/pokedoums.png",
    description:
      "Application front-end consommant la PokéAPI pour afficher les données des Pokémon : navigation par génération, recherche par nom et affichage des statistiques détaillées.",
    skills:
      "JavaScript, fetch API, manipulation du DOM, design responsive.",
    date: "2025",
    stack: ["HTML", "CSS", "JavaScript"],
    link: "https://front-end-projet-gamma.vercel.app/",
    code: "https://github.com/madou752/front_end_projet",
  },
  {
    title: "Joy Club – Landing Page",
    type: "Site vitrine / Landing page",
    image: "/joy.png",
    description:
      "Landing page réalisée en groupe pour promouvoir une boisson. Design attractif et moderne, axé sur l'impact visuel et la mise en valeur du produit pour capter l'attention des visiteurs.",
    skills:
      "Intégration web, design promotionnel, travail d'équipe, responsive design.",
    date: "2025",
    stack: ["HTML", "CSS", "JavaScript"],
    link: "https://joy-club.vercel.app/",
    code: "https://github.com/celest6667/JoyClub",
  },
];

const mod = (n, m) => ((n % m) + m) % m;

const GLOBAL_OFFSET = 0;
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
  const [viewMode, setViewMode] = useState("carousel");
  const [activeFilter, setActiveFilter] = useState("Tous");

  const allTechs = ["Tous", ...Array.from(new Set(projects.flatMap((p) => p.stack))).sort()];

  const filtered = activeFilter === "Tous"
    ? projects
    : projects.filter((p) => p.stack.includes(activeFilter));

  const total = filtered.length;

  const handleFilter = (tech) => {
    setActiveFilter(tech);
    setCurrentIndex(0);
  };

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) setViewMode("grid");
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

      <div className="tech-filter">
        {allTechs.map((tech) => (
          <button
            key={tech}
            className={`filter-btn ${activeFilter === tech ? "active" : ""}`}
            onClick={() => handleFilter(tech)}
          >
            {tech}
          </button>
        ))}
      </div>

      <div className="view-toggle">
        <button
          className={`toggle-btn ${viewMode === "carousel" ? "active" : ""}`}
          onClick={() => setViewMode("carousel")}
          title="Vue carrousel"
        >
          ◧ Carrousel
        </button>
        <button
          className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
          onClick={() => setViewMode("grid")}
          title="Vue grille"
        >
          ⊞ Grille
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="no-results">Aucun projet pour cette technologie.</p>
      ) : viewMode === "carousel" ? (
        <div className="carousel-static">
          <button className="arrow-btn left" onClick={prev}>❮</button>

          <div className="cards-row">
            {visibleCards.map(({ index, position }) => (
              <motion.div
                key={`${activeFilter}-${index}`}
                className="card-slot"
                initial={getInitialStyle(position)}
                animate={getCardStyle(position)}
                exit={getExitStyle(position)}
              >
                <ProjectCard
                  project={filtered[index]}
                  onOpen={setSelected}
                  isCenter={position === 0}
                />
              </motion.div>
            ))}
          </div>

          <button className="arrow-btn right" onClick={next}>❯</button>
        </div>
      ) : (
        <div className="projects-grid">
          {filtered.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              onOpen={setSelected}
              isCenter={false}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}