import React, {
  ReactNode,
  SyntheticEvent,
  createContext,
  useContext,
} from "react";
import { useCheckEligibility } from "~/hooks/ClaimHooks/useCheckEligibility";
import { useDelegateSelector } from "~/hooks/delegateStep/useDelegateSelection";
import { useHash } from "~/hooks/useHash";
import { Address, ClaimStatusEnum, Proof } from "~/types/common";
import { Delegate } from "~/types/delegate";

type ClaimContextType = {
  transactionHash: Address;
  setTransactionHash: React.Dispatch<React.SetStateAction<Address>>;
  proofs: Proof | undefined;
  areDataFetched: boolean;
  claimStatus: ClaimStatusEnum;
  isClaimStepperVisible: boolean;
  isCheckingEligibility: boolean;
  setIsClaimStepperVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleCheckEligibility: (
    event: SyntheticEvent,
    passedAddress?: Address,
  ) => Promise<void>;
  checkEligibilityOfAnotherWallet: (
    address: Address,
  ) => Promise<ClaimStatusEnum>;
  selectedDelegate: Delegate;
  onDelegateSelect: (delegate: Delegate) => void;
  delegateToMyself: (onSubmit: () => void) => void;
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
  const { transactionHash, setTransactionHash } = useHash();

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

  const { selectedDelegate, onDelegateSelect, delegateToMyself } = useDelegateSelector();

  const contextValues: ClaimContextType = {
    transactionHash,
    setTransactionHash,
    proofs,
    areDataFetched,
    claimStatus,
    isClaimStepperVisible,
    isCheckingEligibility,
    setIsClaimStepperVisible,
    handleCheckEligibility,
    checkEligibilityOfAnotherWallet,
    selectedDelegate,
    onDelegateSelect,
    delegateToMyself,
  };

  return (
    <ClaimContext.Provider value={contextValues}>
      {children}
    </ClaimContext.Provider>
  );
};

export { ClaimContext, ClaimContextProvider, useClaimContext };
