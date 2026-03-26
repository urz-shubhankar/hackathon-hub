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

  // ✅ ADD HERE
  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

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
    <div className="container mx-auto px-4 py-10 max-w-6xl">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          🏆 Leaderboard
        </h1>

        <button
          onClick={fetchTeams}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-black font-semibold transition"
        >
          Refresh
        </button>
      </div>

      {/* SUBTEXT */}
      <p className="text-sm text-gray-400 mb-8">
        Live ranking based on GitHub commits 🚀
      </p>

      {/* CONTENT */}
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : teams.length === 0 ? (
        <p className="text-center text-gray-400">
          No teams registered yet
        </p>
      ) : (
        <div className="space-y-6">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-4 text-sm text-gray-400 px-4">
            <div>Rank</div>
            <div>Team</div>
            <div className="text-center">Commits</div>
            <div className="text-right">Last Commit</div>
          </div>

          {/* TEAMS */}
          {teams.map((team, i) => (
            <div
              key={team.id}
              className={`grid grid-cols-4 items-center bg-[#0f172a]/40 backdrop-blur-md rounded-xl px-4 py-5 border transition-all
                ${
                  i === 0
                    ? "border-yellow-400 shadow-lg shadow-yellow-500/30"

                    : i===1?"border-green-400 shadow-lg shadow-green-500/20"
                    : i===2?"border-orange-400 shadow-lg shadow-red-500/20"
                    : "border-gray-700 hover:border-gray-500"
                }`}
            >
              {/* RANK */}
              <div className="font-semibold text-lg">
                {getRankIcon(i + 1)}
              </div>

              {/* TEAM */}
              <div>
                <p className="font-semibold">
                  {team.team_name}
                </p>
                <p className="text-xs text-gray-400">
                  Private Repository 🔒
                </p>
              </div>

              {/* COMMITS */}
              <div className="text-center">
                <p className="text-xl font-bold text-green-400">
                  {team.commits}
                </p>
                <p className="text-xs text-gray-400">commits</p>
              </div>

              {/* LAST COMMIT */}
              <div className="text-right text-sm text-gray-400">
                {team.lastCommitTime
                  ? timeAgo(team.lastCommitTime)
                  : "Just now"}
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  </PageWrapper>
);}