import React from "react";
import styles from "@/components/container/board-container/BoardContainer.module.scss";
import classNames from "classnames/bind";
import BuyButton from "@/components/common/button/buyButton";
import TokenRange from "@/components/common/range/tokenRange";
import BoardExpendButton from "@/components/common/button/boardExpendButton";

const cx = classNames.bind(styles);

type Props = {
  handleExpend: () => void;
};

const BoardContainer = ({ handleExpend }: Props) => {
  return (
    <div className={cx("board-container")}>
      <div className={cx("board-inner")}>
        <div className={cx("text-wrapper")}>
          <p className={cx("text-bold")}>8K+</p>
          <p className={cx("text")}>more to see</p>
          <p className={cx("text-bold")}>WILDGOTCHI</p>
        </div>
        <div className={cx("range-wrapper")}>
          <TokenRange isExpand={false} />
          <BuyButton type={"normal"} />
        </div>
        <div className={cx("button-wrapper")}>
          <BoardExpendButton handleExpend={handleExpend} />
        </div>
      </div>
    </div>
  );
};

export default BoardContainer;
