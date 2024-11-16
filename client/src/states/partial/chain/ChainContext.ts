import { CHAIN_CONTRACT } from "@/shared/constants/chain";
import { Context, createContext, Dispatch, SetStateAction } from "react";
import { Chain, PublicClient, WalletClient } from "viem";
import { sepolia } from "viem/chains";

type ChainContextShape = {
  chain: Chain;
  setChain: Dispatch<SetStateAction<Chain>>;
  address: string;
  walletClient: WalletClient | null;
  publicClient: PublicClient | null;
};

const defaultValue: ChainContextShape = {
  chain: sepolia,
  setChain: () => {},
  address: CHAIN_CONTRACT[sepolia.id],
  walletClient: null,
  publicClient: null,
};

export const ChainContext: Context<ChainContextShape> =
  createContext<ChainContextShape>(defaultValue);
