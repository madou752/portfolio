import {
  SiJavascript,
  SiPython,
  SiPhp,
  SiHtml5,
  SiFlutter,
  SiMysql,
  SiGit,
  SiGithub,
  SiGitlab,
  SiLinux
} from "react-icons/si";

import { BiLogoVisualStudio } from "react-icons/bi";
import { BiLogoJava } from "react-icons/bi";
import { BiCodeBlock } from "react-icons/bi";
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
    <section id=""className="skills-section">
      <h2 className="skills-title">Compétences</h2>

      {/* Groupe 1 */}
      <h3 className="skills-group-title">Développement & Langages</h3>
      <div className="skills-grid">
        <SkillRow icon={BiLogoJava} title="Java" text="Développement orienté objet et algorithmie." />
        <SkillRow icon={SiJavascript} title="JavaScript" text="Logique front-end, DOM, React." />
        <SkillRow icon={SiPython} title="Python" text="Scripts, automatisation, algorithmie." />
        <SkillRow icon={SiPhp} title="PHP" text="Développement web côté serveur." />
        <SkillRow icon={BiCodeBlock} title="Algorithmie" text="Résolution de problèmes et structures de données." />
      </div>

      {/* Groupe 2 */}
      <h3 className="skills-group-title">Web, Mobile & Base de données</h3>
      <div className="skills-grid">
        <SkillRow icon={SiHtml5} title="HTML / CSS" text="Intégration, responsive design, animations UI." />
        <SkillRow icon={SiFlutter} title="Flutter" text="Développement mobile cross‑platform." />
        <SkillRow icon={SiMysql} title="SQL" text="Requêtes, jointures, gestion de données." />
      </div>

      {/* Groupe 3 */}
      <h3 className="skills-group-title">Outils & Environnement</h3>
      <div className="skills-grid">
        <SkillRow icon={SiGit} title="Git" text="Versioning propre, branches, workflow pro." />
        <SkillRow icon={SiGithub} title="GitHub" text="Collaboration, gestion de projets." />
        <SkillRow icon={SiGitlab} title="GitLab" text="CI/CD basique, gestion de dépôts." />
        <SkillRow icon={SiLinux} title="Linux" text="Commandes essentielles et environnement dev." />
        <SkillRow icon={BiLogoVisualStudio} title="VS Code" text="Environnement de développement principal." />
      </div>
    </section>
  );
}
