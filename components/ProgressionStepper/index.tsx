import { ComponentType, FC, useEffect, useRef, useState } from 'react'
import InView from '~/components/ProgressionStepper/InView'
import ProgressBar from '~/components/ProgressionStepper/ProgressBar'
import { SCROLL_DELAY } from '~/components/ProgressionStepper/presets'
import { disableScroll, enableScroll, hideScrollbars, showScrollbars } from '~/utils/common'

let scrollTimeout: NodeJS.Timeout | null = null

interface ProgessionStepperProps {
  totalSteps: number
  components: ComponentType<any>[]
  initialComponent: ComponentType<any>
  onComplete?: () => void
}

const ProgessionStepper: FC<ProgessionStepperProps> = ({
  totalSteps,
  components,
  initialComponent: InitialComponent,
  onComplete,
}) => {
  const [step, setStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState(0)
  const [stepInView, setStepInView] = useState(0)

  const stepperContainerRef = useRef<HTMLDivElement>(null)

  const updateStepInView = (step: number) => setStepInView(step)

  const handleUpdateStep = (newStep: number) => {
    if (newStep > totalSteps) {
      setStep(newStep)
      onComplete && onComplete()
    } else if (step < newStep) {
      setStep(newStep)
      setCompletedSteps(newStep)
      handleScrollToStep(newStep)
    } else {
      handleScrollToStep(newStep)
    }
  }

  const handleScrollToStep = (step: number) => {
    if (!stepperContainerRef.current) return
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      stepperContainerRef.current.scrollTo(window.innerWidth * step, 0)
    }, SCROLL_DELAY)
  }

  const handleGoBack = () => stepInView - 1 >= 0 && handleScrollToStep(stepInView - 1)

  useEffect(() => {
    hideScrollbars()
    disableScroll() // disables vertical scroll
    if (step > 0) {
      handleScrollToStep(step)
    }

    return () => {
      showScrollbars()
      enableScroll()
    }
  }, [])

  return (
    <div
      ref={stepperContainerRef}
      className="scrollbar-hidden flex max-h-screen max-w-[100vw] snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth"
    >
      <ProgressBar
        stepInView={stepInView}
        completedSteps={completedSteps}
        totalSteps={totalSteps}
        handleScrollToStep={handleScrollToStep}
      />
      <InitialComponent onSubmit={() => handleUpdateStep(1)} />

      {components.map(
        (Component, i) =>
          step >= i + 1 && (
            <InView
              key={i}
              handleUpdateInView={() => updateStepInView(i + 1)}
            >
              <Component
                onBack={handleGoBack}
                onSubmit={() => handleUpdateStep(i + 2)}
              />
            </InView>
          )
      )}
    </div>
  )
}

export default ProgessionStepper
