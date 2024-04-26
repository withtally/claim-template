import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { Address, Proof } from "~/types/common";

export const getProofs = (
  merkleTree: StandardMerkleTree<any[]>,
  address: Address,
): Proof | undefined => {
  for (const [i, v] of merkleTree.entries()) {
    if (v[0] === address) {
      const proof = merkleTree.getProof(i);
      const amount = v[1];

      return { proof, amount };
    }
  }
};
