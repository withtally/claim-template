import { FC } from "react";
import { AvailableTokensBlock } from "~/components/Layout/AvailableTokensBlock";
import { OptimisedImage } from "~/components/Layout/OptimisedImage";
import StepForm from "~/components/ProgressionStepper/StepForm";
import { useClaimAndDelegate } from "~/hooks/ClaimHooks/useClaimAndDelegate";
import { Proof } from "~/types/common";

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

        <div className="mb-2 md:mb-4 w-full">
          <span className="text-caption mb-2 block text-xs uppercase">
            You're giving voting rights to
          </span>
          <div
            className="grid grid-cols-[40px_minmax(9px,_1fr)] gap-x-4 h-14 w-full rounded-full bg-blue-grey-lighter px-2 items-center">
            <OptimisedImage
              src={
                selectedDelegate?.account?.picture ||
                "/img/icons/wallet-placeholder.png"
              }
              alt="wallet"
              className="size-10 max-h-10 min-h-10 min-w-10 max-w-10 overflow-hidden rounded-full"
              layout="cover"
            />
            <div className="shrink flex-grow">
              <div className="text-caption truncate">{selectedDelegate?.account?.name}</div>
              <div className="text-gray-300 truncate text-[12px]">
                {selectedDelegate?.account?.address}
              </div>
            </div>
          </div>
        </div>
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
