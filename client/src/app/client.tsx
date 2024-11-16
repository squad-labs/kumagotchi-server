"use client";
import React from "react";
import styles from "@/app/client.module.scss";
import classNames from "classnames/bind";
import KumagochiLogo from "@/public/logo/KUMAGOTCHI.svg";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";
import GenInput from "@/components/common/input/genInput";
import PoolListItem from "@/components/common/list/poolListItem";

const DynamicConnectButtonContainer = dynamic(
  () => import("@/components/container/connect-container"),
  { ssr: false }
);

const cx = classNames.bind(styles);
const HomeClient = () => {
  const { address } = useAccount();

  if (address) {
    return (
      <div className={cx("client-connect")}>
        <div className={cx("client-inner")}>
          <div className={cx("inner")}>
            <button className={cx("scroll-bar")} />
            <div className={cx("title-wrapper")}>
              <span className={cx("title")}>Generated token lists</span>
            </div>
            <div className={cx("list-wrapper")}>
              <PoolListItem />
            </div>
            <div className={cx("input-wrapper")}>
              <GenInput />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={cx("client")}>
      <div className={cx("title-wrapper")}>
        <p className={cx("title")}>Welcome to</p>
        <KumagochiLogo viewBox="0 0 197 29" className={cx("logo")} />
      </div>
      <div className={cx("wallet-wrapper")}>
        <p className={cx("title")}>Connect a wallet</p>
        <DynamicConnectButtonContainer />
      </div>
    </div>
  );
};

export default HomeClient;
