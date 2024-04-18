import { useCallback, useState } from "react";
import { useAccount } from "wagmi";
import useCustomToasters from "~/hooks/useToasters";

export const useCheckEligibility = () => {
  const [isClaimStepperVisible, setIsClaimStepperVisible] = useState(false);

  const { isDisconnected } = useAccount();
  const { infoToast } = useCustomToasters();

  const handleShowClaimStepper = useCallback(() => {
    if (isDisconnected) {
      infoToast({
        title: "Wallet is not connected",
        description: "You need to connect wallet before checking eligibility",
      });
      return;
    }
    setIsClaimStepperVisible(true);
  }, [isDisconnected]);

  return {
    isClaimStepperVisible,
    setIsClaimStepperVisible,
    handleShowClaimStepper,
  };
};
