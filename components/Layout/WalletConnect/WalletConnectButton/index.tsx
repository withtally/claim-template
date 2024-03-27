import { FC } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '@chakra-ui/react'
import ChevronDownIcon from '~/public/img/icons/chevron-down.svg'
import { useWalletConnectContext } from '../../../../contexts/WalletConnectContext'
import { WalletIcon } from '../WalletIcon'
import { WalletConnectors } from '~/types/wallet-connectors'
import { shortenAddress } from '../../../../libs/helpers/shortenAddress'

export const WalletConnector: FC = () => {
  const { address, isConnected, connector } = useAccount()
  const connectorName = connector?.name

  const { onOpenConnectPopup } = useWalletConnectContext()
  return (
    <>
      {isConnected ? (
        <button
          onClick={() => onOpenConnectPopup()}
          className="inline-flex h-10 items-center justify-center gap-x-4 rounded-full bg-white/20 p-2 px-2"
        >
          <WalletIcon
            className="size-7"
            walletName={connectorName as WalletConnectors}
          />
          <span>{shortenAddress(address)}</span>
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
  )
}
