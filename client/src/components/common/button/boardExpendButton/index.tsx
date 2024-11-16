import React from "react";
import styles from "@/components/common/button/boardExpendButton/BoardExpendButton.module.scss";
import classNames from "classnames/bind";
import { useChain } from "@/states/partial/chain/ChainProvider";

const cx = classNames.bind(styles);

type Props = {
  handleExpend: () => void;
};

const BoardExpendButton = ({ handleExpend }: Props) => {
  return <button className={cx("button-container")} onClick={handleExpend} />;
};

export default BoardExpendButton;
