import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AccountInfo, UserResponseStatus } from "@aptos-labs/wallet-standard";
import { toast } from "sonner";

import { getAdapter } from "../misc/adapter";
import StarryButton from "./StarryButton";

interface StickyHeaderProps {
  setButtonRef: (ref: React.RefObject<HTMLDivElement>) => void;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ setButtonRef }) => {
  const [userAccount, setUserAccount] = React.useState<
    AccountInfo | undefined
  >();

  const router = useRouter();

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
                const response = await adapter.connect();
                if (response.status === UserResponseStatus.APPROVED) {
                  setUserAccount(response.args);
                  toast.success("Wallet connected!");
                  router.push('/leaderboard');
                } else {
                  toast.error("User rejected connection");
                }
              } catch (error) {
                toast.error("Wallet connection failed!");
                // If error, disconnect ignore error
                await adapter.disconnect().catch(() => {});
              }
            }}
            onDisconnect={async () => {
              try {
                const adapter = await getAdapter();
                await adapter.disconnect();
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
