<h1 align="center">Portfolio de Mehdi Hammadou</h1>

<p align="center">Mon portfolio personnel en React : animations sur canvas, carrousel 3D de projets et formulaire de contact qui fonctionne.</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/EmailJS-1F5FBF?style=for-the-badge&logoColor=white" alt="EmailJS" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <a href="https://portfoliohammadoumehdi.vercel.app/"><img src="https://img.shields.io/badge/D%C3%A9mo_en_ligne-04BBFF?style=for-the-badge&logoColor=white" alt="Démo en ligne" /></a>
</p>

<p align="center"><img src="docs/preview.png" alt="Aperçu du portfolio de Mehdi Hammadou" width="900" /></p>

## À propos

Projet personnel. C'est ma vitrine de développeur : qui je suis, ce que je sais faire, les projets réalisés (perso, école, groupe) et mon parcours.
Une seule page React, sans backend. Le formulaire de contact passe par EmailJS.
Je voulais un site qui me ressemble, avec des animations faites main sur canvas plutôt que des templates.

## Fonctionnalités

- **Preloader animé** : logo « MH » qui apparaît en fondu puis passe en effet glitch avant d'afficher le site.
- **Hero en particules** : canvas de 200 points en mouvement, reliés par des lignes dont l'opacité dépend de la distance. Texte en machine à écrire (typewriter-effect).
- **Portrait interactif** : dans « À propos », ma photo est redessinée en pixels sur un canvas. Les points s'effacent au passage de la souris puis réapparaissent.
- **Navbar intelligente** : défilement fluide vers chaque section, lien actif suivi via `IntersectionObserver`, menu burger sur mobile.
- **Compétences** : trois groupes (langages, web/mobile/BDD, outils) avec les icônes react-icons.
- **Projets en carrousel 3D ou en grille** : 5 cartes visibles en perspective (Framer Motion), navigation infinie, bascule carrousel/grille. Grille forcée sous 768 px.
- **Modale projet** : description, compétences travaillées, date, stack, liens vers le site et le code GitHub quand ils existent.
- **Timeline du parcours** : étapes qui apparaissent au scroll, alternées gauche/droite.
- **Section CV** : bouton qui ouvre le CV en PDF.
- **Formulaire de contact** : envoi via EmailJS, états « envoi en cours », succès et erreur.
- **SEO de base** : balises meta description, Open Graph et Twitter Card dans `index.html`.

## Stack technique

| Côté | Technologies |
| --- | --- |
| Front | React 18, Vite 7, CSS par section |
| Animations | Framer Motion, Canvas 2D API, typewriter-effect |
| Icônes | react-icons |
| Contact | EmailJS (`@emailjs/browser`) |
| Qualité | ESLint 9 (react-hooks, react-refresh) |
| Déploiement | Vercel |

## Architecture

```text
portfolio/
├── public/          # Images des projets, logo, photo et CV en PDF
├── docs/            # Capture d'aperçu du README
└── src/
    ├── App.jsx      # Preloader puis enchaînement des sections
    ├── index.css    # Styles globaux
    └── sections/    # Un composant + un fichier CSS par section
```

- `public/` : tout ce qui est servi tel quel (images des cartes projets, icônes de la timeline, CV).
- `src/sections/` : `Hero`, `About`, `Skills`, `Projects` (+ `ProjectCard`, `ProjectModal`), `Timeline`, `Cv`, `Contact`, `Navbar`, `Preloader`.
- Les données (projets, étapes du parcours) sont des tableaux directement dans les composants.

## Lancer le projet en local

**Prérequis** : Node.js 20.19+ (ou 22.12+, requis par Vite 7) et npm.

```bash
git clone https://github.com/madou752/portfolio.git
cd portfolio
npm install
```

Crée un fichier `.env.local` à la racine pour le formulaire de contact (valeurs à récupérer dans ton compte EmailJS) :

```env
VITE_EMAILJS_SERVICE_ID=ton_service_id
VITE_EMAILJS_TEMPLATE_ID=ton_template_id
VITE_EMAILJS_PUBLIC_KEY=ta_cle_publique
```

Le template EmailJS doit utiliser les champs `from_name`, `from_email` et `message`.
Sans ces variables, le site tourne, mais l'envoi du formulaire affiche une erreur.

```bash
npm run dev       # serveur de dev Vite
npm run build     # build de production dans dist/
npm run preview   # prévisualise le build
npm run lint      # ESLint
```

## Ce que j'ai appris

- **Animer un canvas proprement dans React** : `useRef` pour le contexte, `requestAnimationFrame`, et le nettoyage des listeners et des animations au démontage.
- **Transformer une image en particules** : réduire l'image, lire ses pixels avec `getImageData`, calculer la luminance, puis gérer l'interaction souris point par point.
- **Centrer un carrousel 3D à toutes les résolutions** : j'ai abandonné les décalages en dur pour mesurer la largeur réelle du conteneur et calculer les positions à partir de son centre.
- **Garder les clés hors du code** : les identifiants EmailJS passent par des variables d'environnement Vite (`import.meta.env`).

## Auteur

**Mehdi Hammadou** (Madou)

[Portfolio](https://portfoliohammadoumehdi.vercel.app/) · [GitHub](https://github.com/madou752)
