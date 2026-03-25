import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, RefreshCw, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/PageWrapper";
// import { mockTeams, Team } from "@/lib/mock-data";
import { timeAgo } from "@/lib/helpers";
import { supabase } from "@/lib/supabaseClient";

// Repo related
const getRepoDetails = (url) => {
  const cleanUrl = url
    .replace("https://github.com/", "")
    .replace(".git", ""); // 🔥 remove .git

  const parts = cleanUrl.split("/");

  return {
    owner: parts[0],
    repo: parts[1],
  };
};


export default function LeaderboardPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("teams")
      .select("*");

      if (error) {
        console.log(error);
        setLoading(false);
        return;
      } 
       // fetch commits for each team
       const updatedTeams = await Promise.all(
        data.map(async (team) => {
          try{
            const { owner, repo } = getRepoDetails(team.repo_url);
            const response = await fetch(
              `https://api.github.com/repos/${owner}/${repo}/commits`
            );
            const commits = await response.json();
            return {
              ...team,
              commits:Array.isArray(commits) ? commits.length : 0,
              lastCommitTime:commits?.[0]?.commit?.author?.date || null,
            };
          }catch(err){
            console.log(`Error fetching commits for ${team.team_name}:`, err);
            return {
              ...team,
              commits: 0,
              lastCommitTime: null,
            };
          }
        })
      );
          // sort leaderboard
          updatedTeams.sort((a, b) => b.commits - a.commits);

         setTeams(updatedTeams);
         setLoading(false);
      };


  useEffect(() => {
    fetchTeams();
  }, []);

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "text-primary font-bold text-lg";
    if (rank === 2) return "text-foreground font-semibold";
    if (rank === 3) return "text-foreground font-semibold";
    return "text-muted-foreground";
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Leaderboard</h1>
            </div>
            <p className="text-muted-foreground text-sm">Ranked by total commits</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchTeams} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 rounded-lg bg-card animate-pulse border border-border" />
            ))}
          </div>
        ) : teams.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Trophy className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No teams registered yet</p>
            <p className="text-sm">Be the first to register!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Team</div>
              <div className="col-span-3 text-center">Commits</div>
              <div className="col-span-4 text-right">Last Commit</div>
            </div>

            {teams.map((team, i) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center rounded-lg border bg-card p-4 hover:border-primary/20 transition-colors ${
                  i === 0 ? "border-primary/30 glow-sm" : "border-border"
                }`}
              >
                <div className="md:col-span-1">
                  <span className={getRankStyle(i + 1)}>{getRankBadge(i + 1)}</span>
                </div>
                <div className="md:col-span-4">
                  <p className="font-semibold">{team.team_name}</p>
                  <a
                    href={team.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors"
                  >
                    {team.repo_url.replace("https://github.com/", "")}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="md:col-span-3 md:text-center">
                  <span className="font-mono text-lg font-bold text-primary">{0}</span>
                  <span className="text-muted-foreground text-xs ml-1">commits</span>
                </div>
                <div className="md:col-span-4 md:text-right flex items-center md:justify-end gap-1 text-muted-foreground text-sm">
                  <Clock className="h-3 w-3" />
                  "Just now"
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
