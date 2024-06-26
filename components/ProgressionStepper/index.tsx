import cx from "classnames";
import { ComponentType, FC, useEffect, useRef, useState } from "react";
import InView from "~/components/ProgressionStepper/InView";
import ProgressBar from "~/components/ProgressionStepper/ProgressBar";
import { SCROLL_DELAY } from "~/components/ProgressionStepper/presets";
import { Proof } from "~/types/common";
import {
  disableScroll,
  enableScroll,
  hideScrollbars,
  showScrollbars,
} from "~/utils/common";

let scrollTimeout: NodeJS.Timeout | null = null;

interface ProgessionStepperProps {
  totalSteps: number;
  components: ComponentType<any>[];
  onComplete?: () => void;
  proof: Proof | undefined;
}

const ProgessionStepper: FC<ProgessionStepperProps> = ({
  totalSteps,
  components,
  onComplete,
  proof,
}) => {
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [stepInView, setStepInView] = useState(0);

  const stepperContainerRef = useRef<HTMLDivElement>(null);

  const updateStepInView = (step: number) => {
    setStep(step);
    setStepInView(step);
  };

  const handleUpdateStep = (newStep: number) => {
    setStep(newStep);
    if (newStep > totalSteps) {
      onComplete && onComplete();
    } else if (step < newStep) {
      setCompletedSteps(newStep);
      handleScrollToStep(newStep);
    } else {
      handleScrollToStep(newStep);
    }
  };

  const handleScrollToStep = (step: number) => {
    if (!stepperContainerRef.current) return;
    clearTimeout(scrollTimeout);
    setStep(step);
    scrollTimeout = setTimeout(() => {
      stepperContainerRef.current.scrollTo(window.innerWidth * step, 0);
    }, SCROLL_DELAY);
  };

  const handleGoBack = () =>
    stepInView - 1 >= 0 && handleScrollToStep(stepInView - 1);

  useEffect(() => {
    hideScrollbars();
    disableScroll(); // disables vertical scroll
    if (step > 0) {
      handleScrollToStep(step);
    }

    return () => {
      showScrollbars();
      enableScroll();
    };
  }, []);

  return (
    <div
      ref={stepperContainerRef}
      className={cx(
        "scrollbar-hidden relative flex max-h-screen max-w-[100vw] snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth",
        {
          "overflow-x-hidden": completedSteps === 0,
        },
      )}
    >
      <ProgressBar
        stepInView={stepInView}
        completedSteps={completedSteps}
        totalSteps={totalSteps}
        handleScrollToStep={handleScrollToStep}
      />

      <div className="pointer-events-none fixed inset-0 z-[-1] flex items-center justify-center">
        <div className="relative size-[500px]">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={cx("gradient-background size-full", {
                "xxs:opacity-0": i !== step,
                "blue-purple-gradient": i === 0,
                "light-blue-gradient": i === 1,
                "orange-blue-gradient": i === 2,
              })}
            />
          ))}
        </div>
      </div>

      {components.slice(0, completedSteps + 1).map(
        (Component, i) => (
          // i >= step && (
          <InView key={i} handleUpdateInView={() => updateStepInView(i)}>
            <Component
              onBack={handleGoBack}
              onSubmit={() => handleUpdateStep(i + 1)}
              amount={1000}
              proof={proof}
            />
          </InView>
        ),
        // )
      )}
    </div>
  );
};

export default ProgessionStepper;
