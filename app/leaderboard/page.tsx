import Loading from "@/component/page/Loading";
import dynamic from "next/dynamic";

const Leaderboard = dynamic(() => import("@/component/page/Leaderboard"), {
  ssr: false,
  loading: () => <Loading />,
});
export default function LeaderboardPage() {
  return <Leaderboard />;
}
