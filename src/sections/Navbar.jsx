import { useEffect, useState } from "react";
import "./NavBar.css";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      setScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);

    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: window.innerWidth < 768 ? 0.2 : 0.35,}
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const offset = section.offsetTop - 80;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <button
        className="nav-logo"
        onClick={() => scrollToSection("hero")}
      >
        Mehdi Hammadou
      </button>

      <ul className="nav-links">
        <li>
          <button
            onClick={() => scrollToSection("about")}
            className={activeSection === "about" ? "active" : ""}
          >
            About
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("projects")}
            className={activeSection === "projects" ? "active" : ""}
          >
            Projects
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("timeline")}
            className={activeSection === "timeline" ? "active" : ""}
          >
            Timeline
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("contact")}
            className={activeSection === "contact" ? "active" : ""}
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
}
