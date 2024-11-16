import React from "react";
import styles from "@/components/common/range/tokenRange/TokenRange.module.scss";
import classNames from "classnames/bind";
import TokenRangeImage from "@/public/image/token-range.svg";

const cx = classNames.bind(styles);

type Props = {
  isExpand: boolean;
};

const TokenRange = ({ isExpand }: Props) => {
  return (
    <div className={cx("range-container", { isExpand, isUnExpand: !isExpand })}>
      <div className={cx("range-character")}>
        <TokenRangeImage className={cx("image")} viewBox="0 0 24 24" />
        {isExpand && <span className={cx("range-text")}>$500</span>}
      </div>
      <div className={cx("range-bar")}>
        <div className={cx("bar")} style={{ width: "50%" }} />
        <div className={cx("bar-inner")} style={{ width: "50%" }} />
      </div>
      <div className={cx("range-character")}>
        <TokenRangeImage className={cx("image")} viewBox="0 0 24 24" />
      </div>
    </div>
  );
};

export default TokenRange;
