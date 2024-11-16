"use client";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useSignMessage, useDisconnect } from "wagmi";
import { config } from "@/shared/configs/wallet/setting";
import { disconnect } from "@wagmi/core";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { deleteCookie } from "cookies-next";

export const useConnect = () => {
  const { disconnect: walletDisconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const [isClick, setIsClick] = useState<boolean>(false);

  const { address, isConnected } = useAccount();

  const handleModal = () => {
    if (address && isConnected) {
      handleAccountModal();
    } else {
      handleConnectModal();
    }
  };

  useEffect(() => {
    const handleSignMessage = async () => {
      const res = await signMessageAsync({
        account: address,
        message:
          "Welcome to Kumagochi. Kumagochi games request your account. We love you.",
      });
    };
    if (isClick && address && isConnected) {
      handleSignMessage();
    }
  }, [isClick, address, isConnected]);

  const handleConnectModal = () => {
    setIsClick(true);
    try {
      if (openConnectModal) openConnectModal();
    } catch (e) {
      if (openConnectModal) openConnectModal();
      return e;
    }
  };

  const handleAccountModal = () => {
    try {
      if (openAccountModal) openAccountModal();
    } catch (e) {
      if (openAccountModal) openAccountModal();
      return e;
    }
  };

  const handleDisconnect = useCallback(async () => {
    await walletDisconnect();
    await walletDisconnect();
    await walletDisconnect();
    deleteCookie("address");
    deleteCookie("address");
    deleteCookie("accessToken");
    deleteCookie("accessToken");
    await disconnect(config);
    await disconnect(config);
    await disconnect(config);
    window.location.reload();
  }, [config]);

  return {
    handleModal,
    handleConnectModal,
    handleAccountModal,
    handleDisconnect,
  };
};
