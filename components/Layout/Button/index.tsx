import cx from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react'
import { BUTTON_COLOURS, ButtonColours } from '~/components/Layout/Button/presets'
import Loader from '~/components/Layout/Loader'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isLoading?: boolean
  variant?: ButtonColours
  tabIndex?: number
  labelClassName?: string
  className?: string
  children: string | ReactNode
}

const Button: FC<ButtonProps> = ({
  isLoading,
  variant = 'primary',
  tabIndex,
  labelClassName,
  className,
  children,
  ...props
}) => (
  <button
    tabIndex={tabIndex}
    className={cx(
      'group relative flex h-[50px] select-none items-center justify-center gap-x-2 rounded-full px-9 text-base transition-all',
      className,
      BUTTON_COLOURS[variant]
    )}
    {...props}
  >
    <span
      className={cx('flex items-center gap-x-2 whitespace-nowrap text-base font-medium leading-6', labelClassName, {
        'pointer-events-none opacity-0': isLoading,
      })}
    >
      {children}
    </span>
    {isLoading !== undefined && (
      <Loader
        className={cx(
          'absolute left-1/2 top-1/2 h-6 min-h-[24px] w-6 min-w-[24px] -translate-x-1/2 -translate-y-1/2 transition-opacity',
          {
            'opacity-0': !isLoading,
          }
        )}
      />
    )}
  </button>
)

export default Button
