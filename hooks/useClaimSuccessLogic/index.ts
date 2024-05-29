import { useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import { UIconfig } from "~/config/UIconfig";
import { getChain } from "~/config/wagmi/getChain";
import { chainToUse } from "~/constants/site";
import { useClaimContext } from "../../contexts/ClaimContext";
import { Address } from '~/types/common'
import useCustomToasters from '~/hooks/useToasters'

export const useClaimSuccessLogic = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsClaimStepperVisible } = useClaimContext();
  const { selectedDelegate, transactionHash } = useClaimContext();
  const { successToast, errorToast } = useCustomToasters();

  const chain = getChain(chainToUse);

  const { isLoading, isError, isSuccess, isPending, isFetching } =
    useWaitForTransactionReceipt({
      hash: transactionHash,
      chainId: chain.chainId,
    });

  const _onSubmit = () => {
    setIsClaimStepperVisible(false);
  };

  const addToken = async () => {
    const tokenAddress = process.env.NEXT_PUBLIC_TOKEN as Address;

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
            address: tokenAddress,
            symbol: UIconfig.tokenConversionData.tokenSymbol,
            decimals: UIconfig.tokenConversionData.decimals,
            // A string URL of the token logo.
            // image: tokenImage,
          },
        },
      });

      // TODO: conect it to ui
      if (wasAdded) {
        successToast({ title: "Token was added to your wallet!" })
      } else {
        errorToast({ title: "Something went wrong. Please try again later." })
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
