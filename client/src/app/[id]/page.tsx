import React from "react";
import styles from "@/app/[id]/page.module.scss";
import classNames from "classnames/bind";
import HomeClient from "@/app/[id]/client";
import ChatProvider from "@/states/partial/chat/ChatProvider";

const cx = classNames.bind(styles);

const GamePage = () => {
  return (
    <main className={cx("page")}>
      <ChatProvider id="">
        <HomeClient id="" />
      </ChatProvider>
    </main>
  );
};

export default GamePage;
