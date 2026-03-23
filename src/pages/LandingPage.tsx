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

export default function LandingPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="relative container mx-auto px-4 py-24 md:py-40 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-6"
          >
            <Zap className="h-3 w-3" />
            Hackathon 2024 is Live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
          >
            Track Your Hackathon
            <br />
            <span className="text-primary text-glow">Commits Live</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Register your team, connect your GitHub repository, and compete on
            the live leaderboard. May the best code win.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="glow-sm text-base font-semibold">
              <Link to="/register">
                Register Your Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link to="/leaderboard">View Leaderboard</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary/30 hover:glow-sm transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
