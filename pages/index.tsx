import { useClaimContext } from "contexts/ClaimContext";
import { FC, useMemo } from "react";
import AnimateOnUpdate from "~/components/Layout/AnimateOnUpdate";
import Header from "~/components/Pages/Home/Header";
import ProgessionStepper from "~/components/ProgressionStepper";
import DelegateStep from "~/components/ProgressionStepper/Steps/Delegate";
import InitialScreen from "~/components/ProgressionStepper/Steps/Initial";
import { SEO } from "~/components/SEO";
import ClaimStep from "~/components/ProgressionStepper/Steps/Claim";
import { ClaimStatusEnum } from "~/types/common"
import ClaimDenied from "~/components/ProgressionStepper/Steps/ClaimDenied"

const HireReactDeveloperPage: FC = () => {

  const {
    areDataFetched,
    isClaimStepperVisible,
    isCheckingEligibility,
    handleCheckEligibility,
    claimStatus
  } = useClaimContext();

  const components = useMemo(() => {
    if(claimStatus === ClaimStatusEnum.ELIGIBLE){
      return [InitialScreen, DelegateStep, ClaimStep]
    }else{
      return [ClaimDenied]
    }
  },[claimStatus]);
  return (
    <>
      <SEO title="Home" />
      <AnimateOnUpdate
        updateKey={isClaimStepperVisible}
        className="flex max-h-svh flex-col"
      >
        {!isClaimStepperVisible ? (
          <Header
            onClick={handleCheckEligibility}
            areDataFetched={areDataFetched}
            isCheckingEligibility={isCheckingEligibility}
          />
        ) : (
          <ProgessionStepper
            components={components}
            totalSteps={components.length}
          />
        )}
      </AnimateOnUpdate>
    </>
  );
};

export default HireReactDeveloperPage;
