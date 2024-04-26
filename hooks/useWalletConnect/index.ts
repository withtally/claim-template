import { MouseEvent, useCallback } from "react";
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
import { getChain } from "~/config/wagmi/getChain";
import { chainToUse } from "~/constants/site";
import useCustomToasters from "~/hooks/useToasters";
import { isMetaMaskConnector } from "~/utils/connectors";
import { showErrorMessage } from "~/utils/getErrorMessage";
import { isMobile } from "~/utils/isMobile";
import { useClaimContext } from "../../contexts/ClaimContext";
import { useWalletConnectContext } from "../../contexts/WalletConnectContext";

interface Props {
  onCloseConnectPopup: () => void;
}

export const useWalletConnect = ({ onCloseConnectPopup }: Props) => {
  const { address, connector, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { errorToast } = useCustomToasters();

  const { chain } = getChain(chainToUse);

  const { setIsClaimStepperVisible, handleCheckEligibility,  } =
    useClaimContext();

  const {isCheckEligibility, setIsCheckEligibility} = useWalletConnectContext()

  const defaultConnectHandler = useCallback((connector: Connector) => {
    return (event: MouseEvent) => {
      event.preventDefault();
      onCloseConnectPopup();

      if (
        isMetaMaskConnector(connector) &&
        typeof window !== "undefined" &&
        isMobile()
      ) {
        let host = window.location.host;

        document.location = `https://metamask.app.link/dapp/${host}/`;
      }
      connect(
        { connector, chainId: chain.id },
        {
          onSuccess: (data) => {
            onCloseConnectPopup();
            if (isCheckEligibility) {
              handleCheckEligibility(null, data.accounts[0]).finally(() => {
                setIsCheckEligibility(false);
              });
            }
          },
          onError: (error: any) => {
            showErrorMessage({
              errorCode: error?.cause?.code,
              message: error.message,
              toast: errorToast,
            });
          },
        },
      );
    };
  }, [handleCheckEligibility, isCheckEligibility]);

  const doDisconnect = useCallback(() => {
    disconnect(
      {},
      {
        onSuccess: () => {
          onCloseConnectPopup();
          setIsClaimStepperVisible(false);
        },
      },
    );
  }, []);

  return {
    doDisconnect,
    defaultConnectHandler,
    isConnected,
    connector,
    address,
    connectors,
  };
};
