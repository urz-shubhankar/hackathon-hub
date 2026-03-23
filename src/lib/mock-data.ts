export interface Team {
  id: string;
  name: string;
  repoUrl: string;
  commits: number;
  lastCommitTime: string;
  recentCommits: { message: string; timestamp: string; author: string }[];
}

export const mockTeams: Team[] = [
  {
    id: "1",
    name: "ByteForce",
    repoUrl: "https://github.com/byteforce/hack-project",
    commits: 87,
    lastCommitTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    recentCommits: [
      { message: "feat: add real-time notifications", timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), author: "alice" },
      { message: "fix: resolve auth token refresh", timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), author: "bob" },
      { message: "style: update dashboard layout", timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), author: "alice" },
    ],
  },
  {
    id: "2",
    name: "NullPointers",
    repoUrl: "https://github.com/nullpointers/hackathon-app",
    commits: 72,
    lastCommitTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    recentCommits: [
      { message: "feat: implement search functionality", timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), author: "carol" },
      { message: "refactor: optimize database queries", timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), author: "dave" },
    ],
  },
  {
    id: "3",
    name: "CodeCrushers",
    repoUrl: "https://github.com/codecrushers/project-x",
    commits: 65,
    lastCommitTime: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    recentCommits: [
      { message: "feat: add payment integration", timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), author: "eve" },
      { message: "docs: update README", timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), author: "frank" },
    ],
  },
  {
    id: "4",
    name: "PixelPioneers",
    repoUrl: "https://github.com/pixelpioneers/webapp",
    commits: 53,
    lastCommitTime: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    recentCommits: [
      { message: "feat: responsive design overhaul", timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), author: "grace" },
    ],
  },
  {
    id: "5",
    name: "StackOverflowers",
    repoUrl: "https://github.com/stackoverflowers/hack2024",
    commits: 41,
    lastCommitTime: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    recentCommits: [
      { message: "fix: resolve CORS issues", timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), author: "hank" },
    ],
  },
];
