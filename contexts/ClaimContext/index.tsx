import React, { ReactNode, createContext, useContext } from "react";
import { useCheckEligibility } from "~/hooks/ClaimHooks/useCheckEligibility";

type ClaimContextType = {
  isClaimStepperVisible: boolean;
  setIsClaimStepperVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowClaimStepper: () => void
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
    isClaimStepperVisible,
    setIsClaimStepperVisible,
    handleShowClaimStepper,
  } = useCheckEligibility();

  const contextValues: ClaimContextType = {
    isClaimStepperVisible,
    setIsClaimStepperVisible,
    handleShowClaimStepper,
  };

  return (
    <ClaimContext.Provider value={contextValues}>
      {children}
    </ClaimContext.Provider>
  );
};

export { ClaimContext, ClaimContextProvider, useClaimContext };
