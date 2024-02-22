import cx from 'classnames'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import { ForwardRefRenderFunction, ReactNode, forwardRef } from 'react'

interface AnimateOnUpdateProps extends HTMLMotionProps<'div'> {
  updateKey: string | number | boolean
  isSpan?: boolean
  duration?: number
  delay?: number
  className?: string
  children: ReactNode
}

const AnimateOnUpdate: ForwardRefRenderFunction<HTMLDivElement, AnimateOnUpdateProps> = (
  { updateKey, isSpan, duration, delay, children, className, ...props },
  ref
) => {
  const componentProps = {
    key: String(updateKey),
    ref,
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      ease: 'linear',
      duration: duration || 0.2,
      delay: delay || 0,
    },
    className: cx(className),
    ...props,
  }
  return (
    <AnimatePresence exitBeforeEnter>
      {isSpan ? (
        <motion.span {...componentProps}>{children}</motion.span>
      ) : (
        <motion.div {...componentProps}>{children}</motion.div>
      )}
    </AnimatePresence>
  )
}

export default forwardRef(AnimateOnUpdate)
