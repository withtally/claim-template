import { Button } from "@chakra-ui/react";
import { FC, MouseEvent } from "react";
import { Connector } from "wagmi";
import { WalletIcon } from "~/components/Layout/WalletConnect/WalletIcon";
import { WALLLET_CONNECT_ID } from "~/constants/site";
import { WalletConnectors } from "~/types/wallet-connectors";
import { getTextFromDictionary } from "~/utils/getTextFromDictionary";

interface Props {
  connectors: readonly Connector[]
  defaultConnectHandler: (connector: Connector) => (event: MouseEvent) => void
}

const WalletsList: FC<Props> = ({ connectors, defaultConnectHandler }) => {
  return (
    <>
      <div className="mb-[16px]">{getTextFromDictionary('connectModal_description')} {getTextFromDictionary('site_title')}:</div>
      <div className="flex flex-col gap-y-[16px]">
        {connectors.map((connector) => {
          return (
            <Button
              variant="connectWallet"
              key={connector.name}
              rightIcon={
                <WalletIcon
                  className="size-10"
                  walletName={connector.name as WalletConnectors}
                />
              }
              iconSpacing="auto"
              onClick={defaultConnectHandler(connector)}
            >
              {connector.name}
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default WalletsList;
