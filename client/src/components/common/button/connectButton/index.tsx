"use clinet";
import React, { useMemo } from "react";
import styles from "@/components/common/button/connectButton/ConnectButton.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";

const cx = classNames.bind(styles);

type Props = {
  onClick: () => void;
  type: "rainbow" | "onchainkit" | "web3auth";
};

const ConnectButton = ({ onClick, type }: Props) => {
  const name = useMemo(() => {
    return type === "rainbow"
      ? "Rainbow"
      : type === "onchainkit"
        ? "OnchainKit"
        : "Web3Auth";
  }, [type]);

  return (
    <button className={cx("button-container")} onClick={onClick}>
      <Image
        src={`/icon/${type}-logo.png`}
        alt={`${type}-icon`}
        width={24}
        height={24}
        className={cx(`${type}-icon`)}
      />
      <span className={cx("name")}>{name}</span>
    </button>
  );
};

export default ConnectButton;
