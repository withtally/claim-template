import { FC } from 'react'
import ProgessionStepper from '~/components/ProgressionStepper'
import InitialScreen from '~/components/ProgressionStepper/Steps/Initial'
import { SEO } from '~/components/SEO'

const HireReactDeveloperPage: FC = () => {
  const components = []

  return (
    <>
      <SEO title="Home" />
      <div className="flex max-h-screen flex-col">
        <ProgessionStepper
          initialComponent={InitialScreen}
          components={components}
          totalSteps={components.length}
        />
      </div>
    </>
  )
}

export default HireReactDeveloperPage
