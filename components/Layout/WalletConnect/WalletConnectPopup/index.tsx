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
import { getTextFromDictionary } from '~/utils/getTextFromDictionary'
import { chakra } from '@chakra-ui/react'

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
            {isConnected ? "Connected" : getTextFromDictionary("connectModal_title")}
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
            <div className="flex flex-wrap">
              <p className="mr-[8px]">Don't have a wallet?</p>
              <a href="https://ethereum.org/en/wallets/" target="_blank" className="group transition duration-300">
                Learn more
                <chakra.span
                  className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5" bg="primary.600"></chakra.span>
              </a>
            </div>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
