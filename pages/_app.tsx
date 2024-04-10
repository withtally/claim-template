import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { FC } from "react";
import { WagmiProvider } from "wagmi";
import AnimateLayout from "~/components/Layout/AnimateLayout";
import ErrorBoundary from "~/components/Layout/ErrorBoundary";
import Navbar from "~/components/Layout/Nav/Navbar";
import { themeConfig } from "~/config/chakra/config";
import "~/styles/styles.css";
import { config as wagmiConfig } from "../config/wagmi/config";
import { WalletConnectContextProvider } from "../contexts/WalletConnectContext";
import { Analytics } from '@vercel/analytics/react';
import dynamic from 'next/dynamic';

const theme = extendTheme(themeConfig);

const queryClient = new QueryClient();

const DynamicWalletConnectContextProvider = dynamic(() => import('../contexts/WalletConnectContext').then(mod => mod.WalletConnectContextProvider), {
  ssr: false
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { asPath } = useRouter();
  const _asPath = asPath.split("?").shift();

  return (
    <>
      <ErrorBoundary>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
              <DynamicWalletConnectContextProvider>
                <Navbar />
                <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
                  <AnimateLayout key={_asPath}>
                    <Component {...pageProps} />
                  </AnimateLayout>
                </AnimatePresence>
              </DynamicWalletConnectContextProvider>
            </ChakraProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ErrorBoundary>
      <Analytics />
    </>
  );
};

export default App;
