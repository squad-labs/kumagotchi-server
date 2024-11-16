import { Coinbase } from "@coinbase/coinbase-sdk";
import { base } from "viem/chains";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";

const API_NAME = process.env.NEXT_PUBLIC_CDP_API_KEY;

const API_SECRET = process.env.NEXT_PUBLIC_CDP_API_SECRET;

const WAGMI_PROJECT_ID = process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID;

if (!WAGMI_PROJECT_ID || !API_NAME || !API_SECRET) {
  throw new Error("env is not defined");
}

export const CDPConfig = new Coinbase({
  apiKeyName: API_NAME,
  privateKey: API_SECRET,
});

export function getWalletConfig() {
  return createConfig({
    chains: [base], // add baseSepolia for testing
    connectors: [
      coinbaseWallet({
        appName: "OnchainKit",
        preference: "smartWalletOnly",
        version: "4",
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [base.id]: http(), // add baseSepolia for testing
    },
  });
}
