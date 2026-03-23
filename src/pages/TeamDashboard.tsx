import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { GitBranch, ExternalLink, GitCommit, Clock } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { mockTeams } from "@/lib/mock-data";
import { timeAgo } from "@/lib/helpers";

export default function TeamDashboard() {
  const { teamId } = useParams();
  const team = mockTeams.find((t) => t.id === teamId) || mockTeams[0];

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-20 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-card p-6 md:p-8 mb-6"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{team.name}</h1>
              <a
                href={team.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors"
              >
                <GitBranch className="h-3.5 w-3.5" />
                {team.repoUrl.replace("https://github.com/", "")}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="text-right">
              <p className="font-mono text-3xl font-bold text-primary">{team.commits}</p>
              <p className="text-muted-foreground text-xs">total commits</p>
            </div>
          </div>
        </motion.div>

        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <GitCommit className="h-4 w-4 text-primary" />
          Recent Commits
        </h2>

        <div className="space-y-2">
          {team.recentCommits.map((commit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-lg border border-border bg-card p-4 hover:border-primary/20 transition-colors"
            >
              <p className="text-sm font-medium font-mono mb-1">{commit.message}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="text-primary">{commit.author}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {timeAgo(commit.timestamp)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
