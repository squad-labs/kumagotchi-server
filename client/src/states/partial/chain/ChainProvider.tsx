"use client";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Chain,
  createPublicClient,
  createWalletClient,
  custom,
  http,
  PublicClient,
  WalletClient,
} from "viem";
import { base, baseSepolia, polygon, sepolia } from "viem/chains";
import { ChainContext } from "./ChainContext";
import { CHAIN_CONTRACT } from "@/shared/constants/chain";
import { useAccount } from "wagmi";
import { getChainId } from "viem/actions";

type Props = {
  children: ReactNode;
};

const ChainProvider = ({ children }: Props) => {
  const [chain, setChain] = useState<Chain>(sepolia);
  const [current, setCurrent] = useState<number | null>(null);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const { address } = useAccount();

  const contextValue = useMemo(() => {
    let address = "";

    switch (chain.id) {
      case sepolia.id: {
        address = CHAIN_CONTRACT[11155111];
        break;
      }
      case polygon.id: {
        address = CHAIN_CONTRACT[137];
        break;
      }
      case base.id: {
        address = CHAIN_CONTRACT[8453];
        break;
      }
      case baseSepolia.id: {
        address = CHAIN_CONTRACT[84532];
        break;
      }
    }

    return { chain, setChain, address, walletClient, publicClient };
  }, [chain, walletClient, publicClient]);

  useEffect(() => {
    const getNetwork = async () => {
      if (!walletClient) return;
      const network = await getChainId(walletClient);
      setCurrent(network);
    };
    getNetwork();
  }, [walletClient]);

  useEffect(() => {
    const wc = createWalletClient({
      chain: chain,
      account: address,
      transport: custom(window.ethereum, chain),
    });

    const pc = createPublicClient({
      chain: chain,
      transport: http(),
    });

    setWalletClient(wc);
    setPublicClient(pc);

    if (walletClient && current !== chain.id) {
      walletClient.switchChain({ id: chain.id });
    }
  }, [chain, current]);

  return (
    <ChainContext.Provider value={contextValue}>
      {children}
    </ChainContext.Provider>
  );
};

export const useChain = () => {
  return useContext(ChainContext);
};

export default ChainProvider;
