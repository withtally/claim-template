import { readContract, signTypedData, writeContract } from "@wagmi/core";
import { useClaimContext } from "contexts/ClaimContext";
import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { parse } from "uuid";
import { bytesToHex } from "viem";
import { useAccount, type BaseError } from "wagmi";
import { Address, Proof } from "~/types/common";
import { config } from "../../config/wagmi/config";
import { default as claimCampaignAbi } from "../../libs/abis/delegated.claim.abi";
import { getUnixTimeHourFromNow } from "../../libs/helpers/getUnixTimeHourFromNow";

interface IClaimAndDelegateArguments {
  delegateeAddress: Address;
  usersProof: Proof;
}

interface IClaimAndDelegateReturn {
  hash?: `0x${string}`;
  error?: boolean;
  errorMessage?: string;
}

interface IGetSignatureArguments {
  tokenDomain: readonly [
    `0x${string}`,
    string,
    string,
    bigint,
    `0x${string}`,
    `0x${string}`,
    readonly bigint[],
  ];
  nonce: number;
  expiry: bigint;
  delegateeAddress: Address;
}

interface IOnClaimArguments {
  usersProof: Proof;
  onSubmit: () => void;
}

export const useClaimAndDelegate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [claimError, setClaimError] = useState(false);

  const { selectedDelegate, setTransactionHash } = useClaimContext();
  const { address, chainId } = useAccount();

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address;
  const campaignUUID = process.env.NEXT_PUBLIC_CAMPAIGN_UUID;
  const token = process.env.NEXT_PUBLIC_TOKEN as Address;

  const getDomain = useCallback(async () => {
    const tokenDomain = await readContract(config, {
      abi: claimCampaignAbi,
      address: token,
      functionName: "eip712Domain",
    });

    return tokenDomain;
  }, []);

  const getSignature = useCallback(
    async ({
      tokenDomain,
      delegateeAddress,
      nonce,
      expiry,
    }: IGetSignatureArguments) => {
      return signTypedData(config, {
        account: address,
        domain: {
          name: tokenDomain[1],
          version: tokenDomain[2],
          chainId: Number(tokenDomain[3]),
          verifyingContract: tokenDomain[4],
        },
        types: {
          Delegation: [
            { name: "delegatee", type: "address" },
            { name: "nonce", type: "uint256" },
            { name: "expiry", type: "uint256" },
          ],
        },
        primaryType: "Delegation",
        message: {
          delegatee: delegateeAddress,
          nonce: BigInt(nonce),
          expiry: BigInt(expiry),
        },
      });
    },
    [getDomain],
  );

  const claimAndDelegateTokens = async ({
    delegateeAddress,
    usersProof,
  }: IClaimAndDelegateArguments): Promise<IClaimAndDelegateReturn> => {
    try {
      const expiry = BigInt(getUnixTimeHourFromNow());
      const nonce = 0;
      const tokenDomain = await getDomain();

      const signature = await getSignature({
        delegateeAddress,
        expiry,
        nonce,
        tokenDomain,
      });

      // TODO: remove this piece of code
      // allows to do claim to everyone
      // fake delegation
      // return {
      //   hash: "0xe48a25ea1fd7354ddf71b5d90404cfcf87fca78104491ce8ee8cb55bf5d6fc1c",
      // };

      if (signature) {
        const bytesArray = parse(campaignUUID);
        const hexId = bytesToHex(bytesArray);
        const { amount, proof } = usersProof;

        const { r, s, v } = ethers.Signature.from(signature);

        const hash = await writeContract(config, {
          abi: claimCampaignAbi,
          address: contractAddress,
          functionName: "claimAndDelegate",
          args: [
            hexId,
            proof,
            BigInt(amount),
            delegateeAddress,
            {
              nonce: BigInt(nonce),
              expiry: BigInt(expiry),
              v,
              r,
              s,
            },
          ],
          account: address,
          chain: chainId,
          gas: undefined,
        });

        return { hash };
      }
    } catch (error) {
      const typedError = error as BaseError;
      return { error: true, errorMessage: typedError.shortMessage };
    }
  };

  const onClaim = useCallback(
    async ({ onSubmit, usersProof }: IOnClaimArguments) => {
      setClaimError(false);
      setIsSubmitting(true);

      const claimResult = await claimAndDelegateTokens({
        delegateeAddress: selectedDelegate.account.address as Address,
        usersProof,
      });

      if (claimResult.error) {
        setClaimError(true);
        setIsSubmitting(false);
        return;
      }

      if (claimResult.hash) {
        setTransactionHash(claimResult.hash as `0x${string}`);
        onSubmit();
        setIsSubmitting(false);
      }
      setIsSubmitting(false);
    },
    [claimAndDelegateTokens],
  );

  return {
    isSubmitting,
    claimError,
    onClaim,
    selectedDelegate,
  };
};
