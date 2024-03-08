import React, { createContext, useState, useContext, ReactNode } from 'react'
import { useAccount } from 'wagmi'
import { WalletConnectPopup } from '~/components/Layout/WalletConnect/WalletConnectPopup'
import { WalletDisconnectPopup } from '~/components/Layout/WalletConnect/WalletDisconnectPopup'

type WalletConnectContextType = {
  isConnectConnectPopupVisible: boolean
  setConnectConnectPopupVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const WalletConnectContext = createContext<WalletConnectContextType | undefined>(undefined)

const useWalletConnectContext = () => {
  const context = useContext(WalletConnectContext)
  if (!context) {
    throw new Error('WalletConnectContext must be used within a WalletConnectContextProvider')
  }
  return context
}

const WalletConnectContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnectConnectPopupVisible, setConnectConnectPopupVisibility] = useState<boolean>(false)
  const { isConnected } = useAccount()

  const PopUp = isConnected ? WalletDisconnectPopup : WalletConnectPopup;

  return (
    <WalletConnectContext.Provider value={{ isConnectConnectPopupVisible, setConnectConnectPopupVisibility }}>
      {children}
      {isConnectConnectPopupVisible && <WalletConnectPopup />}
    </WalletConnectContext.Provider>
  )
}

export { WalletConnectContext, WalletConnectContextProvider, useWalletConnectContext }
