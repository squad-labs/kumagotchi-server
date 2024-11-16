import React, { Fragment } from "react";
import styles from "@/components/common/block/bubbleBlock/BubbleBlock.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";
import { useChain } from "@/states/partial/chain/ChainProvider";

const cx = classNames.bind(styles);

type Props = {
  type: "mission" | "normal" | "deploy";
  text: string;
};

const BubbleBlock = ({ type, text }: Props) => {
  const { chain } = useChain();
  return (
    <div className={cx("block-container")}>
      {type === "deploy" ? (
        <div className={cx("wrapper")}>
          <span className={cx("block-text")}>
            why hamster fighting club... what is $pnut doing? $pfc lets gooooo
          </span>
          <Link
            href={`${chain.blockExplorers?.default.url}/tx/${text}`}
            target="_blank"
          >
            <span className={cx("block-highlight")}>go to scanner</span>
          </Link>
        </div>
      ) : (
        <span className={cx("block-text")}>{text}</span>
      )}
    </div>
  );
};

export default BubbleBlock;
