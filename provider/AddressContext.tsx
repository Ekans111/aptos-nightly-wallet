"use client";

import { AccountAddress } from "@aptos-labs/ts-sdk";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AddressContextType {
  address: AccountAddress;
  setAddress: React.Dispatch<React.SetStateAction<AccountAddress>>;
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
  const [address, setAddress] = useState<AccountAddress>(() => {
    // Lazy initialization function
    if (typeof window !== "undefined" && localStorage) {
      const storedAddress = localStorage.getItem("address") || "0x0";
      try {
        return AccountAddress.fromStringStrict(storedAddress);
      } catch (error) {
        console.error("Failed to parse account address:", error);
        return AccountAddress.fromStringStrict("0x0");
      }
    } else {
      return AccountAddress.fromStringStrict("0x0");
    }
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
        setAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
