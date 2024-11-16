import { getWalletConfig } from "@/shared/configs/coinbase/setting";

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
