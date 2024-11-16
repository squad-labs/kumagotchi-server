import { Socket } from "socket.io-client";
import { Chat } from "@/shared/types/data/Chat";

export interface BaseSocketEvent {
  basicEmit: (event: string, data: Buffer) => void;
  error: (error: Error) => void;
}

export interface ChatSocketEvent extends BaseSocketEvent {
  chat: (chat: Chat) => void;
}

export type ChatSocketType = Socket<ChatSocketEvent>;
