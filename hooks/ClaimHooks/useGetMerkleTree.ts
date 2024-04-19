import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { useQuery } from "@tanstack/react-query";

const merkleTreeFetchFunction = async () => {
  return fetch(process.env.NEXT_PUBLIC_MERKLE_TREE_FETCH_URL)
    .then((res) => res.json())
    .then((merkleTree) => {
      return StandardMerkleTree.load(merkleTree);
    });
};

export const useGetMerkleTree = () => {
  const {
    data: merkleTree,
    isPending,
    error,
    isFetched,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["merkleTree"],
    queryFn: () => merkleTreeFetchFunction(),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  return { merkleTree, isPending, error, isFetched, isLoading, isError };
};
