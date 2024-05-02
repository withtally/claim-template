import { useState } from "react";
import { Address } from "~/types/common";

export const useHash = () => {
  const [transactionHash, setTransactionHash] = useState<Address | null>(null);

  return {
    transactionHash, 
    setTransactionHash
  };
};
