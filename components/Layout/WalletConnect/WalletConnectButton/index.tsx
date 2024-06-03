import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { useAccount } from "wagmi";
import { useChainMismatch } from "~/hooks/useChainMismatch";
import ChevronDownIcon from "~/public/img/icons/chevron-down.svg";
import { WalletConnectors } from "~/types/wallet-connectors";
import { useWalletConnectContext } from "../../../../contexts/WalletConnectContext";
import { shortenAddress } from "../../../../libs/helpers/shortenAddress";
import { WalletIcon } from "../WalletIcon";
import Image from 'next/image'

export const WalletConnector: FC = () => {
  const { address, isConnected, connector } = useAccount();

  const { onOpenConnectPopup } = useWalletConnectContext();
  const isChainMissmatched = useChainMismatch();
  return (
    <>
      {isConnected ? (
        <button
          onClick={() => onOpenConnectPopup()}
          className={`inline-flex h-10 items-center justify-center gap-x-4 rounded-full  p-2 px-2 ${isChainMissmatched ? "bg-errorColor" : "bg-white/20"}`}
        >
          {isChainMissmatched ? (
            <span className="pl-2">Wrong chain</span>
          ) : (
            <>
              {
                connector?.icon ? (
                  <Image src={connector?.icon} alt="connector icon" width={0} height={0} className="size-10"/>
                ) : (
                  <WalletIcon
                    className="size-7"
                    walletName={connector.name as WalletConnectors}
                  />
                )
              }
              <span>{shortenAddress(address)}</span>
            </>
          )}
          <ChevronDownIcon className="mr-1 size-3.5" />
        </button>
      ) : (
        <Button
          className="h-[40px] max-h-[40px]"
          onClick={() => onOpenConnectPopup()}
        >
          Connect wallet
        </Button>
      )}
    </>
  );
};
