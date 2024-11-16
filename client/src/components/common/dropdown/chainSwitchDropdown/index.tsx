import React, { useCallback } from "react";
import styles from "@/components/common/dropdown/chainSwitchDropdown/ChainSwitchDropdown.module.scss";
import classNames from "classnames/bind";
import { sepolia } from "viem/chains";
import SepliaLogo from "@/public/icon/sepolia-logo.svg";
import DropdownIcon from "@/public/icon/dropdown-icon.svg";
import { useChain } from "@/states/partial/chain/ChainProvider";

const cx = classNames.bind(styles);

const ChainSwitchDropdown = () => {
  const { chain, setChain } = useChain();

  const renderImage = useCallback(() => {
    switch (chain.id) {
      case sepolia.id: {
        return <SepliaLogo className={cx("image")} viewBox="0 0 32 32" />;
      }
    }
  }, [chain]);

  return (
    <div className={cx("dropdown-container")}>
      <div className={cx("dropdown-header")}>
        {renderImage()}
        <DropdownIcon viewBox="0 0 14 9" className={cx("icon")} />
      </div>
      <div className={cx("dropdown-list")}></div>
    </div>
  );
};

export default ChainSwitchDropdown;
