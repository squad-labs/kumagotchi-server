"use client";
import React, { ReactNode } from "react";
import { baseSepolia } from "viem/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";

const CDP_CLIENT_KEY = process.env.NEXT_PUBLIC_CDP_CLIENT_KEY;

const CDP_PROJECT_ID = process.env.NEXT_PUBLIC_CDP_PROJECT_ID;

type Props = {
  children: ReactNode;
};

const CoinbaseProvider = ({ children }: Props) => {
  return (
    <OnchainKitProvider
      apiKey={CDP_CLIENT_KEY}
      chain={baseSepolia}
      projectId={CDP_PROJECT_ID}
    >
      {children}
    </OnchainKitProvider>
  );
};

export default CoinbaseProvider;
