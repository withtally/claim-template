import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { AvailableTokensBlock } from "~/components/Layout/AvailableTokensBlock";
import { SelectedDelegateBlock } from "~/components/Layout/SelectedDelegateBlock";
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

      <SelectedDelegateBlock
        address={selectedDelegate?.account?.address as Address}
        name={selectedDelegate?.account?.name}
        picture={selectedDelegate?.account?.picture}
        title="You have given voting rights to"
      />

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
