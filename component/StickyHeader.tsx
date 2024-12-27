import React, { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  AccountInfo,
  NetworkInfo,
  UserResponseStatus,
} from "@aptos-labs/wallet-standard";
import { NightlyConnectAptosAdapter } from "@nightlylabs/wallet-selector-aptos";
import { toast } from "sonner";

import { getAdapter } from "../misc/adapter";
import StarryButton from "./StarryButton";
import { networkMap } from "../misc/utils";

interface StickyHeaderProps {
  setButtonRef: (ref: React.RefObject<HTMLDivElement>) => void;
}

const MOVEMENT_CHAIN_IDS = [27, 177, 250];
const REQUESTED_NETWORK = networkMap[177];

const StickyHeader: React.FC<StickyHeaderProps> = ({ setButtonRef }) => {
  const [userAccount, setUserAccount] = React.useState<
    AccountInfo | undefined
  >();

  const router = useRouter();

  const changeNetworkBeforeAction = useCallback(
    async (network: NetworkInfo, adapter: NightlyConnectAptosAdapter) => {
      if (!MOVEMENT_CHAIN_IDS.includes(network.chainId)) {
        const changeNetworkResponse = await adapter.changeNetwork(
          REQUESTED_NETWORK
        );
        if (
          changeNetworkResponse &&
          changeNetworkResponse.status === UserResponseStatus.APPROVED
        ) {
          toast.success("Network changed!");
        } else {
          toast.error("User rejected network change");
          throw new Error("Couldn't change network");
        }
      }
    },
    []
  );

  useEffect(() => {
    const init = async () => {
      const adapter = await getAdapter();
      if (await adapter.canEagerConnect()) {
        try {
          const response = await adapter.connect();
          if (response.status === UserResponseStatus.APPROVED) {
            setUserAccount(response.args);
          }
        } catch (error) {
          await adapter.disconnect().catch(() => {});
          console.log(error);
        }
      }
      // Events
      adapter.on("connect", (accInfo) => {
        if (accInfo && "address" in accInfo) {
          setUserAccount(accInfo);
        }
      });

      adapter.on("disconnect", () => {
        setUserAccount(undefined);
        console.log("adapter disconnected");
      });

      adapter.on("accountChange", (accInfo) => {
        if (accInfo && "address" in accInfo) {
          setUserAccount(accInfo);
        }
      });
    };
    init();
    // Try eagerly connect
  }, []);

  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setButtonRef(bodyRef);
  }, [setButtonRef]);

  // useEffect(() => {
  //   if (userAccount && userAccount.address) {
  //     console.log("userAccount", userAccount);
  //     router.push("/leaderboard");
  //   }
  // }, [userAccount]);

  return (
    <header className="fixed top-0 left-0 w-full bg-opacity-50  p-6 z-10">
      <div className="flex items-center justify-between">
        <div />
        <div className="flex flex-col space-y-4" ref={bodyRef}>
          <StarryButton
            connected={userAccount?.address !== undefined}
            onConnect={async () => {
              const adapter = await getAdapter();
              try {
                const response = await adapter.connect(
                  undefined,
                  REQUESTED_NETWORK
                );
                if (response.status === UserResponseStatus.APPROVED) {
                  setUserAccount(response.args);
                  const network = await adapter.network();

                  toast.success(`Wallet connected! network: ${network.name}`);
                  router.push("/leaderboard");
                } else {
                  toast.error("User rejected connection");
                }
              } catch (error) {
                toast.error("Wallet connection failed!");
                // If error, disconnect ignore error
                await adapter.disconnect().catch(() => {});
                return;
              }
              try {
                // check chainId
                const chainId = await adapter.network();
                await changeNetworkBeforeAction(chainId, adapter);
              } catch (error) {
                console.log(error);
              }
            }}
            onDisconnect={async () => {
              try {
                console.log("start");
                const adapter = await getAdapter();
                console.log(adapter);
                await adapter.disconnect();
                console.log("done");
                setUserAccount(undefined);
              } catch (error) {
                console.log(error);
              }
            }}
            publicKey={userAccount?.address.toString()}
          />
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
