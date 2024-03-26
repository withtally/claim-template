import { ChainIcon } from '~/components/Layout/WalletConnect/ChainIcon/ChainIcon'
import { Chains } from '~/types/chains'
import { FC } from 'react'
import { Config, UseChainsReturnType} from 'wagmi'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { Button } from '@chakra-ui/react'

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
            <div className="flex flex-col gap-y-[16px] overflow-y-auto max-h-[50vh]">
              {chains
                .filter((chain) => !chain.testnet)
                .map((chain) => {
                  return (
                    <Button
                      key={chain.name}
                      onClick={() => connectWithChain(chain.id)}
                      rightIcon={
                        <ChainIcon
                          className="size-8"
                          chainName={chain.name as Chains}
                        />
                      }
                      iconSpacing='auto'
                      variant="connectWallet"
                    >
                      {chain.name}
                    </Button>
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
                    <Button
                      key={chain.name}
                      onClick={() => connectWithChain(chain.id)}
                      rightIcon={
                        <ChainIcon
                          className="size-8"
                          chainName={chain.name as Chains}
                        />
                      }
                      iconSpacing='auto'
                      variant="connectWallet"
                    >
                      {chain.name}
                    </Button>
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
