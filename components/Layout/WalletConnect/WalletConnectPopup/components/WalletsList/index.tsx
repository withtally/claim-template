import { Button } from "@chakra-ui/react";
import { FC, MouseEvent, useMemo } from 'react'
import { Connector } from "wagmi";
import { WalletIcon } from "~/components/Layout/WalletConnect/WalletIcon";
import { WalletConnectors } from "~/types/wallet-connectors";
import { getTextFromDictionary } from "~/utils/getTextFromDictionary";
import {isMobile} from "~/utils/isMobile";
import {
  isInjectedCoinbaseWalletConnector,
  isInjectedConnector,
  isInjectedMetaMaskConnector,
  isMetaMaskConnector,
} from '~/utils/connectors'
import Image from 'next/image'

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

        if(isInjectedCoinbaseWalletConnector(connector)){
          return false;
        }

        if(!isInjectedConnector(connector) && isMetaMaskConnector(connector)){
          return false;
        }

        return true;
      }).filter((connector, index, self) =>
          index === self.findIndex((t) => (
            t.id === connector.id
          ))
      )

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
                connector?.icon ? (
                    <Image src={connector?.icon} alt="connector icon" width={0} height={0} className="size-10"/>
                  ) : (
                    <WalletIcon
                      className="size-10"
                      walletName={connector.name as WalletConnectors}
                    />
                  )
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
