import React from "react";
import styles from "@/components/container/board-expend-container/BoardExpendContainer.module.scss";
import classNames from "classnames/bind";
import BoardExpendButton from "@/components/common/button/boardExpendButton";
import TokenRange from "@/components/common/range/tokenRange";
import UserListItem from "@/components/common/list/userListItem";
import BuyButton from "@/components/common/button/buyButton";
import { useAccount } from "wagmi";

const cx = classNames.bind(styles);

type Props = {
  handleExpend: () => void;
};

const BoardExpendContainer = ({ handleExpend }: Props) => {
  const { address } = useAccount();
  return (
    <div className={cx("board-container")}>
      <div className={cx("board-inner")}>
        <div className={cx("text-wrapper")}>
          <p className={cx("text-bold")}>8K+</p>
          <p className={cx("text")}>more to see</p>
          <p className={cx("text-bold")}>WILDGOTCHI</p>
        </div>
        <TokenRange isExpand={true} />
        <div className={cx("list-container")}>
          <div className={cx("list-wrapper")}>
            <span className={cx("list-title")}>My Share</span>
            <div className={cx("user-item")}>
              <UserListItem address={address} />
            </div>
          </div>
          <div className={cx("list-wrapper")}>
            <span className={cx("list-title")}>Community Share</span>
          </div>
        </div>
        <div className={cx("button-wrapper")}>
          <BoardExpendButton handleExpend={handleExpend} />
        </div>
        <div className={cx("buy-button-wrapper")}>
          <BuyButton type={"expand"} />
        </div>
      </div>
    </div>
  );
};

export default BoardExpendContainer;
