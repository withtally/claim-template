import { FC, useEffect } from 'react'
import { Connector, useConnect, useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import Button from '../../Button'
import EthIcon from '~/public/img/icons/chains/eth.svg'
import ChevronDownIcon from '~/public/img/icons/chevron-down.svg'
import { useWalletConnectContext } from '../../../../contexts/WalletConnectContext'
import { normalize } from 'viem/ens'
import { WalletIcon } from '../WalletIcon'
import { WalletConnectors } from '~/types/wallet-connectors'

export const WalletConnector: FC = () => {
  const { address, isConnected, chainId, connector } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName })
  const connectorName = connector?.name

  const { setConnectConnectPopupVisibility } = useWalletConnectContext()
  return (
    <>
      {isConnected ? (
        <button
          onClick={() => disconnect()}
          className="inline-flex h-10 items-center justify-center gap-x-4 rounded-full bg-white/20 p-2 px-2"
        >
          <WalletIcon
            className="size-7"
            walletName={connectorName as WalletConnectors}
          />
          <span>{address}</span>
          <ChevronDownIcon className="mr-1 size-3.5" />
        </button>
      ) : (
        <Button
          className="h-[40px] max-h-[40px]"
          onClick={() => setConnectConnectPopupVisibility(true)}
        >
          Connect wallet
        </Button>
      )}
    </>
  )
}
