import { Button } from "@chakra-ui/react";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { signTypedData, writeContract } from "@wagmi/core";
import { ethers } from "ethers";
import { FC } from "react";
import { parse } from "uuid";
import { bytesToHex, erc20Abi } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { config } from "../../../../../config/wagmi/config";
import claimCampaignAbi from "../../../../../libs/abis/delegated.claim.abi";

export const TreeCreator: FC = () => {
  const { address, chainId } = useAccount();

  const token = "0xdF0A43D15B036c065f6895734B878fD31269Bfa3";
  const contractAddress = "0x923b523b8ca37c5ea7bd990d1a98293495812be6";
  const campaignUUID = "e59423ae-e725-4dd6-8211-0d09216ef28f";
  const addressOfThePersonIDelegateTo =
    "0x301a09CaDB9c682aEd7f7BaB0e83B660bb223F81";

  const { data, refetch } = useReadContract({
    abi: claimCampaignAbi,
    address: token,
    functionName: "eip712Domain",
  });

  console.log(data);
  

  const getUnixTimeThirtyMinutesFromNow = () => {
    const now = new Date(); // Get the current date and time
    const later = new Date(now.getTime() + 60 * 60 * 24 * 7 * 1000);
    return Math.floor(later.getTime() / 1000); // Convert to Unix timestamp and return
  };

  const approveMerkleTreeCreation = async () => {
    const hash = await writeContract(config, {
      address: token,
      functionName: "approve",
      abi: erc20Abi,
      args: [contractAddress, BigInt("10000")],
      account: address as `0x${string}`,
      chain: chainId,
    });
  };

  const createMerkleTree = async () => {
    try {
      const bytesArray = parse(campaignUUID);
      const hexId = bytesToHex(bytesArray);
      const response = await fetch(
        "https://d2ydy7et7ob3l7.cloudfront.net/e59423ae-e725-4dd6-8211-0d09216ef28f/tree.json",
      );

      const merkleTree = await response.json();

      const parsedTree = {
        format: merkleTree.format,
        tree: merkleTree.tree,
        values: merkleTree.values.map((v) => ({
          value: v.value,
          treeIndex: v.tree_index,
        })),
        leafEncoding: merkleTree.leaf_encoding,
      };

      const tree = StandardMerkleTree.load(parsedTree);

      const campaign = {
        id: hexId, // generated uuid converted to hex
        contractAddress: contractAddress, // the token claim campaign address (Sepolia)
        manager: "0x301a09CaDB9c682aEd7f7BaB0e83B660bb223F81", // the wallet address for the token claim manager (can cancel)
        token: token,
        amount: "10000", // amount of tokens
        start: "1712707200", // start date of the campaign in unix time
        end: "1715126400", // end date of the campaign in unix time
        tokenLockup: 0, // 0 unlocked, 1 locked, 2 vesting
        root: tree.root, // the root of the merkle tree
        delegating: true, // if delegation is possible
      };

      const totalClaimers = 10;

      const result = await writeContract(config, {
        abi: claimCampaignAbi,
        address: campaign.contractAddress,
        functionName: "createUnlockedCampaign",
        args: [
          hexId,
          {
            manager: campaign.manager,
            token: campaign.token,
            amount: campaign.amount,
            start: campaign.start,
            end: campaign.end,
            tokenLockup: campaign.tokenLockup,
            root: campaign.root,
            delegating: campaign.delegating,
          },
          totalClaimers,
        ],
        account: address,
        chain: chainId,
      });

      console.log(result);
    } catch (e) {
      console.error("error", e);
    }
  };

  const getProof = async () => {
    try {
      const response = await fetch(
        "https://d2ydy7et7ob3l7.cloudfront.net/e59423ae-e725-4dd6-8211-0d09216ef28f/tree.json",
      );

      const merkleTree = await response.json();

      const parsedTree = {
        format: merkleTree.format,
        tree: merkleTree.tree,
        values: merkleTree.values.map((v) => ({
          value: v.value,
          treeIndex: v.tree_index,
        })),
        leafEncoding: merkleTree.leaf_encoding,
      };

      const tree = StandardMerkleTree.load(parsedTree);

      for (const [i, v] of tree.entries()) {
        if (v[0] === address) {
          const proof = tree.getProof(i);
          const amount = v[1];

          return { proof, amount };
        }
      }
    } catch (error) {
      console.error("get proof error", error);
    }
  };

  const claimAndDelegateTokens = async () => {
    try {
      const expiry = BigInt(getUnixTimeThirtyMinutesFromNow());

      // const nonce = await getTransactionCount(config, {
      //   address: addressOfThePersonIDelegateTo,
      // });
      const nonce = 0;
      const signature = await signTypedData(config, {
        account: address,
        domain: {
          name: "Polar_Bear",
          version: "1",
          chainId: 11155111,
          verifyingContract: "0xdF0A43D15B036c065f6895734B878fD31269Bfa3",
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
          delegatee: addressOfThePersonIDelegateTo,
          nonce: BigInt(nonce),
          expiry: BigInt(expiry),
        },
      });

      if (signature) {
        const bytesArray = parse(campaignUUID);
        const hexId = bytesToHex(bytesArray);
        const { amount, proof } = await getProof();

        const { r, s, v } = ethers.Signature.from(signature);

        const hash = await writeContract(config, {
          abi: claimCampaignAbi,
          address: contractAddress,
          functionName: "claimAndDelegate",
          args: [
            hexId,
            proof,
            BigInt(amount),
            addressOfThePersonIDelegateTo,
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
      }
    } catch (error) {
      console.error("delegatinon error: ", error);
    }
  };

  const claim = async () => {
    try {
      const bytesArray = parse(campaignUUID);
      const hexId = bytesToHex(bytesArray);
      const { amount, proof } = await getProof();

      const hash = await writeContract(config, {
        abi: claimCampaignAbi,
        address: contractAddress,
        functionName: "claim",
        args: [hexId, proof, amount],
        account: address,
        chain: chainId,
      });

      console.log(hash);
    } catch (error) {
      console.error(error);
    }
  };

  const getDomain = async () => {
    refetch();
  };

  return (
    <>
      <Button onClick={claimAndDelegateTokens}>Delegate</Button>
      {/* <Button onClick={claimAndDelegateTokens}>Delegate</Button> */}
    </>
  );
};
