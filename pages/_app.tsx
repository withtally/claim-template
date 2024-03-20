import { FC } from 'react'
import { WagmiProvider } from 'wagmi'
import { config as wagmiConfig } from '../config/wagmi/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import AnimateLayout from '~/components/Layout/AnimateLayout'
import ErrorBoundary from '~/components/Layout/ErrorBoundary'
import Navbar from '~/components/Layout/Nav/Navbar'
import '~/styles/styles.css'
import { WalletConnectContextProvider } from '../contexts/WalletConnectContext'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { themeConfig } from '~/config/chakra/config'


const theme = extendTheme(themeConfig)


const queryClient = new QueryClient()

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { asPath } = useRouter()
  const _asPath = asPath.split('?').shift()

  return (
    <ErrorBoundary>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <WalletConnectContextProvider>
              <Navbar />
              <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
                <AnimateLayout key={_asPath}>
                  <Component {...pageProps} />
                </AnimateLayout>
              </AnimatePresence>
            </WalletConnectContextProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  )
}

export default App
