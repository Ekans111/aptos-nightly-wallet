import dynamic from "next/dynamic";

const Leaderboard = dynamic(() => import("@/component/page/Leaderboard"), { ssr: false });
export default function LeaderboardPage() {
  return <Leaderboard />;
}
