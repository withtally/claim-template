import { useState } from "react";
import useCustomToasters from "~/hooks/useToasters";
import { Address, ClaimStatusEnum } from "~/types/common";
import { useClaimContext } from "../../contexts/ClaimContext";

export const useCheckAnotherWalletLogic = () => {
  const [address, setAddress] = useState("");
  const [infoBlock, setInfoBlock] = useState<ClaimStatusEnum>(
    ClaimStatusEnum.UNKNOWN,
  );
  const { infoToast } = useCustomToasters();

  const { checkEligibilityOfAnotherWallet, isCheckingEligibility } =
    useClaimContext();

  const handleCheckButtonClick = async () => {
    setInfoBlock(ClaimStatusEnum.UNKNOWN);
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      infoToast({ title: "Please enter a valid ETH address" });
      setInfoBlock(ClaimStatusEnum.INVALID_ADDRESS);
      return;
    }
    const isAbleToClaim = await checkEligibilityOfAnotherWallet(
      address as Address,
    );
    setInfoBlock(isAbleToClaim);
  };

  return {
    address,
    setAddress,
    infoBlock,
    isCheckingEligibility,
    handleCheckButtonClick,
  };
};
