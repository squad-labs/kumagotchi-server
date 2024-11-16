import { Chat } from "@/shared/types/data/Chat";
import { ChatSocketType } from "@/shared/types/etc/socket";
import { Context, createContext, Dispatch, SetStateAction } from "react";

type ChatContextShape = {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  socket: ChatSocketType | null;
  isConnected: boolean;
  commentList: Chat[];
  setCommentList: Dispatch<SetStateAction<Chat[]>>;
};

const defaultValue: ChatContextShape = {
  comment: "",
  setComment: () => {},
  socket: null,
  isConnected: false,
  commentList: [],
  setCommentList: () => {},
};

export const ChatContext: Context<ChatContextShape> =
  createContext<ChatContextShape>(defaultValue);
