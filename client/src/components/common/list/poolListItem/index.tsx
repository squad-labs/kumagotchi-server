import React from "react";
import styles from "@/components/common/list/poolListItem/PoolListItem.module.scss";
import classNames from "classnames/bind";
import KumagochiSample from "@/public/image/kumagochi-sample-1.svg";
import { CHAIN_CONTRACT } from "@/shared/constants/chain";
import { getShortenAddress } from "@/shared/utils/address";
import SepliaLogo from "@/public/icon/sepolia-logo.svg";
import { useRouter } from "next/navigation";

const cx = classNames.bind(styles);

const PoolListItem = () => {
  const router = useRouter();
  return (
    <div className={cx("item-container")} onClick={() => router.push("/1")}>
      <div className={cx("image-wrapper")}>
        <KumagochiSample viewBox="0 0 28 28" className={cx("image")} />
        <div className={cx("text-wrapper")}>
          <span className={cx("name")}>Kumagochi.eth</span>
          <span className={cx("address")}>
            {getShortenAddress(CHAIN_CONTRACT[11155111])}
          </span>
        </div>
      </div>
      <div className={cx("market-wrapper")}>
        <div className={cx("price-wrapper")}>
          <span className={cx("price")}>0.1ETH</span>
          <span className={cx("total")}>0.4ETH</span>
        </div>
        <SepliaLogo className={cx("logo")} viewBox="0 0 32 32" />
      </div>
    </div>
  );
};

export default PoolListItem;
