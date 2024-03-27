import { FC, useState } from 'react'
import AnimateOnUpdate from '~/components/Layout/AnimateOnUpdate'
import Header from '~/components/Pages/Home/Header'
import ProgessionStepper from '~/components/ProgressionStepper'
import ClaimStep from '~/components/ProgressionStepper/Steps/Claim'
import DelegateStep from '~/components/ProgressionStepper/Steps/Delegate'
import InitialScreen from '~/components/ProgressionStepper/Steps/Initial'
import { SEO } from '~/components/SEO'

const HireReactDeveloperPage: FC = () => {
  const [isClaimStepperVisible, setIsClaimStepperVisible] = useState(false)
  const components = [InitialScreen, /* ClaimStep, */ DelegateStep]

  const handleShowClaimStepper = () => setIsClaimStepperVisible(true)

  return (
    <>
      <SEO title="Home" />
      <AnimateOnUpdate
        updateKey={isClaimStepperVisible}
        className="flex max-h-svh flex-col"
      >
        {!isClaimStepperVisible ? (
          <Header onClick={handleShowClaimStepper} />
        ) : (
          <ProgessionStepper
            components={components}
            totalSteps={components.length}
          />
        )}
      </AnimateOnUpdate>
    </>
  )
}

export default HireReactDeveloperPage
