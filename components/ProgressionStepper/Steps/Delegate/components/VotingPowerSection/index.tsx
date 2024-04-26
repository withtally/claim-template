import { Button } from "@chakra-ui/react";
import cx from "classnames";
import { FC, useMemo } from "react";
import { AvailableTokensBlock } from "~/components/Layout/AvailableTokensBlock";
import { OptimisedImage } from "~/components/Layout/OptimisedImage";
import CustomTooltip from "~/components/Layout/Tooltip";
import { getChain } from "~/config/wagmi/getChain";
import { chainToUse } from "~/constants/site";
import { useChainMissmatch } from "~/hooks/useChainMissmatch";
import useCustomToasters from "~/hooks/useToasters";
import { Proof } from "~/types/common";
import { Delegate } from "~/types/delegate";
import { getTextFromDictionary } from "~/utils/getTextFromDictionary";
import { shortenAddress } from "../../../../../../libs/helpers/shortenAddress";

interface Props {
  selectedDelegate: Delegate | null;
  onSubmit: () => void;
  proof: Proof | undefined;
}

export const VotingPowerSection: FC<Props> = ({
  selectedDelegate,
  onSubmit,
  proof,
}) => {
  const isChainMissmatched = useChainMissmatch();
  const { warningToast } = useCustomToasters();
  const { chain } = getChain(chainToUse);

  const onDelegateClick = () => {
    if (isChainMissmatched) {
      warningToast({
        title: "Wrong chain",
        description: `To claim and delegate tokens you have to use ${chain.name}. Please reconnect your wallet with this chain.`,
      });
      return;
    }
    onSubmit();
  };

  const formatedStatementSummaryOrBio = useMemo(() => {
    const statementSummary = selectedDelegate?.statement?.statementSummary;

    const bio = selectedDelegate?.account?.bio;

    return statementSummary || bio;
  }, [selectedDelegate]);

  const displayName = useMemo(() => {
    if (!selectedDelegate) {
      return "";
    }
    return (
      selectedDelegate?.account?.name ||
      shortenAddress(selectedDelegate?.account?.address)
    );
  }, [selectedDelegate]);

  return (
    <form className="relative z-10 flex h-fit min-h-[75svh] w-full flex-col items-start rounded-2xl bg-blue-grey/70 p-6 backdrop-blur-md lg:sticky lg:top-[3svh] lg:max-w-[450px]">
      <h2 className="text-caption text-subheading mb-6 uppercase">
        {getTextFromDictionary("stepper_step2_votingPowerSection_title")}
      </h2>

      <AvailableTokensBlock amount={proof?.amount} />

      <hr className="border-1 my-4 w-full" />

      {selectedDelegate ? (
        <>
          <CustomTooltip label={selectedDelegate?.account?.address}>
            <div className="mb-6 flex h-14 w-full items-center gap-x-4 rounded-full bg-blue-grey-lighter px-2">
              <OptimisedImage
                src={
                  selectedDelegate?.account?.picture ||
                  "/img/icons/wallet-placeholder.png"
                }
                alt="wallet"
                className="size-10 max-h-10 min-h-10 min-w-10 max-w-10 overflow-hidden rounded-full"
                layout="cover"
              />
              <span className="text-caption truncate">{displayName}</span>
            </div>
          </CustomTooltip>

          <p
            className={cx("mb-6", {
              "text-gray-400": !formatedStatementSummaryOrBio,
            })}
          >
            {formatedStatementSummaryOrBio || "No bio provided"}
          </p>
        </>
      ) : (
        <>
          <p className="m-auto flex-1 text-gray-400">
            {getTextFromDictionary("stepper_step2_delegate_chooseDelegate")}
          </p>
        </>
      )}

      <div className="flex w-full flex-1 items-end">
        <Button
          isLoading={false}
          className="w-full"
          onClick={onDelegateClick}
          isDisabled={selectedDelegate === null}
        >
          {getTextFromDictionary("stepper_step2_votingPowerSection_confirm")}
        </Button>
      </div>
    </form>
  );
};
