import { createConfig, http, cookieStorage, createStorage, } from 'wagmi'
import {
  mainnet,
  sepolia,
  polygon,
  optimism,
  avalanche,
  bsc,
  arbitrum,
  gnosis,
  arbitrumNova,
  zkSync, moonbeam,
} from 'wagmi/chains'
import { metaMask, coinbaseWallet, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [
    mainnet,
    sepolia,
    polygon,
    optimism,
    avalanche,
    bsc,
    arbitrum,
    gnosis,
    arbitrumNova,
    zkSync,
    moonbeam
  ],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [
    metaMask(),
    walletConnect({ projectId: '77804d9f3d662d865161a11b1c286c92',}),
    coinbaseWallet({
      appName: 'Tally',
      enableMobileWalletLink: true,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [avalanche.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
    [gnosis.id]: http(),
    [arbitrumNova.id]: http(),
    [zkSync.id]: http(),
    [moonbeam.id]: http(),
  },
})
