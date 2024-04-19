import { useCallback, useState } from "react";
import { useAccount } from "wagmi";
import { ClaimStatusEnum, Proof } from "~/types/common";
import { getProofs } from "../../libs/helpers/getProofs";
import useCustomToasters from "../useToasters";
import { useGetMerkleTree } from "./useGetMerkleTree";

export const useCheckEligibility = () => {
  const [proofs, setProofs] = useState<Proof | null>(null);
  const [claimStatus, setClaimStatus] = useState<ClaimStatusEnum>(
    ClaimStatusEnum.UNKNOWN,
  );
  const [isClaimStepperVisible, setIsClaimStepperVisible] = useState(false);
  const { merkleTree, isFetched: isMerkleTreeFetched } = useGetMerkleTree();
  const { address, isDisconnected } = useAccount();
  const { infoToast } = useCustomToasters();

  const handleCheckEligibility = useCallback(() => {
    if (isDisconnected) {
      infoToast({
        title: "Wallet is not connected",
        description: "You need to connect wallet before checking eligibility",
      });
      return;
    }

    const proofs = getProofs(merkleTree, address);

    if (!proofs) {
      infoToast({
        title: "Wallet is not eligible",
        description: "You need to connect eligible wallet to make a claim",
      });
      setProofs(null);
      setClaimStatus(ClaimStatusEnum.NOT_ELIGIBLE);
      return;
    }

    setProofs(proofs);

    setIsClaimStepperVisible(true);
  }, [isDisconnected, merkleTree, address]);

  return {
    proofs,
    isMerkleTreeFetched,
    claimStatus,
    isClaimStepperVisible,
    setIsClaimStepperVisible,
    handleCheckEligibility,
  };
};
