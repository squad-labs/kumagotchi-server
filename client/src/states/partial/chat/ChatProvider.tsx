"use client";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ChatContext } from "@/states/partial/chat/ChatContext";
import { ChatSocketType } from "@/shared/types/etc/socket";
import { Chat } from "@/shared/types/data/Chat";
import { io } from "socket.io-client";

type Props = {
  id: string;
  children: ReactNode;
};

const ChatProvider = ({ id, children }: Props) => {
  const [comment, setComment] = useState<string>("");
  const [socket, setSocket] = useState<ChatSocketType | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<Chat[]>([]);

  const contextValue = useMemo(() => {
    return {
      comment,
      setComment,
      socket,
      isConnected,
      commentList,
      setCommentList,
    };
  }, [id, isConnected, socket, comment, commentList]);

  useEffect(() => {
    const socket: ChatSocketType = io(
      `${process.env.NEXT_PUBLIC_SOCKET_BASE_URL}/chat`,
      {
        transports: ["websocket"],
        addTrailingSlash: true,
        rejectUnauthorized: false,
        agent: false,
        upgrade: false,
      }
    ).connect();

    setSocket(socket);

    function onError(error: Error) {
      throw new Error(error.message);
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("error", onError);

      socket.disconnect();
    };
  }, []);

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
