import { useClaimContext } from "contexts/ClaimContext";
import React, { FC, useMemo } from "react";
import AnimateOnUpdate from "~/components/Layout/AnimateOnUpdate";
import Header from "~/components/Pages/Home/Header";
import ProgessionStepper from "~/components/ProgressionStepper";
import ClaimStep from "~/components/ProgressionStepper/Steps/Claim";
import ClaimDenied from "~/components/ProgressionStepper/Steps/ClaimDenied";
import DelegateStep from "~/components/ProgressionStepper/Steps/Delegate";
import InitialScreen from "~/components/ProgressionStepper/Steps/Initial";
import { SEO } from "~/components/SEO";
import { ClaimStatusEnum } from "~/types/common";
import { useWalletConnectContext } from '../contexts/WalletConnectContext'

const HireReactDeveloperPage: FC = () => {
  const {
    areDataFetched,
    isClaimStepperVisible,
    isCheckingEligibility,
    claimStatus,
    proofs,
  } = useClaimContext();

  const { onOpenAndCheckEligibility } = useWalletConnectContext();

  const components = useMemo(() => {
    if (claimStatus === ClaimStatusEnum.ELIGIBLE) {
      return [InitialScreen, DelegateStep, ClaimStep];
    } else {
      return [ClaimDenied];
    }
  }, [claimStatus]);

  return (
    <>
      <SEO title="Home" />
      <AnimateOnUpdate
        updateKey={isClaimStepperVisible}
        className="flex max-h-svh flex-col"
      >
        {!isClaimStepperVisible ? (
          <Header
            onClick={onOpenAndCheckEligibility}
            areDataFetched={areDataFetched}
            isCheckingEligibility={isCheckingEligibility}
          />
        ) : (
          <ProgessionStepper
            components={components}
            totalSteps={components.length - 1}
            proof={proofs}
          />
        )}
      </AnimateOnUpdate>
    </>
  );
};

export default HireReactDeveloperPage;
