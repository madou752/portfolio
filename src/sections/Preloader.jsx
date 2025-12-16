import { useEffect, useState } from "react";
import "./Preloader.css";

export default function Preloader({onFinish}) {
  const [hide, setHide] = useState(false);
  const [startGlitch, setStartGlitch] = useState(false);

  useEffect(() => {
    // fade-in immédiat
    const fadeTimer = setTimeout(() => {
      document.querySelector(".mh-text").classList.add("visible");
    }, 10);

    // glitch après 2s
    const glitchTimer = setTimeout(() => setStartGlitch(true), 2000);

    // disparition du préloader à 6s
    const hideTimer = setTimeout(() => {
      setHide(true)
      if(onFinish) {
        onFinish();
      }
    }, 3250);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(glitchTimer);
      clearTimeout(hideTimer);
    };
  }, [onFinish]);

  return (
    <div className={`preloader ${hide ? "preloader--hide" : ""}`}>
      <h1
        className={`mh-text ${startGlitch ? "glitch" : ""}`}
        data-text="MH"
      >
        MH
      </h1>
    </div>
  );
}