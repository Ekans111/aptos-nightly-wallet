import dynamic from "next/dynamic";
import Loading from "@/component/page/Loading";

const App = dynamic(() => import("./app"), { 
  ssr: false,
  loading: () => <Loading />,
});
export default function Home() {
  return <App />;
}
