import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "@/components/container/chat-container/ChatContainer.module.scss";
import classNames from "classnames/bind";
import ChatInput from "@/components/common/input/chatInput/input";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/shared/constants/api";
import { getChat } from "@/shared/api/Chat";
import { Chat } from "@/shared/types/data/Chat";
import ChatListItem from "@/components/common/list/chatListItem";
import { useChat } from "@/states/partial/chat/ChatProvider";
import { CHAIN_CONTRACT } from "@/shared/constants/chain";

const cx = classNames.bind(styles);

type Props = {
  id: string;
  setChat: Dispatch<
    SetStateAction<{
      type: "mission" | "normal" | "deploy";
      text: string;
    } | null>
  >;
};

const ChatContainer = ({ id, setChat }: Props) => {
  const { address } = useAccount();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"expand" | "collapse">("collapse");
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_CHAT, id],
    queryFn: async () => {
      return getChat();
    },
  });
  const [chatList, setChatList] = useState<Chat[]>(
    data ? data.slice().reverse() : []
  );
  const { socket } = useChat();

  const handleStatus = useCallback(() => {
    if (status === "expand") {
      setStatus("collapse");
    } else {
      setStatus("expand");
    }
  }, [status]);

  useEffect(() => {
    if (data) {
      setChatList(data.slice().reverse());
    }
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollRef, status, data]);

  useEffect(() => {
    socket?.on("chat", (chat: Chat) => {
      setChatList([...chatList, chat]);
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });
  }, [socket, chatList]);

  return (
    <div
      className={cx("chat-container", {
        expand: status === "expand",
        collapse: status === "collapse",
      })}
    >
      <div className={cx("chat-inner")}>
        <button className={cx("scroll-bar")} onClick={handleStatus} />
        {status === "expand" && (
          <div className={cx("chat-playground")}>
            {chatList.map((item: Chat, index: number) => {
              const isBot = item.message.slice(-8) === "://isbot";
              const isToken = item.message.slice(-8) === "://token";

              return (
                <div key={item._id} className={cx("item-wrapper")}>
                  <ChatListItem
                    key={item._id}
                    _id={item._id}
                    message={
                      isBot || isToken
                        ? item.message.slice(0, -8)
                        : item.message
                    }
                    wallet={item.wallet}
                    ens={item.ens}
                    profileImg={item.profileImg}
                    createdAt={item.createdAt}
                    type={isBot || isToken ? "left" : "right"}
                    handle={""}
                    updatedAt={""}
                    isLink={isToken}
                  />
                </div>
              );
            })}
            <div ref={scrollRef} />
          </div>
        )}
        <ChatInput address={address} setChat={setChat} status={status} />
      </div>
    </div>
  );
};

export default ChatContainer;
