import { readContract } from "@wagmi/core";
import { SyntheticEvent, useCallback, useMemo, useState } from 'react'
import { useAccount } from "wagmi";
import { Address, ClaimStatusEnum, Proof } from "~/types/common";
import { config } from "../../config/wagmi/config";
import abi from "../../libs/abis/delegated.claim.abi";
import { getProofs } from "../../libs/helpers/getProofs";
import { parseUuidToHex } from "../../libs/helpers/parseUuidToHex";
import useCustomToasters from "../useToasters";
import { useGetMerkleTree } from "./useGetMerkleTree";

export const useCheckEligibility = () => {
  const [proofs, setProofs] = useState<Proof | null>(null);
  const [isClaimStepperVisible, setIsClaimStepperVisible] = useState(false);
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
  const [claimStatus, setClaimStatus] = useState<ClaimStatusEnum>(
    ClaimStatusEnum.UNKNOWN,
  );

  const { merkleTree, isFetched: isMerkleTreeFetched } = useGetMerkleTree();
  const { address, isDisconnected } = useAccount();
  const { infoToast, errorToast } = useCustomToasters();

  // TODO: use values from config
  const contractAddress = "0x923b523b8ca37c5ea7bd990d1a98293495812be6";
  const campaignUUID = "e59423ae-e725-4dd6-8211-0d09216ef28f";

  const handleCheckEligibility = useCallback(async (_event: SyntheticEvent, passedAddress?: Address) => {
    try {
      const addressToUse = passedAddress || address;
      setIsCheckingEligibility(true);
      if (isDisconnected && !passedAddress) {
        infoToast({
          title: "Wallet is not connected",
          description: "You need to connect wallet before checking eligibility",
        });
        return;
      }

      const proofsAndAmount = getProofs(merkleTree, addressToUse);

      if (!proofsAndAmount) {
        setProofs(null);
        setClaimStatus(ClaimStatusEnum.NOT_ELIGIBLE);
        setIsClaimStepperVisible(true);
        return;
      }

      const hexId = parseUuidToHex(campaignUUID);
      const walletAlreadyClaimed = await readContract(config, {
        abi,
        address: contractAddress,
        args: [hexId, addressToUse],
        functionName: "claimed",
      });

      if (walletAlreadyClaimed) {
        setClaimStatus(ClaimStatusEnum.ALREADY_CLAIMED);
        setIsClaimStepperVisible(true);
        return;
      }

      setProofs(proofsAndAmount);
      setClaimStatus(ClaimStatusEnum.ELIGIBLE);
      setIsClaimStepperVisible(true);
    } catch (error) {
      setProofs(null);
      setClaimStatus(ClaimStatusEnum.NOT_ELIGIBLE);
    } finally {
      setIsCheckingEligibility(false);
    }
  }, [isDisconnected, merkleTree, address, isMerkleTreeFetched]);

  const checkEligibilityOfAnotherWallet = useCallback(
    async (address: Address): Promise<ClaimStatusEnum> => {
      setIsCheckingEligibility(true);
      try {
        const proofs = getProofs(merkleTree, address);
        const hexId = parseUuidToHex(campaignUUID);
        const walletAlreadyClaimed = await readContract(config, {
          abi,
          address: contractAddress,
          args: [hexId, address],
          functionName: "claimed",
        });

        if (walletAlreadyClaimed) {
          return ClaimStatusEnum.ALREADY_CLAIMED;
        }

        if (!proofs) {
          return ClaimStatusEnum.NOT_ELIGIBLE;
        }

        return ClaimStatusEnum.ELIGIBLE;
      } catch (error) {
        console.error(error);
        if(error.name === 'InvalidAddressError'){
          infoToast({title: 'Please enter a valid ETH address'})
        }
      } finally {
          setIsCheckingEligibility(false);
      }
    },
    [merkleTree],
  );

  const areDataFetched = useMemo(
    () => isMerkleTreeFetched,
    [isMerkleTreeFetched],
  );

  return {
    proofs,
    areDataFetched,
    claimStatus,
    isClaimStepperVisible,
    isCheckingEligibility,
    setIsClaimStepperVisible,
    handleCheckEligibility,
    checkEligibilityOfAnotherWallet,
  };
};
