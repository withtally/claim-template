import { FC } from "react";
import { Connector } from "wagmi";
import useCustomToasters from "~/hooks/useToasters";
import { Address } from "~/types/common";
import { WalletConnectors } from "~/types/wallet-connectors";
import { shortenAddress } from "../../../../../../libs/helpers/shortenAddress";
import Copy from "../../../../../../public/img/icons/copy.svg";
import { WalletIcon } from "../../../WalletIcon";
import Image from 'next/image'

interface Props {
  onDisconnect: () => void;
  address: Address;
  connector: Connector;
  onClose: () => void;
}

export const DisconnectContent: FC<Props> = ({ address, connector }) => {
  const { successToast } = useCustomToasters();

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-6">
        {
          connector?.icon ? (
            <Image src={connector?.icon} alt="connector icon" width={0} height={0} className="size-10"/>
          ) : (
            <WalletIcon
              className="size-10"
              walletName={connector.name as WalletConnectors}
            />
          )
        }

        <div className="flex items-center justify-between gap-[10px]">
          <span>{address && shortenAddress(address)}</span>
          <button
            className=" rounded p-2 hover:bg-black hover:bg-opacity-20"
            onClick={() => {
              navigator.clipboard.writeText(address);
              successToast({ title: "Copied address" });
            }}
          >
            <Copy className="size-4" />
          </button>
        </div>
      </div>
    </>
  );
};
