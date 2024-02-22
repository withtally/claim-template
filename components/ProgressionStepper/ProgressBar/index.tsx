import cx from 'classnames'
import React from 'react'

interface ProgressBarProps {
  stepInView: number
  completedSteps: number
  totalSteps: number
  handleScrollToStep: (step: number) => void
}

// Create the ProgressBar component
const ProgressBar: React.FC<ProgressBarProps> = ({ stepInView, completedSteps, totalSteps, handleScrollToStep }) => {
  const stepsArray = Array.from({ length: totalSteps }, (_, i) => i)

  return (
    <>
      <div
        className={cx(
          'fixed bottom-4 left-1/2 z-10 flex w-full max-w-[1000px] -translate-x-1/2 flex-col items-center gap-y-4 rounded-lg transition-all',
          {
            'pointer-events-none translate-y-4 opacity-0': stepInView > totalSteps || completedSteps === 0,
          }
        )}
      >
        {/* Iterate through each step to create the buttons */}
        <div className="flex items-center gap-x-2 xs:gap-x-4">
          {stepsArray.map((_, i) => (
            <button
              key={i}
              onClick={() => handleScrollToStep(i)}
              className={cx('group relative h-8 w-8', {
                'cursor-not-allowed': i > completedSteps,
              })}
            >
              {/* Step Number */}
              <span
                className={cx(
                  'absolute bottom-0 left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-sm font-bold leading-4 text-black/80 transition-all',
                  {
                    'xxs:text-white': i < stepInView && i < completedSteps,
                    'xxs:text-dark-purple': i === stepInView,
                    'group-hover:opacity-100': i <= completedSteps,
                    'opacity-50': i > completedSteps,
                  }
                )}
              >
                {/* {i === totalSteps - 1 ? `🎉` : i} */}
                {i + 1}
              </span>
              {/* Step Border */}
              <span
                className={cx('inline-block h-8 w-8 rounded-full border-2 bg-white transition-all', {
                  'border-dark-purple': Boolean(i < stepInView && i <= completedSteps),
                  'border-transparent': !Boolean(i < stepInView && i <= completedSteps),
                  'cursor-not-allowed opacity-50': i > completedSteps,
                })}
              />
              {/* Step Background */}
              <span
                className={cx(
                  'absolute left-0 top-0 z-10 inline-block h-8 w-8 overflow-hidden rounded-full bg-blue transition-opacity',
                  {
                    // 'opacity-100': i < stepInView && i <= completedSteps,
                    'opacity-0': i >= stepInView,
                  }
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProgressBar
