import cx from 'classnames'
import { FC, useState } from 'react'
import StepForm from '~/components/ProgressionStepper/StepForm'
import { stepItems } from '~/components/ProgressionStepper/Steps/Initial/presets'
import { siteName } from '~/constants/site'
import InfoIcon from '~/public/img/icons/info.svg'
import TickIcon from '~/public/img/icons/tick.svg'

interface InitialScreenProps {
  onSubmit: () => void
}

const InitialScreen: FC<InitialScreenProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        title={`${siteName} Claim`}
        buttonText="Sign Message"
        onSubmit={_onSubmit}
      >
        <ul className="mb-6">
          {stepItems.map(({ title, description }, i) => (
            <li
              key={title}
              className="border-b border-gray-500 py-4 first:border-t"
            >
              <div
                className={cx('mb-2 flex items-center justify-between transition-colors', {
                  'text-green': i === 0 && isSubmitting,
                })}
              >
                <h3 className="text-caption inline-flex items-center gap-x-4 uppercase">
                  <span>0{i + 1}</span>
                  <span>{title}</span>
                </h3>
                {i === 0 && isSubmitting && <TickIcon className="size-4" />}
              </div>
              <p className="text-gray-400">{description}</p>
            </li>
          ))}
        </ul>
        <p className="w-full text-center">
          You will need to approve <b>2 actions</b> in your wallet.
        </p>
        <div
          className={cx('w-full overflow-hidden transition-[max-height,opacity,margin] duration-500', {
            'max-h-0 opacity-0': !isSubmitting,
            'my-4 max-h-16': isSubmitting,
          })}
        >
          <div className="flex w-full items-center gap-x-2 overflow-hidden rounded-md bg-blue-grey-lighter p-4 text-xs">
            <InfoIcon className="size-4 text-white" />
            <div>
              <p>Processing transaction</p>
              <span className="text-gray-400">Updating live...</span>
            </div>
          </div>
        </div>
      </StepForm>
    </div>
  )
}

export default InitialScreen
