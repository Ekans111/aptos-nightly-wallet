"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAddress } from "@/provider/AddressContext";
import { InputViewFunctionData } from "@aptos-labs/ts-sdk";
import { useAptosConfig } from "@/provider/AptosConfig";
import {
  formatTime,
  // useTimer,
} from "@/provider/TimerContext";
import { Airdrop_Lock_Time } from "@/app/config/utils";
import airdrop_ABI from "@/app/config/airdrop_ABI.json";

const getCurrentTime = () => {
  return Math.floor(Date.now() / 1000);
};

export default function Leaderboard() {
  // const { time, resetTimer } = useTimer();
  const { address: airdropAddress } = useAddress();
  const { aptos, setNetwork, ownerAccount } = useAptosConfig();
  const [loading, setLoading] = useState(true);
  const [restTime, setRestTime] = useState(Airdrop_Lock_Time);
  const router = useRouter();
  const [isClaimed, setIsClaimed] = React.useState<boolean>(false);

  useEffect(() => {
    const getLastAirdropTime = async () => {
      setLoading(true);

      // Reading data using view function
      const creatorAddress: string = airdrop_ABI.address;
      const moduleName: string = airdrop_ABI.name;
      const functionName: string = airdrop_ABI.exposed_functions[5].name;
      const viewPayload = {
        function: `${creatorAddress}::${moduleName}::${functionName}`,
        functionArguments: [airdropAddress.toString()],
      } as InputViewFunctionData;
      console.log("Airdrop viewPayload: ", viewPayload, aptos);
      try {
        const result = await aptos.view({ payload: viewPayload });
        const currentTime = getCurrentTime();
        console.log("Function Result", currentTime, result);
        let lastAirdropTime = result[0] as number;
        console.log(
          "Rest time",
          Math.max(0, Airdrop_Lock_Time - (currentTime - lastAirdropTime))
        );
        setRestTime(
          Math.max(0, Airdrop_Lock_Time - (currentTime - lastAirdropTime))
        ); // 0 if Data.now - last >= Airdrop_Lock_Time, else rest time
        if (Math.max(0, Airdrop_Lock_Time - (currentTime - lastAirdropTime)))
          setIsClaimed(true);
      } catch (err) {
        console.error("Error calling last airdrop time view function", err);
        setRestTime(Airdrop_Lock_Time);
      } finally {
        setLoading(false);
      }
    };
    getLastAirdropTime();
  }, [isClaimed]);

  const handleCount = async () => {
    if (isClaimed) {
      toast.error("You have already claimed this reward.");
      return;
    }

    // Build the transaction
    const creatorAddress: string = airdrop_ABI.address;
    const moduleName: string = airdrop_ABI.name;
    const functionName: string = airdrop_ABI.exposed_functions[0].name;
    const transaction = await aptos.transaction.build.simple({
      sender: ownerAccount.accountAddress,
      data: {
        function: `${creatorAddress}::${moduleName}::${functionName}`,
        functionArguments: [airdropAddress.toString()],
      },
    });

    // Sign the transaction
    const signature = aptos.transaction.sign({
      signer: ownerAccount,
      transaction,
    });

    // Submit the transaction
    const committedTxn = await aptos.transaction.submit.simple({
      transaction,
      senderAuthenticator: signature,
    });

    try {
      // Wait for transaction completion
      const response = await aptos.waitForTransaction({
        transactionHash: committedTxn.hash,
      });
      console.log("airdrop success", response);
      setIsClaimed(true);
      setRestTime(Airdrop_Lock_Time);
      toast.success("Your reward has been claimed");
    } catch (err) {
      toast.error(`There were some errors in airdrop, ${err}`);
    }
  };

  useEffect(() => {
    if (restTime <= 0 && isClaimed) {
      setIsClaimed(false);
      toast.success("You are avaliable to claim this reward.");
    }
  }, [restTime, isClaimed]);

  useEffect(() => {
    if (restTime > 0) {
      const countdown = setInterval(() => {
        setRestTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [restTime]);

  return (
    <div className="w-full h-[100vh] gap-[5vh] flex flex-col justify-center items-center">
      <div className="w-[70%] h-10">
        <button className="w-full md:text-xl text-sm group flex h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-gray-800 border-b-gray-900 disabled:border-0 disabled:bg-gray-800 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-gray-800 active:text-gray-300 focus-visible:outline-gray-800 sm:text-base dark:bg-gray-900 dark:border-gray-900 dark:border-b-black">
          MY GMOON BALANCE {airdropAddress.toString().slice(0, 10)} ....
        </button>
      </div>
      <div className="w-[70%] h-10">
        <button
          className="w-full md:text-xl text-sm group flex h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-gray-800 border-b-gray-900 disabled:border-0 disabled:bg-gray-800 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-gray-800 active:text-gray-300 focus-visible:outline-gray-800 sm:text-base dark:bg-gray-900 dark:border-gray-900 dark:border-b-black"
          onClick={handleCount}
          disabled={isClaimed || loading}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-blue-500" />
          ) : isClaimed ? (
            `Claim 100$MOON: ${formatTime(restTime)}`
          ) : (
            "MINT GMOON TOKEN"
          )}
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
