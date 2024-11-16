"use client";
import React, { useCallback, useState } from "react";
import styles from "@/app/[id]/client.module.scss";
import classNames from "classnames/bind";
import ChatContainer from "@/components/container/chat-container";
import ActionButtonContainer from "@/components/container/action-button-container";
import BoardContainer from "@/components/container/board-container";
import dynamic from "next/dynamic";
import BoardExpendContainer from "@/components/container/board-expend-container";
import BubbleBlock from "@/components/common/block/bubbleBlock";
import CongratuationModal from "@/components/common/modal/congratutationModal";
import { useSelector } from "react-redux";
import { getModalList } from "@/states/global/slice/modal";

const cx = classNames.bind(styles);

const DynamicGameWrapper = dynamic(
  () => import("@/components/container/game-container"),
  { ssr: false }
);

type Props = {
  id: string;
};

const GameClient = ({ id }: Props) => {
  const modal = useSelector(getModalList);

  const [isExpend, setIsExpend] = useState<boolean>(false);
  const [chat, setChat] = useState<{
    type: "mission" | "normal" | "deploy";
    text: string;
  } | null>(null);

  const handleExpend = useCallback(() => {
    setIsExpend(!isExpend);
  }, [isExpend]);

  return (
    <div className={cx("client")}>
      <DynamicGameWrapper />
      {chat && <BubbleBlock type={chat.type} text={chat.text} />}
      {isExpend ? (
        <BoardExpendContainer handleExpend={handleExpend} />
      ) : (
        <BoardContainer handleExpend={handleExpend} />
      )}
      <ChatContainer id={id} setChat={setChat} />
      <ActionButtonContainer />
      {modal?.map((item) => {
        if (item.key === "Congratuation")
          return <CongratuationModal key={item.key} />;
      })}
    </div>
  );
};

export default GameClient;
