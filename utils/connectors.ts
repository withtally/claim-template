import { Connector } from 'wagmi'

export const isMetaMaskConnector = (connector: Connector) => {
  return connector.name === "MetaMask" && connector.type === "metaMask";
}

export const isInjectedMetaMaskConnector = (connector: Connector) => {
  return connector.name === "MetaMask" && isInjectedConnector(connector);
}

export const isInjectedCoinbaseWalletConnector = (connector: Connector) => {
  return connector.name === "Coinbase Wallet" && isInjectedConnector(connector);
}

export const isInjectedConnector = (connector: Connector) => {
  return connector.type === "injected";
}