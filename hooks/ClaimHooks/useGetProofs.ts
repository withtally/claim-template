import { useQuery } from "@tanstack/react-query";
import { Address } from '~/types/common'

type Proof = {
  address: Address;
  amount: number;
  proof: Address[];
}


const proofsFetchFunction = async (): Promise<Proof[]> => {
  return fetch(process.env.NEXT_PUBLIC_PROOFS_FETCH_URL)
    .then((res) => res.json())
};

export const useGetProofs = () => {
  const {
    data: proofs,
    isPending,
    error,
    isFetched,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["proofs"],
    queryFn: () => proofsFetchFunction(),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  return { proofs, isPending, error, isFetched, isLoading, isError };
};
