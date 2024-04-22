import { useClaimContext } from "contexts/ClaimContext";
import { FC, useMemo } from 'react'
import AnimateOnUpdate from "~/components/Layout/AnimateOnUpdate";
import Header from "~/components/Pages/Home/Header";
import ProgessionStepper from "~/components/ProgressionStepper";
import DelegateStep from "~/components/ProgressionStepper/Steps/Delegate";
import InitialScreen from "~/components/ProgressionStepper/Steps/Initial";
import { SEO } from "~/components/SEO";
import ClaimStep from "~/components/ProgressionStepper/Steps/Claim";

const HireReactDeveloperPage: FC = () => {

  const { isMerkleTreeFetched, isClaimStepperVisible, handleCheckEligibility, claimStatus } =
    useClaimContext();

  const components = [InitialScreen, DelegateStep, ClaimStep];
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
            isMerkleTreeFetched={isMerkleTreeFetched}
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
