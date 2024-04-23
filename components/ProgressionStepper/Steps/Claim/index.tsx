import { FC, useState } from 'react'
import { OptimisedImage } from '~/components/Layout/OptimisedImage'
import StepForm from '~/components/ProgressionStepper/StepForm'
import { useClaimContext } from '../../../../contexts/ClaimContext'

interface ClaimStepProps {
  onBack: () => void
  onSubmit: () => void
}

const ClaimStep: FC<ClaimStepProps> = ({ onBack, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedDelegate } = useClaimContext();

  const _onSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      onSubmit()
    }, 3000)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 4000)
  }

  return (
    <div className="inline snap-start transition-opacity">
      <StepForm
        isLoading={isSubmitting}
        buttonText="Claim your tokens"
        onBack={onBack}
        onSubmit={_onSubmit}
        scrollContainerClassName="mt-0"
      >
        <h2 className="w-full text-center text-xl font-bold xs:text-2xl">
          <span>Confirm details</span>
        </h2>

        <hr className="border-1 my-4 w-full" />

        <div className="mb-6 w-full">
          <span className="text-caption mb-2 block text-xs uppercase">
            You will receive
          </span>
          <div className="flex h-14 items-center gap-x-4 rounded-full bg-blue-grey-lighter px-2">
            <div className="inline-flex size-10 items-center justify-center rounded-full bg-blue-grey">
              <div
                className="gradient-background orange-blue-gradient size-6 | min-h-6 min-w-6 max-w-6 overflow-hidden rounded-full xxs:relative xxs:z-0 xxs:opacity-100 xxs:blur-none" />
            </div>
            <span className="text-caption">6500.0</span>
          </div>
        </div>

        <div className="mb-2 md:mb-4 w-full">
          <span className="text-caption mb-2 block text-xs uppercase">
            You're giving voting rights to
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
      </StepForm>
    </div>
  );
}

export default ClaimStep
