import { WALLLET_CONNECT_ID } from '~/constants/site'
import { ChainIcon } from '~/components/Layout/WalletConnect/ChainIcon/ChainIcon'
import { Chains } from '~/types/chains'
import { Dispatch, FC, SetStateAction, useMemo } from 'react'
import { Config, Connector, UseChainsReturnType, useChains, useConnect } from 'wagmi'
import { useWalletConnectContext } from '../../../../../../contexts/WalletConnectContext'

interface Props {
  chains: UseChainsReturnType<Config>;
  connectWithChain: (chainId: number) => void;
}

const ChainsList: FC<Props> = ({
  chains,
  connectWithChain,
}) => {
  return (
    <>
      <div className="mb-[16px]">Please select a network for WalletConnect:</div>
      <div className="flex max-h-[50vh] flex-col gap-y-[16px] overflow-y-auto md:max-h-[500px]">
        {chains
          .filter((chain) => !chain.testnet)
          .map((chain) => {
            return (
              <div
                key={chain.name}
                onClick={() => connectWithChain(chain.id)}
                className="flex cursor-pointer items-center justify-between rounded-md border border-gray-500 p-[15px] "
              >
                {chain.name}

                <ChainIcon
                  className="size-10"
                  chainName={chain.name as Chains}
                />
              </div>
            )
          })}
      </div>
    </>
  )
}

export default ChainsList
