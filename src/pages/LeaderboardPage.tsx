import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, RefreshCw, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/PageWrapper";
import { supabase } from "@/lib/supabaseClient";

// 🔥 Extract owner & repo from GitHub URL
const getRepoDetails = (url: string) => {
  const cleanUrl = url
    .replace("https://github.com/", "")
    .replace(".git", "");

  const parts = cleanUrl.split("/");

  return {
    owner: parts[0],
    repo: parts[1],
  };
};

export default function LeaderboardPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch teams + commits
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

    // 🔥 Fetch commits for each team
    const updatedTeams = await Promise.all(
      data.map(async (team: any) => {
        try {
          const { owner, repo } = getRepoDetails(team.repo_url);

          const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/commits?per_page=100`
          );

          const commitsData = await response.json();

          return {
            ...team,
            commits: Array.isArray(commitsData) ? commitsData.length : 0,
            lastCommitTime:
              commitsData?.[0]?.commit?.author?.date || null,
          };
        } catch (err) {
          console.log(
            `Error fetching commits for ${team.team_name}:`,
            err
          );

          return {
            ...team,
            commits: 0,
            lastCommitTime: null,
          };
        }
      })
    );

    // 🔥 Sort leaderboard
    updatedTeams.sort((a, b) => b.commits - a.commits);

    setTeams(updatedTeams);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // 🔥 Time formatter
  const timeAgo = (date: string) => {
    if (!date) return "No commits";

    const diff = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;

    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-20">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Leaderboard</h1>
          </div>

          <Button onClick={fetchTeams}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* LOADING */}
        {loading ? (
          <p>Loading...</p>
        ) : teams.length === 0 ? (
          <p>No teams registered yet</p>
        ) : (
          <div className="space-y-4">

            {/* TABLE HEADER */}
            <div className="grid grid-cols-4 text-sm font-semibold border-b pb-2">
              <div>Rank</div>
              <div>Team</div>
              <div>Commits</div>
              <div>Last Commit</div>
            </div>

            {/* TEAMS */}
            {teams.map((team, i) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-4 items-center border p-4 rounded-lg"
              >
                <div>#{i + 1}</div>

                <div>
                  <p className="font-semibold">{team.team_name}</p>
                  <a
                    href={team.repo_url}
                    target="_blank"
                    className="text-xs flex items-center gap-1"
                  >
                    {team.repo_url}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>{team.commits} commits</div>

                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {timeAgo(team.lastCommitTime)}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}