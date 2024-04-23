import { Tooltip } from "@chakra-ui/react";
import cx from "classnames";
import { formatUnits } from "ethers";
import { shortenAddress } from "libs/helpers/shortenAddress";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { OptimisedImage } from "~/components/Layout/OptimisedImage";
import CustomTooltip from "~/components/Layout/Tooltip";
import { Delegate } from "~/types/delegate";
import { convertNumberToHumanReadableFormat } from "~/utils/convertNumberToHumanReadableFormat";
import TwitterIcon from "../../../public/img/icons/twitter-bule.svg";
import { SelectedMark } from "./components/SelectedMark";

interface Props {
  delegate: Delegate;
  isSelected: boolean;
  setSelectedDelegate: Dispatch<SetStateAction<Delegate>>;
}

const tokenSymbol = "CGEEKS";
const decimals = 18;

export const DelegateCard: FC<Props> = ({
  delegate,
  isSelected,
  setSelectedDelegate,
}) => {
  const formatedStatementSummaryOrBio = useMemo(() => {
    const statementSummary =
      delegate?.statement?.statementSummary.length > 80
        ? delegate?.statement?.statementSummary.slice(0, 80) + "…"
        : delegate?.statement?.statementSummary;

    const bio =
      delegate?.account?.bio?.length > 80
        ? delegate?.account?.bio.slice(0, 80) + "…"
        : delegate?.account?.bio;

    return statementSummary || bio;
  }, []);

  return (
    <div
      className={cx(
        "relative cursor-pointer rounded-md border-2 bg-blue-grey p-4 pt-10",
        {
          "border-green/80": isSelected,
        },
      )}
      onClick={() => setSelectedDelegate(delegate)}
    >
      {isSelected && <SelectedMark />}
      {/* WALLET DETAILS */}
      <div className="mb-6 flex flex-col items-center gap-x-4 md:flex-row">
        <OptimisedImage
          src={
            delegate?.account?.picture || "/img/icons/wallet-placeholder.png"
          }
          alt="wallet"
          className="mt-2 max-md:mb-2 size-12 max-h-12 min-h-12 min-w-12 max-w-12 overflow-hidden rounded-full  "
          layout="cover"
        />
        <div className="flex max-w-[75%] flex-col">
          <CustomTooltip label={delegate?.account?.address}>
            <h3 className="text-subheading mb-1 flex-grow truncate">
              {delegate?.account?.name ||
                shortenAddress(delegate?.account?.address)}
            </h3>
          </CustomTooltip>
          <p className="break-all text-xs text-gray-400">
            {convertNumberToHumanReadableFormat(
              +formatUnits(delegate?.votesCount, decimals),
            )}{" "}
            {tokenSymbol}
          </p>
        </div>
      </div>

      <p
        className={cx("mb-6 h-[70px] overflow-hidden text-clip line-clamp-3", {
          "text-gray-400": !formatedStatementSummaryOrBio,
        })}
      >
        {formatedStatementSummaryOrBio || "No bio provided"}
      </p>

      <div className="flex flex-wrap justify-between gap-y-[10px]">
        <span className="flex items-center whitespace-nowrap rounded-full border p-2 text-xs text-gray-300">
          {delegate.delegatorsCount > 0
            ? `Trusted by ${delegate.delegatorsCount} accounts`
            : "No delegations to this account"}
        </span>

        <Tooltip label={delegate?.account?.twitter}>
          {delegate?.account?.twitter && (
            <Link
              onClick={(e) => e.stopPropagation()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-600"
              href={`https://twitter.com/${delegate?.account?.twitter}`}
              target="_blank"
            >
              <TwitterIcon className="size-5" fill={"#1da1f2"} />
            </Link>
          )}
        </Tooltip>
      </div>
    </div>
  );
};
