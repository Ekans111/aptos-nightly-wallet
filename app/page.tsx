import dynamic from "next/dynamic";
import { EnergyProvider } from "@/hooks/EnergyContext";
import { Toaster } from "sonner";

const App = dynamic(() => import("./app"), { ssr: false });
export default function Home() {
  return (
    <EnergyProvider>
      <App />
      <Toaster position='bottom-left' richColors />
    </EnergyProvider>
  );
}
