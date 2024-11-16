import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { base, baseSepolia, mainnet, polygon } from "viem/chains";
import {} from "@coinbase/onchainkit";
import { coinbaseWallet } from "wagmi/connectors";

if (!process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID) {
  throw new Error("WAGMI_PROJECT_ID is required");
}

export const PROJECT_ID = process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID || null;

if (!PROJECT_ID) {
  throw new Error("PROJECT_ID is required");
}

export const chain = baseSepolia;

const metadata = {
  name: "Kumagochi",
  description: "Kumagochi",
  url: "http://localhost:3000",
  icons: [""],
};

export const config = getDefaultConfig({
  appName: metadata.name,
  projectId: PROJECT_ID,
  chains: [baseSepolia, base, polygon, baseSepolia],
  syncConnectedChain: false,
  ssr: true,
  multiInjectedProviderDiscovery: false,
});

export const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

export const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

export const web3AuthOptions: Web3AuthOptions = {
  clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID ?? "",
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
};

export const web3auth = new Web3Auth(web3AuthOptions);
