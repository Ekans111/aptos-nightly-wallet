"use client"

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { 
  Account,
  Network, 
  Aptos,
  AptosConfig,
  Ed25519PrivateKey,
} from '@aptos-labs/ts-sdk';
import { 
  OWNER_PRIVATE_KEY,
  FULLNODE_RPC, 
} from '@/app/config/utils';

interface AptosConfigContextType {
  setNetwork: React.Dispatch<React.SetStateAction<Network>>;
  aptos: Aptos;
  ownerAccount: Account;
}

const AptosConfigContext = createContext<AptosConfigContextType | undefined>(undefined);

export const useAptosConfig = () => {
  const context = useContext(AptosConfigContext);
  if (!context) {
    throw new Error("useAptosConfig must be used within an AptosConfigProvider");
  }
  return context;
}

interface AptosConfigProviderProps {
  children: ReactNode;
}



export const AptosConfigProvider: React.FC<AptosConfigProviderProps> = ({children}) => {
  const [network, setNetwork] = useState(Network.TESTNET);
  // Initialize the Aptos client
  const [aptos, setAptos] = useState(
    new Aptos(
      new AptosConfig(
        { 
          network: network,
          // fullnode: FULLNODE_RPC,
        }
      )
    )
  );

  const ownerPrivateKey = new Ed25519PrivateKey(OWNER_PRIVATE_KEY);
  const ownerAccount = Account.fromPrivateKey({ privateKey: ownerPrivateKey });

  useEffect(() => {
    const config = new AptosConfig(
      { 
        network: network,
        // fullnode: FULLNODE_RPC, 
      }
    );

    
    const newAptos = new Aptos(config);
    setAptos(newAptos);
  }, [network])

  return (
    <AptosConfigContext.Provider
      value={{ setNetwork, aptos, ownerAccount}}
    >
      {children}
    </AptosConfigContext.Provider>
  );
}