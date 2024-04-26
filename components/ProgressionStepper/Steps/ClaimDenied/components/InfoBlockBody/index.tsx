import { FC } from "react";
import { ClaimStatusEnum } from "~/types/common";

interface Props {
  eligibleStatus: ClaimStatusEnum;
}

export const InfoBlockBody: FC<Props> = ({ eligibleStatus }) => {
  const info = {
    [ClaimStatusEnum.ALREADY_CLAIMED]: (
      <p className="text-errorColor">
        Sorry, you already claimed tokens via this wallet
      </p>
    ),
    [ClaimStatusEnum.NOT_ELIGIBLE]: (
      <p className="text-errorColor">Sorry this wallet is not eligible</p>
    ),
    [ClaimStatusEnum.ELIGIBLE]: (
      <p className="text-green">This wallet is eligible. </p>
    ),
    [ClaimStatusEnum.INVALID_ADDRESS]: (
      <p className="text-errorColor">Please enter a valid ETH address. </p>
    ),
  };

  return info[eligibleStatus];
};
