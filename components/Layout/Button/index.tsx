import cx from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react'
import { BUTTON_COLOURS, ButtonColours } from '~/components/Layout/Button/presets'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: ButtonColours
  tabIndex?: number
  labelClassName?: string
  className?: string
  children: string | ReactNode
}

export const Button: FC<ButtonProps> = ({
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
      'group relative flex h-[50px] select-none items-center justify-center gap-x-2 rounded-full text-base transition-all px-9',
      className,
      BUTTON_COLOURS[variant]
    )}
    {...props}
  >
    <span className={cx('flex items-center gap-x-2 whitespace-nowrap text-base leading-6 font-medium', labelClassName)}>
      {children}
    </span>
  </button>
)
