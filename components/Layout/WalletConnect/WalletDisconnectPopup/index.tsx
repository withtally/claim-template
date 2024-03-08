import { useWalletConnectContext } from '../../../../contexts/WalletConnectContext'
import { FC } from 'react'
import { Connector, useAccount, useDisconnect } from 'wagmi'
import Cross from '../../../../public/img/icons/cross.svg'
import Copy from '../../../../public/img/icons/copy.svg'
import { WalletIcon } from '../WalletIcon'
import { WalletConnectors } from '~/types/wallet-connectors'
import { shortenAddress } from '~/utils/common'
import Button from '../../Button'

interface Props {
  onDisconnect: () => void
  address: `0x${string}`
  connector: Connector
  onClose: () => void
}

export const WalletDisconnectPopup: FC<Props> = ({ onDisconnect, address, connector, onClose }) => {
  const connectorName = connector?.name

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-500 p-[16px]">
        <h1 className="text-xl font-extrabold font-semibold">Connected</h1>

        <Cross
          className="size-3.5 cursor-pointer"
          onClick={onClose}
        />
      </div>

      <div className="flex flex-col items-center justify-between gap-6 p-[16px]">
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

        <Button onClick={onDisconnect}>Disconect</Button>
      </div>
    </>
  )

  // return (
  //   <div
  //     className="relative z-50"
  //     aria-labelledby="modal-title"
  //     role="dialog"
  //     aria-modal="true"
  //   >
  //     <div className="fixed inset-0 bg-blue-grey/70 backdrop-blur-lg"></div>

  //     <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
  //       <div
  //         onClick={() => setConnectConnectPopupVisibility(false)}
  //         className="flex min-h-full items-end items-center justify-center p-0 p-4 text-center"
  //       >
  //         <div
  //           onClick={(e) => e.stopPropagation()}
  //           className="relative my-8 w-full max-w-sm transform overflow-hidden rounded-2xl bg-blue-grey text-left shadow-xl transition-all"
  //         >
  //           <div className="flex items-center justify-between border-b border-gray-500 p-[16px]">
  //             <h1 className="text-xl font-extrabold font-semibold">Connect Wallet</h1>

  //             <Cross
  //               className="size-3.5 cursor-pointer"
  //               onClick={() => setConnectConnectPopupVisibility(false)}
  //             />
  //           </div>

  //           <div className="flex flex-col items-center justify-between gap-6 p-[16px]">
  //             <WalletIcon
  //               className="size-14"
  //               walletName={connectorName as WalletConnectors}
  //             />

  //             <div className="flex items-center justify-between gap-[10px]">
  //               <span>{address && shortenAddress(address)}</span>
  //               <button
  //                 className=" rounded p-2 hover:bg-black hover:bg-opacity-20"
  //                 onClick={() => {
  //                   navigator.clipboard.writeText(address)
  //                 }}
  //               >
  //                 <Copy className="size-4" />
  //               </button>
  //             </div>

  //             <Button onClick={doDisconnect}>Disconect</Button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}
