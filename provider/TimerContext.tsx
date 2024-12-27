"use client";

import React, { useState, useEffect, useContext, ReactNode } from "react";

interface TimerContextType {
  time: number;
  resetTimer: () => void;
}

// Create a Context for the Timer
const TimerContext = React.createContext<TimerContextType>({
  time: 0,
  resetTimer: () => {},
});

export const useTimer = () => {
  return useContext(TimerContext);
};
interface EnergyProviderProps {
  children: ReactNode;
}
export const TimerProvider: React.FC<EnergyProviderProps> = ({ children }) => {
  // Initial state (2 hours in seconds)
  const initialTime = 2 * 60 * 60;
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time > 0) {
      const countdown = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [time]);

  // Function to reset the timer
  const resetTimer = () => {
    setTime(initialTime);
  };

  // Value provided by the context
  const value = {
    time,
    resetTimer,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};

// Function to format the time as hh:mm:ss
export const formatTime = (seconds: number) => {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
};
