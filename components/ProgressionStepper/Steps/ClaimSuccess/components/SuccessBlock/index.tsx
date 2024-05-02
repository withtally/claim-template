import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { AvailableTokensBlock } from "~/components/Layout/AvailableTokensBlock";
import { OptimisedImage } from "~/components/Layout/OptimisedImage";
import { Address } from "~/types/common";
import { Delegate } from "~/types/delegate";

interface Props {
  amount: string;
  selectedDelegate: Delegate;
  chain: {
    chain: any;
    chainId: any;
  };
  transactionHash: Address;
  addToken: () => Promise<void>;
}

export const SuccessBlock: FC<Props> = ({
  amount,
  selectedDelegate,
  chain,
  transactionHash,
  addToken,
}) => {
  return (
    <>
      <AvailableTokensBlock
        amount={amount}
        title="You have received"
        useXsTitle
      />

      <div className="mb-6" />

      <div className="mb-2 md:mb-4 w-full">
        <span className="text-caption mb-2 block text-xs uppercase">
          You have given voting rights to
        </span>
        <div className="flex h-14 items-center gap-x-4 rounded-full bg-blue-grey-lighter px-2">
          <OptimisedImage
            src={selectedDelegate?.account?.picture || ""}
            alt="wallet"
            className="size-10 max-h-10 min-h-10 min-w-10 max-w-10 overflow-hidden rounded-full"
          />
          <span className="text-caption">
            {selectedDelegate?.account?.name}
          </span>
        </div>
      </div>
      <div className="w-full flex gap-4 flex-wrap">
        <Link
          href={`${chain.chain.blockExplorers.default.url}/tx/${transactionHash}`}
          target="_blank"
          passHref
          className="block flex-1"
        >
          <Button variant="outline" w="full" px="20px">
            View transaction
          </Button>
        </Link>
        <div className="flex-1 min-w-[138px]">
          <Button variant="outline" w="full" onClick={addToken}>
            Add token
          </Button>
        </div>
      </div>
    </>
  );
};
