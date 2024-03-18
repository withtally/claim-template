import { createConfig, http, cookieStorage, createStorage } from 'wagmi'
import { metaMask, coinbaseWallet, walletConnect, safe, injected } from 'wagmi/connectors'
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
  zkSync,
  moonbeam,
  bscTestnet,
  polygonMumbai, avalancheFuji,
} from 'wagmi/chains'

export const config = createConfig({
  chains: [
    bscTestnet,
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
    moonbeam,
    polygonMumbai,
    avalancheFuji
  ],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [
    metaMask(),
    walletConnect({ projectId: '77804d9f3d662d865161a11b1c286c92',  qrModalOptions:{
        themeVariables:{
          "--wcm-z-index": "9999999"
        }
      }}),
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
    [bscTestnet.id]: http(),
    [polygonMumbai.id]: http(),
    [avalancheFuji.id]: http(),
  },
})
