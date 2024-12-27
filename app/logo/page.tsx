import { logoSRC } from "@/misc/utils";

export default function page() {
  return (
    <div className="w-full h-screen flex flex-col text-3xl  justify-center items-center">
      <h1>MOON MOVERZ</h1>
      <img src={logoSRC} alt="logo" className="p-10" />
    </div>
  );
}
