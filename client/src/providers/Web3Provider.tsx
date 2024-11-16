"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { type State, WagmiProvider } from "wagmi";
import { config } from "@/shared/configs/wallet/setting";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base, sepolia } from "viem/chains";

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
  initialState?: State;
};

const Web3Provider = ({ children, initialState }: Props) => {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_CDP_API_KEY}
          projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID}
          chain={sepolia}
          config={{
            appearance: {
              mode: "auto",
              theme: "base",
            },
          }}
        >
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
