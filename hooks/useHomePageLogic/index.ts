import { useClaimContext } from '../../contexts/ClaimContext'
import { useAccount } from 'wagmi'
import { useWalletConnectContext } from '../../contexts/WalletConnectContext'
import { useCallback, useMemo } from 'react'
import { ClaimStatusEnum } from '~/types/common'
import InitialScreen from '~/components/ProgressionStepper/Steps/Initial'
import DelegateStep from '~/components/ProgressionStepper/Steps/Delegate'
import ClaimStep from '~/components/ProgressionStepper/Steps/Claim'
import ClaimSuccess from '~/components/ProgressionStepper/Steps/ClaimSuccess'
import ClaimDenied from '~/components/ProgressionStepper/Steps/ClaimDenied'

export const useHomePageLogic = () => {
  const {
    areDataFetched,
    isClaimStepperVisible,
    isCheckingEligibility,
    handleCheckEligibility,
    claimStatus,
    proofs,
  } = useClaimContext();

  const { isConnected } = useAccount();

  const { onOpenAndCheckEligibility } = useWalletConnectContext();

  const components = useMemo(() => {
    if (claimStatus === ClaimStatusEnum.ELIGIBLE) {
      return [InitialScreen, DelegateStep, ClaimStep, ClaimSuccess];
    } else {
      return [ClaimDenied];
    }
  }, [claimStatus]);

  const checkEligibility = useCallback(() => {
      isConnected ? handleCheckEligibility(null) : onOpenAndCheckEligibility()
  }, [isConnected, handleCheckEligibility, onOpenAndCheckEligibility])

  return {
    areDataFetched,
    isClaimStepperVisible,
    isCheckingEligibility,
    proofs,
    components,
    checkEligibility
  }
}