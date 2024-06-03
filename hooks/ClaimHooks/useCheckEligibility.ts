import { readContract } from "@wagmi/core";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAccount } from "wagmi";
import { useGetProofs } from "~/hooks/ClaimHooks/useGetProofs";
import { Address, ClaimStatusEnum, Proof } from "~/types/common";
import { config } from "../../config/wagmi/config";
import abi from "../../libs/abis/delegated.claim.abi";
import { parseUuidToHex } from "../../libs/helpers/parseUuidToHex";
import useCustomToasters from "../useToasters";

export const useCheckEligibility = () => {
  const [proofs, setProofs] = useState<Proof | null>(null);
  const [isClaimStepperVisible, setIsClaimStepperVisible] = useState(false);
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
  const [claimStatus, setClaimStatus] = useState<ClaimStatusEnum>(
    ClaimStatusEnum.UNKNOWN,
  );

  const { proofs: proofsToCheck, isFetched: isProofsFetched } = useGetProofs();
  const { address, isDisconnected } = useAccount();
  const { infoToast } = useCustomToasters();

  useEffect(() => {
    if (Boolean(address)) {
      setIsClaimStepperVisible(false);
    }
  }, [address]);

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const campaignUUID = process.env.NEXT_PUBLIC_CAMPAIGN_UUID;

  const handleCheckEligibility = useCallback(
    async (_event: SyntheticEvent, passedAddress?: Address) => {
      // TODO: remove this piece of code
      // makes everyone eligible
      // fake delegation
      setClaimStatus(ClaimStatusEnum.ELIGIBLE);
      setIsClaimStepperVisible(true);
      setProofs({amount: '1000', proof: ['0x0000000000000000000000000000000000000000000000000000000000000000']});
      return;

      try {
        const addressToUse = passedAddress || address;
        setIsCheckingEligibility(true);
        if (isDisconnected && !passedAddress) {
          infoToast({
            title: "Wallet is not connected",
            description:
              "You need to connect wallet before checking eligibility",
          });
          return;
        }

        // look for valid proof for the address
        const proofsAndAmount = proofsToCheck.find(
          (proof) =>
            proof.address.toLocaleLowerCase() ===
            addressToUse.toLocaleLowerCase(),
        );

        if (!proofsAndAmount) {
          setProofs(null);
          setClaimStatus(ClaimStatusEnum.NOT_ELIGIBLE);
          setIsClaimStepperVisible(true);
          return;
        }
        setProofs({
          amount: `${proofsAndAmount.amount}`,
          proof: proofsAndAmount.proof,
        });

        const hexId = parseUuidToHex(campaignUUID);

        const walletAlreadyClaimed = await readContract(config, {
          abi,
          address: contractAddress as Address,
          args: [hexId, addressToUse],
          functionName: "claimed",
        });

        if (walletAlreadyClaimed) {
          setClaimStatus(ClaimStatusEnum.ALREADY_CLAIMED);
          setIsClaimStepperVisible(true);
          return;
        }

        setClaimStatus(ClaimStatusEnum.ELIGIBLE);
        setIsClaimStepperVisible(true);
      } catch (error) {
        setProofs(null);
        setClaimStatus(ClaimStatusEnum.NOT_ELIGIBLE);
      } finally {
        setIsCheckingEligibility(false);
      }
    },
    [isDisconnected, proofsToCheck, address, isProofsFetched],
  );

  const checkEligibilityOfAnotherWallet = useCallback(
    async (address: Address): Promise<ClaimStatusEnum> => {
      setIsCheckingEligibility(true);
      try {
        const proofs = proofsToCheck.find(
          (proof) =>
            proof.address.toLocaleLowerCase() === address.toLocaleLowerCase(),
        );

        const hexId = parseUuidToHex(campaignUUID);
        const walletAlreadyClaimed = await readContract(config, {
          abi,
          address: contractAddress as Address,
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
        if (error.name === "InvalidAddressError") {
          infoToast({ title: "Please enter a valid ETH address" });
          return ClaimStatusEnum.INVALID_ADDRESS;
        }
      } finally {
        setIsCheckingEligibility(false);
      }
    },
    [proofsToCheck],
  );

  const areDataFetched = useMemo(() => isProofsFetched, [isProofsFetched]);

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
