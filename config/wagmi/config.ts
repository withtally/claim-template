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
      projectId: "77804d9f3d662d865161a11b1c286c92",
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
