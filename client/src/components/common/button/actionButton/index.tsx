import React, { ReactNode } from "react";
import styles from "@/components/common/button/actionButton/ActionButton.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type Props = {
  onClick: () => void;
  children: ReactNode;
};

const ActionButton = ({ onClick, children }: Props) => {
  return (
    <button
      className={cx("button-container")}
      aria-label="action-button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ActionButton;
