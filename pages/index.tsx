import { useClaimContext } from "contexts/ClaimContext";
import React, { FC, useMemo } from 'react'
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
import ClaimSuccess from '~/components/ProgressionStepper/Steps/ClaimSuccess'
import { useAccount } from 'wagmi'
import { useHomePageLogic } from '~/hooks/useHomePageLogic'

// TODO: Rename component
const HomePage: FC = () => {

  const {
    areDataFetched,
    isClaimStepperVisible,
    isCheckingEligibility,
    proofs,
    components,
    checkEligibility
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
