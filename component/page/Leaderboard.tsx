"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTimer, formatTime } from "@/hooks/TimerContext";

export default function Leaderboard() {
  const { time, resetTimer } = useTimer();

  const router = useRouter();
  const [isClaimed, setIsClaimed] = React.useState<boolean>(false);
  const handleCount = () => {
    if (isClaimed) {
      toast.error("You have already claimed this reward.");
      return;
    }
    setIsClaimed(true);
    resetTimer();
    toast.success("Your reward has been claimed");
  };

  React.useEffect(() => {
    if (time <= 0 && isClaimed) {
      setIsClaimed(false);
      toast.success("You are avaliable to claim this reward.");
    }
  }, [time, isClaimed]);

  return (
    <div className="w-full h-[100vh] gap-[5vh] flex flex-col justify-center items-center">
      <div className="w-[70%] h-10">
        <button className="w-full md:text-xl text-sm group flex h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-gray-800 border-b-gray-900 disabled:border-0 disabled:bg-gray-800 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-gray-800 active:text-gray-300 focus-visible:outline-gray-800 sm:text-base dark:bg-gray-900 dark:border-gray-900 dark:border-b-black">
          MY GMOON BALANCE
        </button>
      </div>
      <div className="w-[70%] h-10">
        <button
          className="w-full md:text-xl text-sm group flex h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-gray-800 border-b-gray-900 disabled:border-0 disabled:bg-gray-800 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-gray-800 active:text-gray-300 focus-visible:outline-gray-800 sm:text-base dark:bg-gray-900 dark:border-gray-900 dark:border-b-black"
          onClick={handleCount}
          disabled={isClaimed}
        >
          {isClaimed ? `Claim 100$MOON: ${formatTime(time)}` : "MINT GMOON TOKEN"}
        </button>
      </div>
      <div className="w-[70%] h-10">
        <button className="w-full md:text-xl text-sm group flex h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-gray-800 border-b-gray-900 disabled:border-0 disabled:bg-gray-800 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-gray-800 active:text-gray-300 focus-visible:outline-gray-800 sm:text-base dark:bg-gray-900 dark:border-gray-900 dark:border-b-black">
          STAKE TOKEN and NFT
        </button>
      </div>
      <div className="w-[70%] h-10">
        <button
          className="w-full md:text-xl text-sm group flex h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-gray-800 border-b-gray-900 disabled:border-0 disabled:bg-gray-800 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-gray-800 active:text-gray-300 focus-visible:outline-gray-800 sm:text-base dark:bg-gray-900 dark:border-gray-900 dark:border-b-black"
          onClick={() => router.push("/")}
        >
          LEADERBOARD
        </button>
      </div>
    </div>
  );
}
