import {
  SiTypescript,
  SiJavascript,
  SiKotlin,
  SiPython,
  SiPhp,
  SiReact,
  SiVuedotjs,
  SiHtml5,
  SiFlutter,
  SiNodedotjs,
  SiSpringboot,
  SiDotnet,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiVercel,
  SiLinux
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { BiLogoVisualStudio, BiLogoJava } from "react-icons/bi";
import "./Skills.css";

function SkillRow({ icon: Icon, svg, title, text }) {
  return (
    <div className="skill-row">
      <div className="skill-icon">
        {Icon && <Icon />}
        {svg && <img src={svg} alt={title} />}
      </div>

      <div className="skill-content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-title">Compétences</h2>

      <h3 className="skills-group-title">Langages</h3>
      <div className="skills-grid">
        <SkillRow icon={SiTypescript} title="TypeScript" text="Code typé et robuste, front comme back." />
        <SkillRow icon={SiJavascript} title="JavaScript" text="Logique front-end, DOM, API." />
        <SkillRow icon={BiLogoJava} title="Java" text="Programmation orientée objet et algorithmie." />
        <SkillRow icon={SiKotlin} title="Kotlin" text="Langage moderne pour la JVM et Android." />
        <SkillRow icon={TbBrandCSharp} title="C#" text="Jeux et applications .NET." />
        <SkillRow icon={SiPython} title="Python" text="Scripts, automatisation, assistant vocal." />
        <SkillRow icon={SiPhp} title="PHP" text="Back-end et thèmes WordPress." />
      </div>

      <h3 className="skills-group-title">Front-end & Mobile</h3>
      <div className="skills-grid">
        <SkillRow icon={SiReact} title="React" text="Interfaces dynamiques, Redux, animations." />
        <SkillRow icon={SiVuedotjs} title="Vue.js" text="Composants réactifs et applications web." />
        <SkillRow icon={SiHtml5} title="HTML / CSS" text="Intégration, responsive design, Tailwind." />
        <SkillRow icon={SiFlutter} title="Flutter" text="Applications mobiles cross-platform." />
      </div>

      <h3 className="skills-group-title">Back-end & Bases de données</h3>
      <div className="skills-grid">
        <SkillRow icon={SiNodedotjs} title="Node.js / Express" text="API REST, authentification, upload." />
        <SkillRow icon={SiSpringboot} title="Spring Boot" text="API Java structurées et testables." />
        <SkillRow icon={SiDotnet} title=".NET / Blazor" text="Applications web en C# côté client." />
        <SkillRow icon={SiPostgresql} title="SQL" text="PostgreSQL, MySQL, Prisma, jointures." />
        <SkillRow icon={SiMongodb} title="MongoDB" text="Bases NoSQL, Atlas." />
      </div>

      <h3 className="skills-group-title">Outils & Environnement</h3>
      <div className="skills-grid">
        <SkillRow icon={SiGit} title="Git" text="Versioning propre, branches, workflow pro." />
        <SkillRow icon={SiGithub} title="GitHub / GitLab" text="Collaboration, revues, CI/CD." />
        <SkillRow icon={SiVercel} title="Vercel" text="Déploiement continu de mes projets." />
        <SkillRow icon={SiLinux} title="Linux" text="Serveurs, terminal, environnement dev." />
        <SkillRow icon={BiLogoVisualStudio} title="VS Code" text="Environnement de développement principal." />
      </div>
    </section>
  );
}
