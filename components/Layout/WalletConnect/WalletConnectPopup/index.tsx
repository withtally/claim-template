import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/react";
import { FC } from 'react'
import { useWalletConnect } from "~/hooks/useWalletConnect";
import Cross from "../../../../public/img/icons/cross.svg";
import { DisconnectContent } from "./components/DisconnectContent";
import WalletsList from "./components/WalletsList";

interface Props {
  isOpen: boolean;
  onCloseConnectPopup: () => void;
}

export const WalletConnectPopup: FC<Props> = ({
  isOpen,
  onCloseConnectPopup,
}) => {
  const {
    defaultConnectHandler,
    doDisconnect,
    isConnected,
    connector,
    address,
    connectors,
  } = useWalletConnect({ onCloseConnectPopup });

  return (
    <Modal isOpen={isOpen} onClose={onCloseConnectPopup}>
      <ModalOverlay />
      <ModalContent className="max-md:mx-[20px]">
        <ModalHeader>
          <h1 className="text-xl font-semibold">
            {isConnected ? "Connected" : "Connect Wallet"}
          </h1>
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
