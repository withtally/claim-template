import { useDisclosure } from "@chakra-ui/hooks";
import React, { ReactNode, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { WalletConnectPopup } from "~/components/Layout/WalletConnect/WalletConnectPopup";

type WalletConnectContextType = {
  isConnectPopupVisible: boolean;
  onOpenConnectPopup: () => void;
  onCloseConnectPopup: () => void;
  onOpenAndCheckEligibility: () => void;
};

const WalletConnectContext = createContext<
  WalletConnectContextType | undefined
>(undefined);

const useWalletConnectContext = () => {
  const context = useContext(WalletConnectContext);
  if (!context) {
    throw new Error(
      "WalletConnectContext must be used within a WalletConnectContextProvider",
    );
  }
  return context;
};

const WalletConnectContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    isOpen: isConnectPopupVisible,
    onOpen: onOpenConnectPopup,
    onClose: onCloseConnectPopup,
  } = useDisclosure();


  const onOpenAndCheckEligibility = () => {
    localStorage.setItem("isCheckEligibility","true");
    onOpenConnectPopup();
  };

  return (
    <WalletConnectContext.Provider
      value={{
        isConnectPopupVisible,
        onOpenConnectPopup,
        onCloseConnectPopup,
        onOpenAndCheckEligibility,
      }}
    >
      {children}
      <WalletConnectPopup
        isOpen={isConnectPopupVisible}
        onCloseConnectPopup={onCloseConnectPopup}
      />
    </WalletConnectContext.Provider>
  );
};

export {
  WalletConnectContext,
  WalletConnectContextProvider,
  useWalletConnectContext,
};
