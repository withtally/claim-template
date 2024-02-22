import cx from 'classnames'
import { DetailedHTMLProps, ForwardRefRenderFunction, HTMLAttributes, forwardRef } from 'react'

interface ContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string
  children: any
}

const Container: ForwardRefRenderFunction<HTMLDivElement, ContainerProps> = (
  { className, children, ...props },
  ref
) => (
  <div
    ref={ref}
    className={cx('relative mx-auto w-full max-w-[1440px] px-4 lg:px-10', className)}
    {...props}
  >
    {children}
  </div>
)

export default forwardRef(Container)
