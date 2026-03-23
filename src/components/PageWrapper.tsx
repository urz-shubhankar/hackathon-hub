import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars: { x: number; y: number; r: number; alpha: number; speed: number; phase: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.4 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const flicker = Math.sin(t * 0.001 * s.speed + s.phase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(145, 60%, 65%, ${s.alpha * flicker})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen pt-16 relative"
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {/* Star field */}
        <StarField />

        {/* Ambient glow orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full animate-glow-pulse-bg"
          style={{ background: "radial-gradient(circle, hsl(145 70% 42% / 0.12) 0%, transparent 70%)" }}
        />

        {/* Horizontal line – top area */}
        <div
          className="absolute h-px w-[30%] animate-glow-line-h"
          style={{
            top: "12%",
            background: "linear-gradient(90deg, transparent, hsl(50 95% 55% / 0.7), hsl(50 95% 55% / 0.9), hsl(50 95% 55% / 0.7), transparent)",
            boxShadow: "0 0 20px 4px hsl(50 95% 55% / 0.4), 0 0 60px 8px hsl(50 95% 55% / 0.2)",
          }}
        />
        {/* Horizontal line – bottom area */}
        <div
          className="absolute h-px w-[20%] animate-glow-line-h"
          style={{
            top: "88%",
            animationDelay: "2s",
            background: "linear-gradient(90deg, transparent, hsl(50 95% 55% / 0.5), hsl(50 95% 55% / 0.7), hsl(50 95% 55% / 0.5), transparent)",
            boxShadow: "0 0 15px 3px hsl(50 95% 55% / 0.3), 0 0 40px 6px hsl(50 95% 55% / 0.15)",
          }}
        />
        {/* Vertical line – far left */}
        <div
          className="absolute w-px h-[25%] animate-glow-line-v"
          style={{
            left: "8%",
            animationDelay: "1s",
            background: "linear-gradient(180deg, transparent, hsl(50 95% 55% / 0.6), hsl(50 95% 55% / 0.8), hsl(50 95% 55% / 0.6), transparent)",
            boxShadow: "0 0 18px 4px hsl(50 95% 55% / 0.35), 0 0 50px 8px hsl(50 95% 55% / 0.18)",
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.main>
  );
}
