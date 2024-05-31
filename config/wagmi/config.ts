import { createConfig, http } from "wagmi";
import { metaMask, coinbaseWallet, walletConnect } from "wagmi/connectors";

import { getChain } from "~/config/wagmi/getChain";
import { chainToUse } from "~/constants/site";

const { chain } = getChain(chainToUse);

export const config = createConfig({
  chains: [chain],
  ssr: true,
  connectors: [
    metaMask(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
      qrModalOptions: {
        themeVariables: {
          "--wcm-z-index": "9999999"
        }
      }
    }),
    coinbaseWallet({
      appName: "Tally",
      enableMobileWalletLink: true
    })
  ],
  transports: {
    [chain.id]: http()
  }
});
