import { useDisclosure } from "@chakra-ui/hooks";
import React, { ReactNode, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { WalletConnectPopup } from "~/components/Layout/WalletConnect/WalletConnectPopup";

type WalletConnectContextType = {
  isConnectPopupVisible: boolean;
  onOpenConnectPopup: () => void;
  onCloseConnectPopup: () => void;
  onOpenAndCheckEligibility: () => void;
  isCheckEligibility: boolean;
  setIsCheckEligibility: Dispatch<SetStateAction<boolean>>;
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

  const [isCheckEligibility, setIsCheckEligibility] = useState<boolean>(false);

  const onOpenAndCheckEligibility = () => {
    setIsCheckEligibility(true);
    onOpenConnectPopup();
  };

  return (
    <WalletConnectContext.Provider
      value={{
        isConnectPopupVisible,
        onOpenConnectPopup,
        onCloseConnectPopup,
        onOpenAndCheckEligibility,
        setIsCheckEligibility,
        isCheckEligibility
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
