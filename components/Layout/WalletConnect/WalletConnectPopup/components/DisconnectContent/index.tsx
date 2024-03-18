import { useWalletConnectContext } from '../../../../../../contexts/WalletConnectContext'
import { FC } from 'react'
import { Connector, useAccount, useDisconnect } from 'wagmi'
import Cross from '../../../../../../public/img/icons/cross.svg'
import Copy from '../../../../../../public/img/icons/copy.svg'
import { WalletIcon } from '../../../WalletIcon'
import { WalletConnectors } from '~/types/wallet-connectors'
import { shortenAddress } from '~/utils/common'
// import Button from '../../../../Button'
import { Button } from '@chakra-ui/react'

interface Props {
  onDisconnect: () => void
  address: `0x${string}`
  connector: Connector
  onClose: () => void
}

export const DisconnectContent: FC<Props> = ({ address, connector }) => {
  const connectorName = connector?.name

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-6">
        <WalletIcon
          className="size-14"
          walletName={connectorName as WalletConnectors}
        />

        <div className="flex items-center justify-between gap-[10px]">
          <span>{address && shortenAddress(address)}</span>
          <button
            className=" rounded p-2 hover:bg-black hover:bg-opacity-20"
            onClick={() => {
              navigator.clipboard.writeText(address)
            }}
          >
            <Copy className="size-4" />
          </button>
        </div>
      </div>
    </>
  )
}
