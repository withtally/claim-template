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
  polygonMumbai,
  avalancheFuji
} from "wagmi/chains";

const availableChains = {
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
  polygonMumbai,
  avalancheFuji
};

export const getChain = (chain: string) => {
  return { chain: availableChains[chain], chainId: availableChains[chain].id };
};
