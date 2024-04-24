import { formatUnits } from "ethers";
import { UIconfig } from "~/config/UIconfig";
import { convertNumberToHumanReadableFormat } from "~/utils/convertNumberToHumanReadableFormat";

const decimals = UIconfig.tokenConversionData.decimals;
const tokenSymbol = UIconfig.tokenConversionData.tokenSymbol;

export const convertTokensAmount = (amount: string) => {
  return `${convertNumberToHumanReadableFormat(
    +formatUnits(amount, decimals),
  )} ${tokenSymbol}`;
};
