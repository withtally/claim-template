import { useState } from 'react'
import { useClaimContext } from '../../contexts/ClaimContext'
import { UIconfig } from '~/config/UIconfig'

export const useClaimSuccessLogic = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsClaimStepperVisible } = useClaimContext();
  const { selectedDelegate } = useClaimContext();

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
    selectedDelegate
  }
}