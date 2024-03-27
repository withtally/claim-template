import { WALLLET_CONNECT_ID } from '~/constants/site'
import { WalletIcon } from '~/components/Layout/WalletConnect/WalletIcon'
import { WalletConnectors } from '~/types/wallet-connectors'
import { Connector } from 'wagmi'
import { Dispatch, FC, MouseEvent, SetStateAction } from 'react'
import { Button } from '@chakra-ui/react'
import { getTextFromDictionary } from '~/utils/getTextFromDictionary'

interface Props {
  connectors: readonly Connector[]
  walletConnectHandler: () => (event: MouseEvent) => void
  defaultConnectHandler: (connector: Connector) => (event: MouseEvent) => void
}

const WalletsList: FC<Props> = ({ connectors, defaultConnectHandler, walletConnectHandler }) => {
  return (
    <>
      <div className="mb-[16px]">Please select a wallet to connect to {getTextFromDictionary('site_title')}:</div>
      <div className="flex flex-col gap-y-[16px]">
        {connectors.map((connector) => {
          return (
            <Button
              variant='connectWallet'
              key={connector.name}
              rightIcon={
                <WalletIcon
                  className="size-10"
                  walletName={connector.name as WalletConnectors}
                />
              }
              iconSpacing='auto'
              onClick={connector.id === WALLLET_CONNECT_ID ? walletConnectHandler() : defaultConnectHandler(connector)}
            >
              {connector.name}
            </Button>
          )
        })}
      </div>
    </>
  )
}

export default WalletsList
