import { useWalletConnectContext } from '../../../../contexts/WalletConnectContext'
import { FC, useState } from 'react'
import Cross from '../../../../public/img/icons/cross.svg'
import Back from '../../../../public/img/icons/back.svg'
import WalletsList from './WalletsList'
import ChainsList from '~/components/Layout/WalletConnect/WalletConnectPopup/ChainsList'

export const WalletConnectPopup: FC = () => {
  const [isChainsShowed, setIsChainsShowed] = useState<boolean>(false)
  const { setConnectConnectPopupVisibility } = useWalletConnectContext()

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
                isChainsShowed ? (
                  <ChainsList />
                ) : (
                  <WalletsList
                    setIsChainsShowed={setIsChainsShowed}
                  />
                )
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
