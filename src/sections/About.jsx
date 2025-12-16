import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./About.css";

export default function About() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const pointsRef = useRef([]);
  const pointsToRevealRef = useRef([]);

  const pointSize = 3;
  const interactionRadius = 14;
  const fadeSpeed = 0.15;
  const reappearProbability = 0.13;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "/madou.png";

    let animationFrameId;

    const initCanvas = () => {
      const maxWidth = window.innerWidth * 0.45;
      const maxHeight = window.innerHeight * 0.8;
      let width = img.width;
      let height = img.height;
      const ratio = img.width / img.height;

      if (width > maxWidth) {
        width = maxWidth;
        height = width / ratio;
      }
      if (height > maxHeight) {
        height = maxHeight;
        width = height * ratio;
      }

      canvas.width = Math.floor(width);
      canvas.height = Math.floor(height);

      const cols = Math.floor(canvas.width / pointSize);
      const rows = Math.floor(canvas.height / pointSize);

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = cols;
      tempCanvas.height = rows;
      const tempCtx = tempCanvas.getContext("2d");

      tempCtx.drawImage(img, 0, 0, cols, rows);
      const imgData = tempCtx.getImageData(0, 0, cols, rows);

      const points = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const r = imgData.data[i];
          const g = imgData.data[i + 1];
          const b = imgData.data[i + 2];
          const alpha = imgData.data[i + 3];
          const lum = (0.3 * r + 0.59 * g + 0.11 * b) | 0;

          if (alpha > 20) {
            points.push({
              x: x * pointSize + (canvas.width - cols * pointSize) / 2,
              y: y * pointSize + (canvas.height - rows * pointSize) / 2,
              lum,
              currentAlpha: 0,
            });
          }
        }
      }

      pointsRef.current = points;
      const indices = points.map((_, idx) => idx);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      pointsToRevealRef.current = indices;
    };

    img.onload = initCanvas;
    window.addEventListener("resize", initCanvas);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * canvas.width;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const points = pointsRef.current;
      const pointsToReveal = pointsToRevealRef.current;
      const { x: mouseX, y: mouseY } = mouseRef.current;

      if (!points || !points.length) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (pointsToReveal.length > 0) {
        const revealCount = Math.max(1, Math.ceil(pointsToReveal.length * 0.05));
        for (let k = 0; k < revealCount && pointsToReveal.length > 0; k++) {
          const idx = pointsToReveal.pop();
          points[idx].currentAlpha = 1;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach((point) => {
        const dx = point.x - mouseX;
        const dy = point.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < interactionRadius) point.currentAlpha = 0;
        else if (point.currentAlpha < 1 && Math.random() < reappearProbability)
          point.currentAlpha = Math.min(1, point.currentAlpha + fadeSpeed);

        if (point.currentAlpha > 0.01) {
          ctx.fillStyle = `rgba(${point.lum},${point.lum},${point.lum},${point.currentAlpha})`;
          ctx.fillRect(point.x, point.y, pointSize, pointSize);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          initCanvas();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" className="about">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ amount: 0.9, once: true }}
      >
        À propos
      </motion.h2>

      <motion.div
        className="about-layout"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.3 }}
        viewport={{ amount: 0.6, once: true }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div className="about-text">
          <p>
            Je suis <span className="highlight">Mehdi Hammadou</span>, étudiant en{" "}
            <span className="highlight">informatique</span> passionné par le{" "}
            <span className="highlight">développement web et mobile</span>. J’aime créer des interfaces{" "}
            <span className="highlight">claires</span>, <span className="highlight">fluides</span> et{" "}
            <span className="highlight">agréables à utiliser</span>.
          </p>

          <p>
            De nature <span className="highlight">curieuse</span> et{" "}
            <span className="highlight">motivée</span>, j’apprends en continu et j’aime explorer de nouvelles
            technologies pour progresser.
          </p>

          <p>
            Mon objectif est de devenir un développeur{" "}
            <span className="highlight">polyvalent</span>, capable de concevoir des{" "}
            <span className="highlight">applications</span> et{" "}
            <span className="highlight">sites web</span> fiables, élégants et centrés sur l’utilisateur.
          </p>
        </div>

        <div className="about-divider"></div>

        <div className="about-visual">
          <canvas ref={canvasRef} className="about-canvas"></canvas>
        </div>
      </motion.div>
    </section>
  );
}
