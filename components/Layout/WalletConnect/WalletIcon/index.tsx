import { FC } from 'react'
import Metamask from '../../../../public/img/icons/metamask.svg'
import WalletConnect from '../../../../public/img/icons/WalletConnect.svg'
import CoinbaseWallet from '../../../../public/img/icons/CoinbaseWallet.svg'
import { WalletConnectors } from '~/types/wallet-connectors'

interface Props {
  className: string
  walletName: WalletConnectors
}

export const WalletIcon: FC<Props> = ({ className, walletName }) => {
  switch (walletName) {
    case 'MetaMask':
      return <Metamask className={className} />
    case 'Coinbase Wallet':
      return <CoinbaseWallet className={className} />
    case 'WalletConnect':
      return <WalletConnect className={className} />
    default:
      break
  }
}
