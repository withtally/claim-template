import { Dispatch, FC, SetStateAction } from "react";
import { useAccount } from "wagmi";
import AnimateOnUpdate from "~/components/Layout/AnimateOnUpdate";
import Header from "~/components/Pages/Home/Header";
import ProgessionStepper from "~/components/ProgressionStepper";
import DelegateStep from "~/components/ProgressionStepper/Steps/Delegate";
import InitialScreen from "~/components/ProgressionStepper/Steps/Initial";
import { SEO } from "~/components/SEO";
import useCustomToasters from "~/hooks/useToasters";

interface Props {
  isClaimStepperVisible: boolean;
  setIsClaimStepperVisible: Dispatch<SetStateAction<boolean>>;
}

const HireReactDeveloperPage: FC<Props> = ({
  isClaimStepperVisible,
  setIsClaimStepperVisible,
}) => {
  const components = [InitialScreen, /* ClaimStep, */ DelegateStep];
  const { isConnected } = useAccount();

  const { infoToast } = useCustomToasters();

  const handleShowClaimStepper = () => {
    if (!isConnected) {
      infoToast({
        title: "Wallet is not connected",
        description: "You need to connect wallet before checking eligibility",
      });
      return;
    }
    setIsClaimStepperVisible(true);
  };

  return (
    <>
      <SEO title="Home" />
      <AnimateOnUpdate
        updateKey={isClaimStepperVisible}
        className="flex max-h-svh flex-col"
      >
        {!isClaimStepperVisible ? (
          <Header onClick={handleShowClaimStepper} />
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
