import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageWrapper from "@/components/PageWrapper";
import { isValidGithubUrl } from "@/lib/helpers";

export default function RegisterPage() {
  const [teamName, setTeamName] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [errors, setErrors] = useState<{ teamName?: string; repoUrl?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!teamName.trim()) e.teamName = "Team name is required";
    if (!repoUrl.trim()) e.repoUrl = "Repository URL is required";
    else if (!isValidGithubUrl(repoUrl)) e.repoUrl = "Enter a valid GitHub repository URL";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[70vh]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
            <p className="text-muted-foreground mb-1">
              Team <span className="text-foreground font-semibold">{teamName}</span> has been registered.
            </p>
            <p className="text-muted-foreground text-sm">Your commits will appear on the leaderboard soon.</p>
          </motion.div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-20 max-w-lg">
        <div className="mb-8 text-center">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <GitBranch className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Register Your Team</h1>
          <p className="text-muted-foreground">Link your GitHub repo and start competing.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              id="teamName"
              placeholder="e.g. ByteForce"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            {errors.teamName && (
              <p className="text-destructive text-xs flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {errors.teamName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="repoUrl">GitHub Repository URL</Label>
            <Input
              id="repoUrl"
              placeholder="https://github.com/team/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
            {errors.repoUrl && (
              <p className="text-destructive text-xs flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {errors.repoUrl}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registering..." : "Register Team"}
          </Button>
        </form>
      </div>
    </PageWrapper>
  );
}
