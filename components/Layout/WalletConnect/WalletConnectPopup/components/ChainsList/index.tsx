import { WALLLET_CONNECT_ID } from '~/constants/site'
import { ChainIcon } from '~/components/Layout/WalletConnect/ChainIcon/ChainIcon'
import { Chains } from '~/types/chains'
import { Dispatch, FC, SetStateAction, useMemo } from 'react'
import { Config, Connector, UseChainsReturnType, useChains, useConnect } from 'wagmi'
import { useWalletConnectContext } from '../../../../../../contexts/WalletConnectContext'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { WalletIcon } from '~/components/Layout/WalletConnect/WalletIcon'
import { WalletConnectors } from '~/types/wallet-connectors'
import { Icon } from '@chakra-ui/icon'

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
      <Tabs isFitted>
        <TabList>
          <Tab>Mainnets</Tab>
          <Tab>Testnets</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="flex flex-col gap-y-[16px] overflow-y-auto max-h-[410px]">
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
                          className="size-8"
                          chainName={chain.name as Chains}
                        />
                    </div>
                  )
                })}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-y-[16px] overflow-y-auto max-h-[410px]">
              {chains
                .filter((chain) => chain.testnet)
                .map((chain) => {
                  return (
                    <div
                      key={chain.name}
                      onClick={() => connectWithChain(chain.id)}
                      className="flex cursor-pointer items-center justify-between rounded-md border border-gray-500 p-[15px] "
                    >
                      {chain.name}

                        <ChainIcon
                          className="size-8"
                          chainName={chain.name as Chains}
                        />
                    </div>
                  )
                })}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </>
  )
}

export default ChainsList
