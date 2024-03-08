import { WALLLET_CONNECT_ID } from '~/constants/site'
import { ChainIcon } from '~/components/Layout/WalletConnect/ChainIcon/ChainIcon'
import { Chains } from '~/types/chains'
import { Dispatch, FC, SetStateAction, useMemo } from 'react'
import { Connector, useChains, useConnect } from 'wagmi'
import { useWalletConnectContext } from '../../../../../contexts/WalletConnectContext'

const ChainsList: FC = () => {
  const {connectors, connect} = useConnect();
  const chains = useChains();
  const { setConnectConnectPopupVisibility } = useWalletConnectContext()

  const walletConnectconnector: Connector = useMemo(() => {
    return connectors.find(connector => connector.id === WALLLET_CONNECT_ID)
  },[chains.length])

  return(
    <>
      <div className="mb-[16px]">
        Please select a network for WalletConnect:
      </div>
      <div className="flex flex-col gap-y-[16px] max-h-[50vh] md:max-h-[500px] overflow-y-auto">
        {chains.filter(chain => !chain.testnet).map((chain) => {
          return (
            <div
              key={chain.name}
              onClick={() => {
                connect(
                  { connector: walletConnectconnector, chainId: chain.id },
                  { onSuccess: () => setConnectConnectPopupVisibility(false) }
                )
              }}
              className="flex cursor-pointer items-center justify-between rounded-md border border-gray-500 p-[15px] "
            >
              {chain.name}

              <ChainIcon className="size-10" chainName={chain.name as Chains} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ChainsList;