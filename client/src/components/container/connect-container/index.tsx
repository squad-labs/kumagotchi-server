"use client";
import React, { useEffect, useState } from "react";
import styles from "@/components/container/connect-container/ConnectButtonContainer.module.scss";
import classNames from "classnames/bind";
import ConnectButton from "@/components/common/button/connectButton";
import { useConnect } from "@/shared/hooks/useConnect";
import { web3auth, web3AuthOptions } from "@/shared/configs/wallet/setting";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";
const cx = classNames.bind(styles);

const ConnectButtonContainer = () => {
  const { handleConnectModal } = useConnect();

  const login = async () => {
    return;
    const web3authProvider = await web3auth.connect();
  };

  return (
    <div className={cx("button-container")}>
      <ConnectButton onClick={() => handleConnectModal()} type={"rainbow"} />
      <ConnectButton onClick={() => login()} type={"web3auth"} />
      <ConnectButton onClick={() => handleConnectModal()} type={"onchainkit"} />
    </div>
  );
};

export default ConnectButtonContainer;
