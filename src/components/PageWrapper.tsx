import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen pt-16 relative"
    >
      {/* Ambient glow orb */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full animate-glow-pulse-bg"
          style={{ background: "radial-gradient(circle, hsl(145 70% 42% / 0.12) 0%, transparent 70%)" }}
        />
        {/* Horizontal glowing yellow line */}
        <div
          className="absolute h-px w-[30%] animate-glow-line-h"
          style={{
            top: "35%",
            background: "linear-gradient(90deg, transparent, hsl(50 95% 55% / 0.7), hsl(50 95% 55% / 0.9), hsl(50 95% 55% / 0.7), transparent)",
            boxShadow: "0 0 20px 4px hsl(50 95% 55% / 0.4), 0 0 60px 8px hsl(50 95% 55% / 0.2)",
          }}
        />
        {/* Second horizontal line offset */}
        <div
          className="absolute h-px w-[20%] animate-glow-line-h"
          style={{
            top: "68%",
            animationDelay: "2s",
            background: "linear-gradient(90deg, transparent, hsl(50 95% 55% / 0.5), hsl(50 95% 55% / 0.7), hsl(50 95% 55% / 0.5), transparent)",
            boxShadow: "0 0 15px 3px hsl(50 95% 55% / 0.3), 0 0 40px 6px hsl(50 95% 55% / 0.15)",
          }}
        />
        {/* Vertical glowing yellow line */}
        <div
          className="absolute w-px h-[25%] animate-glow-line-v"
          style={{
            left: "75%",
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
