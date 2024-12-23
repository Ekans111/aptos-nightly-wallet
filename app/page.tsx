import dynamic from "next/dynamic";
import { EnergyProvider } from "@/hooks/EnergyContext";

const App = dynamic(() => import("./app"), { ssr: false });
export default function Home() {
  return (
    <EnergyProvider>
      <App />
    </EnergyProvider>
  );
}
