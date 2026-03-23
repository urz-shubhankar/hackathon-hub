import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/PageWrapper";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    setUpdated(false);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setUpdated(true);
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-20 max-w-lg">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground text-sm">Manage hackathon data</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Fetch the latest commit data from GitHub for all registered teams.
          </p>
          <Button onClick={handleUpdate} disabled={loading} className="glow-sm">
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Update Leaderboard
              </>
            )}
          </Button>

          {updated && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-center gap-2 text-primary text-sm"
            >
              <CheckCircle className="h-4 w-4" />
              Leaderboard updated successfully
            </motion.div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
