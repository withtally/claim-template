import { useWalletConnectContext } from '../../../../contexts/WalletConnectContext'
import { FC } from 'react'
import { Connector, useConnect, useAccount, useDisconnect, useEnsAvatar, useEnsName, useChains } from 'wagmi'
import { mainnet, sepolia, polygon, optimism } from 'wagmi/chains'
import Cross from '../../../../public/img/icons/cross.svg'
import { WalletIcon } from '../WalletIcon'
import { WalletConnectors } from '~/types/wallet-connectors'

export const WalletConnectPopup: FC = () => {
  const { setConnectConnectPopupVisibility } = useWalletConnectContext()
  const { connectors, connect } = useConnect()
  const chains = useChains()

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
            className="relative my-8 w-full max-w-lg transform overflow-hidden rounded-2xl bg-blue-grey text-left shadow-xl transition-all"
          >
            <div className="flex items-center justify-between p-[16px]">
              <h1 className="text-xl font-extrabold font-semibold">Connect Wallet</h1>

              <Cross
                className="size-3.5 cursor-pointer"
                onClick={() => setConnectConnectPopupVisibility(false)}
              />
            </div>
            <div>
              {connectors.map((connector) => {
                return (
                  <div 
                    key={connector.name}
                    onClick={() => {
                      connect(
                        { connector, chainId: optimism.id },
                        { onSuccess: () => setConnectConnectPopupVisibility(false) }
                      )
                    }}
                    className="m-[16px] flex cursor-pointer items-center justify-between rounded-md border border-gray-500 p-[15px] "
                  >
                    {connector.name}

                    <WalletIcon className='size-10' walletName={connector.name as WalletConnectors} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
