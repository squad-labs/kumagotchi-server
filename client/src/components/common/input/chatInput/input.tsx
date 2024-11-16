"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "@/components/common/input/chatInput/ChatInput.module.scss";
import classNames from "classnames/bind";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEY } from "@/shared/constants/api";
import { chat, createChat, tweet } from "@/shared/api/Chat";
import { useChain } from "@/states/partial/chain/ChainProvider";
import ABI from "@/public/assets/kumagochi-abi.json";
import { sepolia } from "viem/chains";

const cx = classNames.bind(styles);

type Props = {
  address?: string;
  status: "expand" | "collapse";
  setChat: Dispatch<
    SetStateAction<{
      type: "mission" | "normal" | "deploy";
      text: string;
    } | null>
  >;
};

const ChatInput = ({ address, setChat, status }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [comment, setComment] = useState<string>("");
  const { walletClient } = useChain();

  const createPostMutation = useMutation({
    mutationKey: [MUTATION_KEY.CREATE_POST],
    mutationFn: createChat,
    onSuccess: async (data) => {
      console.log("data", data);
    },
  });

  const chatMutation = useMutation({
    mutationKey: [MUTATION_KEY.CHAT],
    mutationFn: chat,
    onSuccess: (data) => {
      if (address) {
        createPostMutation.mutate({
          message: `${data.data.content}://isbot`,
          wallet: address,
        });
      }
      setChat({
        type: "normal",
        text: data.data.content,
      });
      setTimeout(() => {
        setChat(null);
      }, 10000);
    },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [status]);

  return (
    <div className={cx("input-container")}>
      <div
        className={cx("input-wrapper")}
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        <input
          ref={inputRef}
          type="text"
          role="input"
          aria-label="chat-input"
          className={cx("input")}
          placeholder="Type message.."
          onChange={(e) => {
            setComment(e.target.value);
          }}
          onKeyUp={async (e) => {
            if (e.key === "Enter" && address && comment.length > 0) {
              if (
                e.key === "Enter" &&
                address &&
                comment.length > 0 &&
                comment === "/generate token"
              ) {
                const res = await walletClient?.deployContract({
                  abi: ABI.abi,
                  account: address as `0x${string}`,
                  bytecode: ABI.bytecode as `0x${string}`,
                  chain: sepolia,
                });
                setChat({
                  type: "deploy",
                  text: res as string,
                });
                setTimeout(() => {
                  setChat(null);
                }, 10000);
                createPostMutation.mutate({
                  message: `${res}://token`,
                  wallet: address,
                });
                setComment("");
                return;
              }
              chatMutation.mutate({ message: comment });
              createPostMutation.mutate({ message: comment, wallet: address });
              setComment("");
            }
          }}
          value={comment}
        />
      </div>
      <button
        className={cx("input-button")}
        onClick={() => {
          if (address && comment.length > 0) {
            chatMutation.mutate({ message: comment });
            createPostMutation.mutate({
              message: comment,
              wallet: address,
            });
            setComment("");
          }
        }}
      >
        <span className={cx("button-title")}>Send</span>
      </button>
    </div>
  );
};

export default ChatInput;
