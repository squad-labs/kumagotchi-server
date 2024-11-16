"use client";
import React, { useMemo } from "react";
import styles from "@/components/layout/header/Header.module.scss";
import classNames from "classnames/bind";
import KumagochiLogo from "@/public/logo/KUMAGOTCHI.svg";
import AmountImage from "@/public/image/amount-image.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ChainSwitchDropdown from "@/components/common/dropdown/chainSwitchDropdown";

const cx = classNames.bind(styles);

const Header = () => {
  const pathname = usePathname();

  const isMain = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  if (isMain) return null;

  return (
    <header className={cx("header-container")}>
      <Link href={"/"}>
        <KumagochiLogo viewBox="0 0 197 29" className={cx("logo")} />
      </Link>
      <div className={cx("info-wrapper")}>
        <div className={cx("amount-container")}>
          <AmountImage viewBox="0 0 20 20" />
          <span className={cx("amount-text")}>$2,000</span>
        </div>
        <ChainSwitchDropdown />
      </div>
    </header>
  );
};

export default Header;
