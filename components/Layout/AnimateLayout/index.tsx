import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'

const AnimateLayout: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <motion.main
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        ease: 'linear',
        duration: 0.4,
      }}
    >
      {/* <div className="relative z-10 min-h-[calc(100svh-432px)] border-b border-b-mid-grey bg-white"> */}
      {children}
      {/* </div> */}
    </motion.main>
  )
}

export default AnimateLayout
