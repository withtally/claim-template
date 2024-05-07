import { useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import { UIconfig } from "~/config/UIconfig";
import { getChain } from "~/config/wagmi/getChain";
import { chainToUse } from "~/constants/site";
import { useClaimContext } from "../../contexts/ClaimContext";

export const useClaimSuccessLogic = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsClaimStepperVisible } = useClaimContext();
  const { selectedDelegate, transactionHash } = useClaimContext();
  const chain = getChain(chainToUse);

  console.log("chain2", getChain(chainToUse).chain);

  const { isLoading, isError, isSuccess, isPending, isFetching } =
    useWaitForTransactionReceipt({
      hash: transactionHash,
      chainId: chain.chainId,
    });

  const _onSubmit = () => {
    setIsClaimStepperVisible(false);
  };

  const addToken = async () => {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      });
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0x11aF999d883730a268cF71481D1028DAd8334534",
            symbol: UIconfig.tokenConversionData.tokenSymbol,
            decimals: 18,
            // A string URL of the token logo.
            // image: tokenImage,
          },
        },
      });

      // TODO: conect it to ui
      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    isSubmitting,
    _onSubmit,
    addToken,
    selectedDelegate,
    transactionHash,
    isLoading,
    isError,
    isSuccess,
    isPending,
    isFetching,
    chain
  };
};
