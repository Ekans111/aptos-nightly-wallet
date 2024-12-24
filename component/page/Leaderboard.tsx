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
        <button className="w-full md:text-xl text-sm group flex h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-red-500 border-b-red-700 disabled:border-0 disabled:bg-red-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-red-800 active:text-gray-300 focus-visible:outline-red-500 sm:text-base dark:bg-gray-700 dark:border-gray-700 dark:border-b-gray-900">
          MOON COIN BALANCE
        </button>
      </div>
      <div className="w-[70%] h-10">
        <button
          className="w-full md:text-xl text-sm group flex h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-red-500 border-b-red-700 disabled:border-0 disabled:bg-red-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-red-800 active:text-gray-300 focus-visible:outline-red-500 sm:text-base dark:bg-gray-700 dark:border-gray-700 dark:border-b-gray-900"
          onClick={handleCount}
          disabled={isClaimed}
        >
          {isClaimed ? `Next: ${formatTime(time)}` : "Claim 100$MOON"}
        </button>
      </div>
      <div className="w-[70%] h-10">
        <button className="w-full md:text-xl text-sm group flex h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-red-500 border-b-red-700 disabled:border-0 disabled:bg-red-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-red-800 active:text-gray-300 focus-visible:outline-red-500 sm:text-base dark:bg-gray-700 dark:border-gray-700 dark:border-b-gray-900">
          Stake MOON COIN
        </button>
      </div>
      <div className="w-[70%] h-10">
        <button
          className="w-full md:text-xl text-sm group flex h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-red-500 border-b-red-700 disabled:border-0 disabled:bg-red-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-red-800 active:text-gray-300 focus-visible:outline-red-500 sm:text-base dark:bg-gray-700 dark:border-gray-700 dark:border-b-gray-900"
          onClick={() => router.push("/")}
        >
          LEADERBOARD
        </button>
      </div>
    </div>
  );
}
