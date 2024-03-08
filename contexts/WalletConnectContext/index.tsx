import React, { createContext, useState, useContext, ReactNode } from 'react'
import { useAccount } from 'wagmi'
import { WalletConnectPopup } from '~/components/Layout/WalletConnect/WalletConnectPopup'

type WalletConnectContextType = {
  isConnectPopupVisible: boolean
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
  const [isConnectPopupVisible, setConnectConnectPopupVisibility] = useState<boolean>(false)
  const { isConnected } = useAccount()

  return (
    <WalletConnectContext.Provider value={{ isConnectPopupVisible, setConnectConnectPopupVisibility }}>
      {children}
      {isConnectPopupVisible && <WalletConnectPopup />}
    </WalletConnectContext.Provider>
  )
}

export { WalletConnectContext, WalletConnectContextProvider, useWalletConnectContext }
