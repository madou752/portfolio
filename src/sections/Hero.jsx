import { useEffect, useRef} from "react";
import Typewriter from "typewriter-effect";
import "./Hero.css";

export default function Hero() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const POINTS_COUNT = 200;
    const MAX_DISTANCE = 120;
    const SPEED = 0.65;

    const points = [];
    for (let i = 0; i < POINTS_COUNT; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.25) * SPEED,
        vy: (Math.random() - 0.25) * SPEED,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        const MAX_SPEED = 1.15;

        p.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, p.vx));
        p.vy = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, p.vy));

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;
      });

      for (let i = 0; i < POINTS_COUNT; i++) {
        for (let j = i + 1; j < POINTS_COUNT; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DISTANCE) {
            ctx.strokeStyle = `rgba(4,187,255,${1 - dist / MAX_DISTANCE})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      points.forEach((p) => {
        ctx.fillStyle = "rgba(4,187,255,0.8)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero-bg-canvas"></canvas>
      <div className="hero-text-wrapper">
        <div className="hero-text-wrapper">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(300)
                    .typeString(
                      `Salut, je suis <span style="color:#04bbff">Mehdi</span>,<br/>mais on m’appelle <span style="color:#04bbff">Madou</span>`
                    )
                    .callFunction(() => {
                      document.querySelector(".Typewriter__cursor").style.display = "none";
                    })
                    .start();
                }}
                options={{
                  delay: 35,
                  html: true,
                  cursor: "",
                }}
              />
            </div>
            <div style={{opacity: 0.85}}>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(4000)
                    .typeString(
                      `Développeur Web & Logiciel`
                    )
                    .callFunction(() => {
                      document.querySelectorAll(".Typewriter__cursor")[1].style.display = "none";
                    })
                    .start();
                }}
              options={{
                delay: 25,
                cursor: "",
              }}
              />
            </div>
            <div className="scroll-down-arrow"></div>
      </div>
    </section>
  );
}
