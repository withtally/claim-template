import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/react";
import { FC, MouseEvent, useCallback, useEffect } from "react";
import { Connector, useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { chainToUse, WALLLET_CONNECT_ID } from "~/constants/site";
import useCustomToasters from "~/hooks/useToasters";
import { showErrorMessage } from "~/utils/getErrorMessage";
import Cross from "../../../../public/img/icons/cross.svg";
import { DisconnectContent } from "./components/DisconnectContent";
import WalletsList from "./components/WalletsList";
import { getChain } from "~/config/wagmi/getChain";

interface Props {
  isOpen: boolean;
  onCloseConnectPopup: () => void;
}

export const WalletConnectPopup: FC<Props> = ({ isOpen, onCloseConnectPopup }) => {
  const { address, connector, isConnected, chainId: currentChain } = useAccount();
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
              switchChain(
                { chainId: chain.id }
              );
            }
            onCloseConnectPopup();
          },
          onError: (error: any) => {
            showErrorMessage({
              errorCode: error?.cause?.code,
              message: error.message,
              toast: errorToast
            });
          }
        }
      );
    };
  }, []);

  const doDisconnect = useCallback(() => {
    disconnect(
      {},
      {
        onSuccess: () => {
          onCloseConnectPopup();
        }
      }
    );
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseConnectPopup}
    >
      <ModalOverlay />
      <ModalContent className="max-md:mx-[20px]">
        <ModalHeader>
          <h1 className="text-xl font-semibold">{isConnected ? "Connected" : "Connect Wallet"}</h1>
        </ModalHeader>
        <ModalCloseButton>
          <Cross className="size-3.5" />
        </ModalCloseButton>
        <ModalBody>
          {isConnected ? (
            <DisconnectContent
              address={address}
              connector={connector}
              onDisconnect={doDisconnect}
              onClose={onCloseConnectPopup}
            />
          ) : (
            <WalletsList
              connectors={connectors}
              defaultConnectHandler={defaultConnectHandler}
            />
          )}
        </ModalBody>

        <ModalFooter justifyContent={isConnected ? "center" : "start"}>
          {isConnected ? (
            <Button onClick={doDisconnect}>Disconect</Button>
          ) : (
            <>
              <p className="mr-[8px]">Don't have a wallet?</p>
              <a href="https://ethereum.org/en/wallets/">Learn more</a>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
