import React from "react";
import styles from "@/components/container/action-button-container/ActionButtonContainer.module.scss";
import classNames from "classnames/bind";
import ActionButton from "@/components/common/button/actionButton";
import ClapIcon from "@/public/icon/clap-icon.svg";
import DishIcon from "@/public/icon/dish-icon.svg";
import WalkIcon from "@/public/icon/walk-icon.svg";
import SleepIcon from "@/public/icon/sleep-icon.svg";

const cx = classNames.bind(styles);

const ActionButtonContainer = () => {
  return (
    <section className={cx("action-button-container")}>
      <ActionButton
        onClick={() => {
          window.status = "hello";

          setTimeout(() => {
            window.status = "";
          }, 1000);
        }}
      >
        <ClapIcon viewBox="0 0 35 30" className={cx("icon", "clap")} />
      </ActionButton>
      <ActionButton onClick={() => {}}>
        <DishIcon viewBox="0 0 25 37" className={cx("icon", "dish")} />
      </ActionButton>
      <ActionButton onClick={() => {}}>
        <WalkIcon viewBox="0 0 17 28" className={cx("icon", "walk")} />
      </ActionButton>
      <ActionButton onClick={() => {}}>
        <SleepIcon viewBox="0 0 31 21" className={cx("icon")} />
      </ActionButton>
    </section>
  );
};

export default ActionButtonContainer;
