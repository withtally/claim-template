import React, { ReactNode, createContext, useContext } from "react";
import { useCheckEligibility } from "~/hooks/ClaimHooks/useCheckEligibility";
import { ClaimStatusEnum, Proof } from "~/types/common";
import { useDelegateSelector } from '~/hooks/delegateStep/useDelegateSelection'
import { Delegate } from '~/types/delegate'

type ClaimContextType = {
  proofs: Proof | undefined;
  isMerkleTreeFetched: boolean;
  claimStatus: ClaimStatusEnum;
  isClaimStepperVisible: boolean;
  setIsClaimStepperVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleCheckEligibility: () => void;
  selectedDelegate: Delegate;
  onDelegateSelect: (delegate: Delegate) => void;
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
    isMerkleTreeFetched,
    isClaimStepperVisible,
    claimStatus,
    setIsClaimStepperVisible,
    handleCheckEligibility,
  } = useCheckEligibility();

  const { selectedDelegate, onDelegateSelect } = useDelegateSelector();

  const contextValues: ClaimContextType = {
    proofs,
    isMerkleTreeFetched,
    claimStatus,
    isClaimStepperVisible,
    setIsClaimStepperVisible,
    handleCheckEligibility,
    selectedDelegate,
    onDelegateSelect,
  };

  return (
    <ClaimContext.Provider value={contextValues}>
      {children}
    </ClaimContext.Provider>
  );
};

export { ClaimContext, ClaimContextProvider, useClaimContext };
