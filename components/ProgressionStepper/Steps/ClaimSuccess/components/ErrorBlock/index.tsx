import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { Address } from "~/types/common";
import { getTextFromDictionary } from "~/utils/getTextFromDictionary";

interface Props {
  transactionHash: Address;
  chain: {
    chain: any;
    chainId: any;
  };
}

export const ErrorBlock: FC<Props> = ({ chain, transactionHash }) => {
  return (
    <div className="flex flex-col w-full gap-y-4">
      <p>{getTextFromDictionary("stepper_step4_errorText")}</p>

      <Link
        href={`${chain.chain.blockExplorers.default.url}/tx/${transactionHash}`}
        target="_blank"
        passHref
        className="block flex-1"
      >
        <Button size="md" variant="outline" w="full" px="20px">
          View transaction
        </Button>
      </Link>
    </div>
  );
};
