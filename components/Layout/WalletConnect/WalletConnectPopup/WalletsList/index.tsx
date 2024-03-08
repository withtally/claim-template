import { siteName, WALLLET_CONNECT_ID } from '~/constants/site'
import { WalletIcon } from '~/components/Layout/WalletConnect/WalletIcon'
import { WalletConnectors } from '~/types/wallet-connectors'
import { Connector, useConnect } from 'wagmi'
import { Dispatch, FC, MouseEvent, SetStateAction } from 'react'
import { useWalletConnectContext } from '../../../../../contexts/WalletConnectContext'

type WalletsListProps = {
  setIsChainsShowed: Dispatch<SetStateAction<boolean>>;
}

const WalletsList: FC<WalletsListProps> = ({ setIsChainsShowed }) => {
  const { setConnectConnectPopupVisibility } = useWalletConnectContext()
  const { connectors , connect } = useConnect()

  const walletConnectHandler = () => {
    return (event: MouseEvent) => {
      setIsChainsShowed(true)
    }
  }
  const defaultConnectHandler = (connector: Connector) => {
    return (event: MouseEvent) => {
      connect(
        { connector },
        { onSuccess: () => setConnectConnectPopupVisibility(false) }
      )
      event.preventDefault();
    }
  }

  return (
    <>
      <div className="mb-[16px]">
        Please select a wallet to connect to {siteName}:
      </div>
      <div className="flex flex-col gap-y-[16px]">
        {connectors.map((connector) => {
          return (
            <div
              key={connector.name}
              onClick={
                connector.id === WALLLET_CONNECT_ID ? (
                  walletConnectHandler()
                ) : defaultConnectHandler(connector)
              }
              className="flex cursor-pointer items-center justify-between rounded-md border border-gray-500 p-[15px] "
            >
              {connector.name}

              <WalletIcon className="size-10" walletName={connector.name as WalletConnectors} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default WalletsList;