import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { FC, useState } from "react";
import { AvailableTokensBlock } from "~/components/Layout/AvailableTokensBlock";
import { OptimisedImage } from "~/components/Layout/OptimisedImage";
import StepForm from "~/components/ProgressionStepper/StepForm";
import { UIconfig } from "~/config/UIconfig";
import { Proof } from "~/types/common";
import { useClaimContext } from "../../../../contexts/ClaimContext";
import { useClaimSuccessLogic } from '~/hooks/useClaimSuccessLogic'

interface ClaimSuccessProps {
  proof: Proof | undefined;
}

const ClaimSuccess: FC<ClaimSuccessProps> = ({ proof }) => {
  const {
    isSubmitting,
    _onSubmit,
    addToken,
    selectedDelegate
  } = useClaimSuccessLogic();

  return (
    <div className="inline snap-start transition-opacity">
      <StepForm
        isLoading={isSubmitting}
        buttonText="Go back to homepage"
        onSubmit={_onSubmit}
        scrollContainerClassName="mt-0"
        className="md:max-w-[60svw] xl:max-w-[40svw] 2xl:max-w-[720px]"
      >
        <h2 className="w-full text-center text-xl font-bold xs:text-2xl">
          <span>Claim initiated</span>
        </h2>

        <hr className="border-1 my-4 w-full" />

        <AvailableTokensBlock
          amount={proof?.amount}
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
            href="https://v2.chakra-ui.com/docs/components/button/usage"
            target="_blank"
            passHref
            className="block flex-1"
          >
            <Button as="a" variant="outline" w="full" px="20px">
              View transaction
            </Button>
          </Link>
          <div className="flex-1 min-w-[138px]">
            <Button variant="outline" w="full" onClick={addToken}>
              Add token
            </Button>
          </div>
        </div>
      </StepForm>
    </div>
  );
};

export default ClaimSuccess;
