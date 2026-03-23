import { GitBranch } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <GitBranch className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">HackTrack</span>
          <span>— Hackathon Management System</span>
        </div>
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} HackTrack. Built for hackers, by hackers.
        </p>
      </div>
    </footer>
  );
}
