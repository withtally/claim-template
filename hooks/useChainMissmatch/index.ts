import { useAccount } from 'wagmi'
import { chainToUse } from '~/constants/site'
import { getChain } from '~/config/wagmi/getChain'

export function useChainMissmatch() {
  const {isConnected, chainId: currentChainId} = useAccount();
  const {chainId} = getChain(chainToUse);
  if(!isConnected) return null;
  return chainId !== currentChainId;
}