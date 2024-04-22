import React, { ReactNode, createContext, useContext } from "react";
import { useCheckEligibility } from "~/hooks/ClaimHooks/useCheckEligibility";
import { Address, ClaimStatusEnum, Proof } from "~/types/common";

type ClaimContextType = {
  proofs: Proof | undefined;
  areDataFetched: boolean;
  claimStatus: ClaimStatusEnum;
  isClaimStepperVisible: boolean;
  isCheckingEligibility: boolean;
  setIsClaimStepperVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleCheckEligibility: () => void;
  checkEligibilityOfAnotherWallet: (address: Address) => Promise<boolean>;
};

const ClaimContext = createContext<ClaimContextType | undefined>(undefined);

const useClaimContext = () => {
  const context = useContext(ClaimContext);
  if (!context) {
    throw new Error("ClaimContext must be used within a ClaimContextProvider");
  }
  return context;
};

const ClaimContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    proofs,
    areDataFetched,
    isClaimStepperVisible,
    claimStatus,
    isCheckingEligibility,
    setIsClaimStepperVisible,
    handleCheckEligibility,
    checkEligibilityOfAnotherWallet,
  } = useCheckEligibility();

  const contextValues: ClaimContextType = {
    proofs,
    areDataFetched,
    claimStatus,
    isClaimStepperVisible,
    isCheckingEligibility,
    setIsClaimStepperVisible,
    handleCheckEligibility,
    checkEligibilityOfAnotherWallet,
  };

  return (
    <ClaimContext.Provider value={contextValues}>
      {children}
    </ClaimContext.Provider>
  );
};

export { ClaimContext, ClaimContextProvider, useClaimContext };
