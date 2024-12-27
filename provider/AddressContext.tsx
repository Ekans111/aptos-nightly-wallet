"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

interface AddressContextType {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};

interface AddressProviderProps {
  children: ReactNode;
}

export const AddressProvider: React.FC<AddressProviderProps> = ({
  children,
}) => {
  const [address, setAddress] = useState(() => {
    const storedAddress =
      typeof window !== "undefined" && localStorage
        ? localStorage.getItem("address")
        : "0";
    return storedAddress || "";
  });

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem("address", address.toString());
    }
  }, [address]);

  return (
    <AddressContext.Provider
      value={{
        address,
        setAddress
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
