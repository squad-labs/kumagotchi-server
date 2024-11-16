import React from "react";
import styles from "@/components/common/list/chatListItem/ChatListItem.module.scss";
import classNames from "classnames/bind";
import { Chat } from "@/shared/types/data/Chat";
import { getShortenAddress } from "@/shared/utils/address";
import { fetchRelatedTime } from "@/shared/utils/date";
import Link from "next/link";
import { useChain } from "@/states/partial/chain/ChainProvider";

const cx = classNames.bind(styles);

type Props = Chat & {
  type: "left" | "right";
  isLink: boolean;
};

const ChatListItem = ({
  _id,
  message,
  wallet,
  ens,
  profileImg,
  createdAt,
  type,
  isLink,
}: Props) => {
  const { chain } = useChain();
  return (
    <div
      className={cx("item-container", {
        left: type === "left",
        right: type === "right",
      })}
    >
      {type === "left" && (
        <img
          src={"/image/amount.png"}
          alt="profile"
          width={32}
          height={32}
          className={cx("image")}
        />
      )}

      <div
        className={cx(
          type === "left" ? "text-wrapper-left" : "text-wrapper-right"
        )}
      >
        <div
          className={cx(type === "left" ? "metadata-left" : "metadata-right")}
        >
          <p className={cx("username")}>
            {type === "left"
              ? "Kumagochi"
              : ens && ens.length > 0
                ? ens
                : getShortenAddress(wallet)}
          </p>
          <p className={cx("date")}>{fetchRelatedTime(createdAt, false)}</p>
        </div>
        <div className={cx("message-wrapper")}>
          {isLink ? (
            <Link
              href={`${chain.blockExplorers?.default.url}/tx/${message}`}
              target={"_blank"}
            >
              <p className={cx("message")}>go to scanner</p>
            </Link>
          ) : (
            <p className={cx("message")}>{message}</p>
          )}
        </div>
      </div>
      {type === "right" && (
        <img
          src={profileImg}
          alt="profile"
          width={32}
          height={32}
          className={cx("image")}
        />
      )}
    </div>
  );
};

export default ChatListItem;
