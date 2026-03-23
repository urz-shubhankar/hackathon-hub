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
      </div>
      <div className="relative z-10">{children}</div>
    </motion.main>
  );
}
