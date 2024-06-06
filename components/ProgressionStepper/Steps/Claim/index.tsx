import { FC } from "react";
import { AvailableTokensBlock } from "~/components/Layout/AvailableTokensBlock";
import { OptimisedImage } from "~/components/Layout/OptimisedImage";
import { SelectedDelegateBlock } from "~/components/Layout/SelectedDelegateBlock";
import StepForm from "~/components/ProgressionStepper/StepForm";
import { useClaimAndDelegate } from "~/hooks/ClaimHooks/useClaimAndDelegate";
import { Address, Proof } from "~/types/common";

interface ClaimStepProps {
  onBack: () => void;
  onSubmit: () => void;
  proof: Proof | undefined;
}

const ClaimStep: FC<ClaimStepProps> = ({ onBack, onSubmit, proof }) => {
  const { onClaim, claimError, isSubmitting, selectedDelegate } =
    useClaimAndDelegate();

  return (
    <div className="inline snap-start transition-opacity">
      <StepForm
        isLoading={isSubmitting}
        buttonText="Claim and Delegate"
        onBack={onBack}
        onSubmit={() => onClaim({ onSubmit, usersProof: proof })}
        scrollContainerClassName="mt-0"
      >
        <h2 className="w-full text-center text-xl font-bold xs:text-2xl">
          <span>Confirm details</span>
        </h2>

        <hr className="border-1 my-4 w-full" />

        <AvailableTokensBlock
          amount={proof?.amount}
          title="You will receive"
          useXsTitle
        />

        <div className="mb-6" />

        <SelectedDelegateBlock
          address={selectedDelegate?.account?.address as Address}
          name={selectedDelegate?.account?.name}
          picture={selectedDelegate?.account?.picture}
          title="You're giving voting rights to"
        />
        {claimError && (
          <div className="text-errorColor">
            An error has occurred, try again.
          </div>
        )}
      </StepForm>
    </div>
  );
};

export default ClaimStep;
