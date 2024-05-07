import { FC } from "react";
import ArbitrumNovaIcon from "~/public/img/icons/chains/arbitrum_nova.svg";
import ArbitrumOneIcon from "~/public/img/icons/chains/arbitrum_one.svg";
import AvalancheIcon from "~/public/img/icons/chains/avalanche.svg";
import BNBIcon from "~/public/img/icons/chains/bnb.svg";
import EthereumIcon from "~/public/img/icons/chains/eth.svg";
import GnosisIcon from "~/public/img/icons/chains/gnosis.svg";
import MoonbeamIcon from "~/public/img/icons/chains/moonbeam.svg";
import OptimismIcon from "~/public/img/icons/chains/optimism.svg";
import PolygonIcon from "~/public/img/icons/chains/polygon.svg";
import ZkSyncEraIcon from "~/public/img/icons/chains/zksync_era.svg";
import { Chains } from "~/types/chains";

interface Props {
  className: string;
  chainName: Chains;
}

export const ChainIcon: FC<Props> = ({ className, chainName }) => {
  switch (chainName) {
    case "Ethereum":
      return <EthereumIcon className={className} />;
    case "Polygon":
    case "Polygon Mumbai":
      return <PolygonIcon className={className} />;
    case "Sepolia":
      return <EthereumIcon className={className} />;
    case "OP Mainnet":
      return <OptimismIcon className={className} />;
    case "Avalanche":
    case "Avalanche Fuji":
      return <AvalancheIcon className={className} />;
    case "BNB Smart Chain":
    case "Binance Smart Chain Testnet":
      return <BNBIcon className={className} />;
    case "Arbitrum One":
      return <ArbitrumOneIcon className={className} />;
    case "Gnosis":
      return <GnosisIcon className={className} />;
    case "Arbitrum Nova":
      return <ArbitrumNovaIcon className={className} />;
    case "zkSync Era":
      return <ZkSyncEraIcon className={className} />;
    case "Moonbeam":
      return <MoonbeamIcon className={className} />;
    default:
      break;
  }
};
