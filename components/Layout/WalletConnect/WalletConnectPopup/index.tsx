import { useWalletConnectContext } from '../../../../contexts/WalletConnectContext'
import { FC, useState, MouseEvent } from 'react'
import { Connector, useConnect, useAccount, useDisconnect, useEnsAvatar, useEnsName, useChains } from 'wagmi'
import Cross from '../../../../public/img/icons/cross.svg'
import Back from '../../../../public/img/icons/back.svg'
import { WalletIcon } from '../WalletIcon'
import { WalletConnectors } from '~/types/wallet-connectors'
import { siteName, WALLLET_CONNECT_ID } from '~/constants/site'
import { ChainIcon } from '~/components/Layout/WalletConnect/ChainIcon/ChainIcon'
import { Chains } from '~/types/chains'

export const WalletConnectPopup: FC = () => {
  const { setConnectConnectPopupVisibility } = useWalletConnectContext()
  const { connectors, connect } = useConnect()
  const [isChainsShowed, setIsChainsShowed] = useState<boolean>(false)
  const chains = useChains()

  const defaultConnectHandler = (connector: Connector) => {
    return (event: MouseEvent) => {
      connect(
        { connector },
        { onSuccess: () => setConnectConnectPopupVisibility(false) }
      )
      event.preventDefault();
    }
  }

  const walletConnectHandler = () => {
    return (event: MouseEvent) => {
      setIsChainsShowed(true)
    }
  }

  const chainsList = () => {
    const connector = connectors.find(connector => connector.id === WALLLET_CONNECT_ID)
    return(
      <>
        <div className="mb-[16px]">
          Please select a network for WalletConnect:
        </div>
        <div className="flex flex-col gap-y-[16px] max-h-[50vh] md:max-h-[500px] overflow-y-auto">
          {chains.filter(chain => !chain.testnet).map((chain) => {
            return (
              <div
                key={chain.name}
                onClick={() => {
                  connect(
                    { connector, chainId: chain.id },
                    { onSuccess: () => setConnectConnectPopupVisibility(false) }
                  )
                }}
                className="flex cursor-pointer items-center justify-between rounded-md border border-gray-500 p-[15px] "
              >
                {chain.name}

                <ChainIcon className="size-10" chainName={chain.name as Chains} />
              </div>
            )
          })}
        </div>
      </>
    )
  }

  const renderConnectBody = () => {
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

  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-blue-grey/70 backdrop-blur-lg"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          onClick={() => setConnectConnectPopupVisibility(false)}
          className="flex min-h-full items-end items-center justify-center p-0 p-4 text-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative my-8 w-full max-w-lg transform overflow-hidden rounded-2xl bg-blue-grey text-left shadow-xl transition-all p-[16px]"
          >
            <div className="flex items-center justify-between mb-[32px]">
              <h1 className="text-xl font-extrabold font-semibold">Connect Wallet</h1>

              {
                isChainsShowed ? (
                  <Back
                    className="size-3.5 cursor-pointer"
                    onClick={() => setIsChainsShowed(false)}
                  />
                ) : (
                  <Cross
                    className="size-3.5 cursor-pointer"
                    onClick={() => setConnectConnectPopupVisibility(false)}
                  />
                )
              }

            </div>
            <div className="mb-[32px]">
              {
                isChainsShowed ? chainsList() : renderConnectBody()
              }
            </div>
            <div className="flex">
              <p className="mr-[8px]">Don't have a wallet?</p>
              <a href="https://ethereum.org/en/wallets/">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
