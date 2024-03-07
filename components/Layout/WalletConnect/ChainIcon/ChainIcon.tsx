import { FC } from 'react'
import EthereumIcon from '~/public/img/icons/chains/eth.svg'
import PolygonIcon from '~/public/img/icons/chains/polygon.svg'
import SepoliaIcon from '~/public/img/icons/chains/sepolia.svg'
import OptimismIcon from '~/public/img/icons/chains/optimism.svg'
import AvalancheIcon from '~/public/img/icons/chains/avalanche.svg'
import BNBIcon from '~/public/img/icons/chains/bnb.svg'
import ArbitrumOneIcon from '~/public/img/icons/chains/arbitrum_one.svg'
import { Chains } from '~/types/chains'

interface Props {
  className: string
  chainName: Chains
}

export const ChainIcon: FC<Props> = ({ className, chainName }) => {
  switch (chainName) {
    case 'Ethereum':
      return <EthereumIcon className={className} />
    case 'Polygon':
      return <PolygonIcon className={className} />
    case 'Sepolia':
      return <SepoliaIcon className={className} />
    case 'OP Mainnet':
      return <OptimismIcon className={className} />
    case 'Avalanche':
      return <AvalancheIcon className={className} />
    case 'BNB Smart Chain':
      return <BNBIcon className={className} />
    case 'Arbitrum One':
      return <ArbitrumOneIcon className={className} />
    case 'OP Mainnet':
      return <SepoliaIcon className={className} />
    default:
      break
  }
}
