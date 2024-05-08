import { Spinner } from "@chakra-ui/react";
import { FC } from "react";
import StepForm from "~/components/ProgressionStepper/StepForm";
import { useClaimSuccessLogic } from "~/hooks/useClaimSuccessLogic";
import { Proof } from "~/types/common";
import { ErrorBlock } from "./components/ErrorBlock";
import { FormHeader } from "./components/FormHeader";
import { SuccessBlock } from "./components/SuccessBlock";

interface ClaimSuccessProps {
  proof: Proof | undefined;
}

const ClaimSuccess: FC<ClaimSuccessProps> = ({ proof }) => {
  const {
    isSubmitting,
    _onSubmit,
    addToken,
    selectedDelegate,
    transactionHash,
    isLoading,
    isError,
    isSuccess,
    chain,
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
        <FormHeader
          isSuccess={isSuccess}
          isError={isError}
          isLoading={isLoading}
        />

        <hr className="border-1 my-4 w-full" />

        {isLoading && (
          <div className="flex justify-center w-full my-7">
            <Spinner size="lg" />
          </div>
        )}

        {isSuccess && (
          <SuccessBlock
            amount={proof.amount}
            selectedDelegate={selectedDelegate}
            addToken={addToken}
            chain={chain}
            transactionHash={transactionHash}
          />
        )}

        {isError && (
          <ErrorBlock chain={chain} transactionHash={transactionHash} />
        )}
      </StepForm>
    </div>
  );
};

export default ClaimSuccess;
