import { Button } from "@chakra-ui/react";
import { FC, MouseEvent, useMemo } from 'react'
import { Connector } from "wagmi";
import { WalletIcon } from "~/components/Layout/WalletConnect/WalletIcon";
import { WALLLET_CONNECT_ID } from "~/constants/site";
import { WalletConnectors } from "~/types/wallet-connectors";
import { getTextFromDictionary } from "~/utils/getTextFromDictionary";
import {isMobile} from "~/utils/isMobile";
import { isInjectedConnector, isInjectedMetaMaskConnector, isMetaMaskConnector } from '~/utils/connectors'

interface Props {
  connectors: readonly Connector[]
  defaultConnectHandler: (connector: Connector) => (event: MouseEvent) => void
}

const WalletsList: FC<Props> = ({ connectors, defaultConnectHandler }) => {

  const connectorsToRender = useMemo(() => {
    const isMetaMaskBrowser = navigator.userAgent.includes("MetaMaskMobile");

    if(!isMobile()){
      return connectors.filter(connector => {
        if(isInjectedMetaMaskConnector(connector)){
          return true;
        }
        return !isInjectedConnector(connector) && !isMetaMaskConnector(connector);
      })

    }else{
      return connectors
        .filter(connector => {
          if(isMetaMaskBrowser && isInjectedMetaMaskConnector(connector)){
            return true;
          }

          if(!isMetaMaskBrowser && isMetaMaskConnector(connector)){
            return true
          }

          if(isMetaMaskBrowser && isMetaMaskConnector(connector)){
            return false;
          }

          return true;
        })

    }
  },[])

  return (
    <>
      <div className="mb-[16px]">{getTextFromDictionary('connectModal_description')} {getTextFromDictionary('site_title')}:</div>
      <div className="flex flex-col gap-y-[16px]">
        {
          connectorsToRender.map((connector) => {
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
