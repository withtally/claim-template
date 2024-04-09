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
import { showErrorMessage } from "~/utils/getErrorMessage";

interface Props {
  onCloseConnectPopup: () => void;
}

export const useWalletConnect = ({ onCloseConnectPopup }: Props) => {
  const {
    address,
    connector,
    isConnected,
    chainId: currentChain,
  } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { errorToast } = useCustomToasters();
  const { switchChain } = useSwitchChain();

  const { chain } = getChain(chainToUse);

  const defaultConnectHandler = useCallback((connector: Connector) => {
    return (event: MouseEvent) => {
      event.preventDefault();
      onCloseConnectPopup();
      connect(
        { connector, chainId: chain.id },
        {
          onSuccess: async (data) => {
            if (connector.id === "walletConnect" && data.chainId !== chain.id) {
              switchChain({ chainId: chain.id });
            }
            onCloseConnectPopup();
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
  }, []);

  const doDisconnect = useCallback(() => {
    disconnect(
      {},
      {
        onSuccess: () => {
          onCloseConnectPopup();
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
