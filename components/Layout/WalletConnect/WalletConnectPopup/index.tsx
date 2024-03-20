import { FC, useCallback, useMemo, useState, MouseEvent } from 'react'
import Cross from '../../../../public/img/icons/cross.svg'
import Back from '../../../../public/img/icons/back.svg'
import WalletsList from './components/WalletsList'
import ChainsList from '~/components/Layout/WalletConnect/WalletConnectPopup/components/ChainsList'
import { DisconnectContent } from './components/DisconnectContent'
import { Connector, useAccount, useChains, useConnect, useDisconnect } from 'wagmi'
import { WALLLET_CONNECT_ID } from '~/constants/site'
import { useToast } from '@chakra-ui/react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import './styles.module.css'
import { Button } from '@chakra-ui/react'
import useCustomToasters from '~/hooks/useToasters'
import { type ConnectErrorType } from '@wagmi/core'
import { getErrorMessage } from '~/utils/getErrorMessage'


interface Props {
  isOpen: boolean;
  onCloseConnectPopup: () => void;
}

export const WalletConnectPopup: FC<Props> = ({ isOpen, onCloseConnectPopup }) => {
  const [isChainsShowed, setIsChainsShowed] = useState<boolean>(false)
  const { address, connector, isConnected, chainId: accountChainId, chain,  } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { errorToast } = useCustomToasters()
  const chains = useChains()

  const walletConnectconnector: Connector = useMemo(() => {
    return connectors.find((connector) => connector.id === WALLLET_CONNECT_ID)
  }, [])

  const walletConnectHandler = useCallback(() => {
    return (event: MouseEvent) => {
      setIsChainsShowed(true);
    };
  }, []);

  const defaultConnectHandler = useCallback((connector: Connector) => {
    return (event: MouseEvent) => {
      connect(
        { connector },
        { onSuccess: () => {
            onCloseConnectPopup()
          },
          onError: (error: any) => {
            errorToast({title:getErrorMessage(error.cause.code)})
          }
        }
      );
      event.preventDefault();
    };
  }, []);

  const connectWithChain = useCallback((chainId: number) => {
    connect(
      { connector: walletConnectconnector, chainId: chainId },
      { onSuccess: () => {
          onCloseConnectPopup()
          setIsChainsShowed(false)
        },
        onError: (error: any ) => {
          errorToast({title:getErrorMessage(error.cause.code, error.message)})
        }
      }
    )
  },[])

  const doDisconnect = useCallback(() => {
    disconnect(
      {},
      {
        onSuccess: () => {
          onCloseConnectPopup();
        },
      }
    );
  }, []);

  const onClose = useCallback(() => {
    if(isChainsShowed){
      return setIsChainsShowed(false)
    }
    return onCloseConnectPopup();
  }, [isChainsShowed]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent >
        <ModalHeader>
          <h1 className="text-xl font-semibold">{isConnected ? 'Connected' : 'Connect Wallet'}</h1>
        </ModalHeader>
        <ModalCloseButton>
          {isChainsShowed ? (
            <Back className="size-3.5" />
          ) : (
            <Cross className="size-3.5" />
          )}
        </ModalCloseButton>
        <ModalBody>
          {isConnected ? (
            <DisconnectContent
              address={address}
              connector={connector}
              onDisconnect={doDisconnect}
              onClose={onClose}
            />
          ) : (
            <>
              {isChainsShowed
                ? <ChainsList chains={chains} connectWithChain={connectWithChain}/>
                : <WalletsList
                  connectors={connectors}
                  setIsChainsShowed={setIsChainsShowed}
                  defaultConnectHandler={defaultConnectHandler}
                  walletConnectHandler={walletConnectHandler}
                />
              }
            </>
          )}
        </ModalBody>

        <ModalFooter justifyContent={isConnected ? "center" : "start"}>
          {
            isConnected ? (
              <Button onClick={doDisconnect}>Disconect</Button>
            ) : (
              <>
                <p className="mr-[8px]">Don't have a wallet?</p>
                <a href="https://ethereum.org/en/wallets/">Learn more</a>
              </>
            )
          }
        </ModalFooter>
      </ModalContent>
    </Modal>

  )
}