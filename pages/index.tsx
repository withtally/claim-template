import { FC } from "react";
import AnimateOnUpdate from "~/components/Layout/AnimateOnUpdate";
import Header from "~/components/Pages/Home/Header";
import ProgessionStepper from "~/components/ProgressionStepper";
import { SEO } from "~/components/SEO";
import { useHomePageLogic } from "~/hooks/useHomePageLogic";

export const metadata = {
  icons: {
    icon: "../punlic/favicon.png", // /public path
  },
};

const HomePage: FC = () => {
  const {
    areDataFetched,
    isClaimStepperVisible,
    isCheckingEligibility,
    proofs,
    components,
    checkEligibility,
  } = useHomePageLogic();

  return (
    <>
      <SEO title="Home" />
      <AnimateOnUpdate
        updateKey={isClaimStepperVisible}
        className="flex max-h-svh flex-col"
      >
        {!isClaimStepperVisible ? (
          <Header
            onClick={checkEligibility}
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

export default HomePage;
