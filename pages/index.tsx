import { useClaimContext } from "contexts/ClaimContext";
import { FC } from "react";
import AnimateOnUpdate from "~/components/Layout/AnimateOnUpdate";
import Header from "~/components/Pages/Home/Header";
import ProgessionStepper from "~/components/ProgressionStepper";
import DelegateStep from "~/components/ProgressionStepper/Steps/Delegate";
import InitialScreen from "~/components/ProgressionStepper/Steps/Initial";
import { SEO } from "~/components/SEO";

const HireReactDeveloperPage: FC = () => {
  const components = [InitialScreen, /* ClaimStep, */ DelegateStep];

  const {
    areDataFetched,
    isClaimStepperVisible,
    isCheckingEligibility,
    handleCheckEligibility,
  } = useClaimContext();

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
