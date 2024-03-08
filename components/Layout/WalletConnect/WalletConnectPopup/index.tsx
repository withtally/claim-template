import { useWalletConnectContext } from '../../../../contexts/WalletConnectContext'
import { FC, useCallback, useMemo, useState, MouseEvent } from 'react'
import Cross from '../../../../public/img/icons/cross.svg'
import Back from '../../../../public/img/icons/back.svg'
import WalletsList from './components/WalletsList'
import ChainsList from '~/components/Layout/WalletConnect/WalletConnectPopup/components/ChainsList'
import { DisconnectContent } from './components/DisconnectContent'
import { Connector, useAccount, useChains, useConnect, useDisconnect } from 'wagmi'
import { WALLLET_CONNECT_ID } from '~/constants/site'

export const WalletConnectPopup: FC = () => {
  const [isChainsShowed, setIsChainsShowed] = useState<boolean>(false)
  const { setConnectConnectPopupVisibility } = useWalletConnectContext()
  const { address, connector, isConnected } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
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
        { onSuccess: () => setConnectConnectPopupVisibility(false) }
      );
      event.preventDefault();
    };
  }, []);

  const connectWithChain = useCallback((chainId: number) => {
    connect(
      { connector: walletConnectconnector, chainId: chainId },
      { onSuccess: () => setConnectConnectPopupVisibility(false) }
    )
  },[])

  const doDisconnect = useCallback(() => {
    disconnect(
      {},
      {
        onSuccess: () => {
          setConnectConnectPopupVisibility(false);
        },
      }
    );
  }, []);

  const onClose = useCallback(() => {
    setConnectConnectPopupVisibility(false);
  }, []);

  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-blue-grey/70 backdrop-blur-lg"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          onClick={() => setConnectConnectPopupVisibility(false)}
          className="flex min-h-full items-end items-center justify-center p-0 p-4 text-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative my-8 w-full max-w-md transform overflow-hidden rounded-2xl bg-blue-grey p-[16px] text-left shadow-xl transition-all"
          >
            {isConnected ? (
              <DisconnectContent
                address={address}
                connector={connector}
                onDisconnect={doDisconnect}
                onClose={onClose}
              />
            ) : (
              <>
                <div className="mb-[32px] flex items-center justify-between">
                  <h1 className="text-xl font-extrabold font-semibold">Connect Wallet</h1>

                  {isChainsShowed ? (
                    <Back
                      className="size-3.5 cursor-pointer"
                      onClick={() => setIsChainsShowed(false)}
                    />
                  ) : (
                    <Cross
                      className="size-3.5 cursor-pointer"
                      onClick={() => setConnectConnectPopupVisibility(false)}
                    />
                  )}
                </div>
                <div className="mb-[32px]">
                  {isChainsShowed 
                    ? <ChainsList chains={chains} connectWithChain={connectWithChain}/> 
                    : <WalletsList
                        connectors={connectors}
                        setIsChainsShowed={setIsChainsShowed}
                        defaultConnectHandler={defaultConnectHandler}
                        walletConnectHandler={walletConnectHandler}
                      />
                    }
                </div>
                <div className="flex">
                  <p className="mr-[8px]">Don't have a wallet?</p>
                  <a href="https://ethereum.org/en/wallets/">Learn more</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
