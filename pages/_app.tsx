import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { FC } from 'react'
import AnimateLayout from '~/components/Layout/AnimateLayout'
import ErrorBoundary from '~/components/Layout/ErrorBoundary'
import '~/styles/styles.css'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { asPath } = useRouter()
  const _asPath = asPath.split('?').shift()

  return (
    <ErrorBoundary>
      {/* <Navbar /> */}
      <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
        <AnimateLayout key={_asPath}>
          <Component {...pageProps} />
        </AnimateLayout>
      </AnimatePresence>
    </ErrorBoundary>
  )
}

export default App
