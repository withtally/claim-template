import React, { createContext, useState, useContext, ReactNode } from 'react'
import { WalletConnectPopup } from '~/components/Layout/WalletConnect/WalletConnectPopup'

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

  return (
    <WalletConnectContext.Provider value={{ isConnectConnectPopupVisible, setConnectConnectPopupVisibility }}>
      {children}
      {isConnectConnectPopupVisible && <WalletConnectPopup />}
    </WalletConnectContext.Provider>
  )
}

export { WalletConnectContext, WalletConnectContextProvider, useWalletConnectContext }
