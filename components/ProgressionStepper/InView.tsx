import cx from 'classnames'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface InViewProps {
  handleUpdateInView: () => void
  className?: string
  children: React.ReactNode
}

const InViewComponent: React.FC<InViewProps> = ({ handleUpdateInView, className, children }) => {
  // Use useRef to bind to the DOM element for the intersection observer

  // Set up the intersection observer hook
  const { ref, inView } = useInView({
    threshold: 0.8,
    // Trigger the callback every time the element comes into view
    triggerOnce: false,
  })

  // Effect to run the callback when the element comes into view
  useEffect(() => {
    if (inView) {
      handleUpdateInView()
    }
  }, [inView, handleUpdateInView])

  return (
    <div
      ref={ref}
      className={cx('inline snap-start transition-opacity', className, {
        // 'opacity-0': !inView,
      })}
    >
      {children}
    </div>
  )
}

export default InViewComponent
