import React, { createContext, useState, useContext, ReactNode } from 'react'
import { useAccount } from 'wagmi'
import { WalletConnectPopup } from '~/components/Layout/WalletConnect/WalletConnectPopup'
import { useDisclosure } from '@chakra-ui/hooks'

type WalletConnectContextType = {
  isConnectPopupVisible: boolean
  onOpenConnectPopup: () => void
  onCloseConnectPopup: () => void
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
  const { isOpen: isConnectPopupVisible, onOpen: onOpenConnectPopup, onClose: onCloseConnectPopup } = useDisclosure()
  const { isConnected } = useAccount()

  return (
    <WalletConnectContext.Provider value={{ isConnectPopupVisible, onOpenConnectPopup, onCloseConnectPopup }}>
      {children}
      <WalletConnectPopup isOpen={isConnectPopupVisible} onCloseConnectPopup={onCloseConnectPopup}/>
    </WalletConnectContext.Provider>
  )
}

export { WalletConnectContext, WalletConnectContextProvider, useWalletConnectContext }
