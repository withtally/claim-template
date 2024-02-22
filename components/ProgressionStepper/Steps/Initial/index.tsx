import { FC } from 'react'
import StepForm from '~/components/ProgressionStepper/StepForm'

interface InitialScreenProps {
  onSubmit: () => void
}

const InitialScreen: FC<InitialScreenProps> = ({ onSubmit }) => (
  <div className="inline snap-start transition-opacity">
    <StepForm
      title="Welcome to zkSync Claims Portal"
      buttonText="Check eligibility"
      onSubmit={onSubmit}
    ></StepForm>
  </div>
)

export default InitialScreen
