import { Button } from "@chakra-ui/react";
import cx from "classnames";
import { FC } from "react";
import { Input } from "~/components/Layout/Input";
import { useCheckAnotherWalletLogic } from "hooks/useCheckAnotherWalletLogic";
import { ClaimStatusEnum } from "~/types/common";
import { InfoBlockBody } from "../InfoBlockBody";

export const CheckAnotherWallet: FC = () => {
  const {
    address,
    setAddress,
    infoBlock,
    isCheckingEligibility,
    handleCheckButtonClick,
  } = useCheckAnotherWalletLogic();

  return (
    <div className="flex flex-col gap-y-3 w-full ">
      <Input
        showCross
        placeholder="Enter wallet address"
        value={address}
        onChange={setAddress}
        isInvalid={
          infoBlock === ClaimStatusEnum.NOT_ELIGIBLE ||
          infoBlock === ClaimStatusEnum.ALREADY_CLAIMED ||
          infoBlock === ClaimStatusEnum.INVALID_ADDRESS
        }
        isSuccess={infoBlock === ClaimStatusEnum.ELIGIBLE}
      />

      <div
        className={cx(
          "w-full overflow-hidden transition-[max-height,opacity,margin] duration-300",
          {
            "max-h-0 opacity-0": infoBlock === ClaimStatusEnum.UNKNOWN,
            "max-h-16 overflow-visible": infoBlock !== ClaimStatusEnum.UNKNOWN,
          },
        )}
      >
        <InfoBlockBody eligibleStatus={infoBlock} />
      </div>

      <Button
        size="md"
        className="px-2 w-full"
        px={8}
        isLoading={isCheckingEligibility}
        onClick={handleCheckButtonClick}
        isDisabled={!address}
      >
        Check eligibility
      </Button>
    </div>
  );
};
