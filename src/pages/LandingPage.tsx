import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Users, GitBranch, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/PageWrapper";

const features = [
  { icon: Users, title: "Team Registration", desc: "Register your team and link your GitHub repo in seconds." },
  { icon: Trophy, title: "Live Leaderboard", desc: "Track commit activity in real-time with a ranked leaderboard." },
  { icon: GitBranch, title: "Commit Tracking", desc: "Monitor every push, merge, and contribution automatically." },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function LandingPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-radial" />

        {/* Animated vertical scan lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "100vh", opacity: [0, 0.4, 0.4, 0] }}
              transition={{ duration: 2.5, delay: 0.5 + i * 0.8, ease: "easeInOut" }}
              className="absolute w-px bg-primary/30"
              style={{ left: `${25 + i * 25}%`, height: "100%" }}
            />
          ))}
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative container mx-auto px-4 py-24 md:py-40 text-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-6"
          >
            <Zap className="h-3 w-3" />
            Hackathon 2024 is Live
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
          >
            Track Your Hackathon
            <br />
            <span className="text-primary text-glow">Commits Live</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Register your team, connect your GitHub repository, and compete on
            the live leaderboard. May the best code win.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="glow-md text-base font-semibold">
              <Link to="/register">
                Register Your Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base border-glow">
              <Link to="/leaderboard">View Leaderboard</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary/30 hover:glow-sm transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </PageWrapper>
  );
}
