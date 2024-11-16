"use client";
import React, { useLayoutEffect, useState } from "react";
import styles from "@/components/common/modal/congratutationModal/CongratuationModal.module.scss";
import classNames from "classnames/bind";
import ReactDOM from "react-dom";
import Confetti from "react-confetti";

const cx = classNames.bind(styles);

const CongratuationModal = () => {
  const [isMount, setIsMount] = useState<boolean>(false);

  useLayoutEffect(() => {
    setIsMount(true);

    return () => {
      setIsMount(false);
    };
  }, []);

  if (typeof window === "undefined" || !isMount) return null;

  return ReactDOM.createPortal(
    <div className={cx("modal-container")}>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        tweenDuration={2000}
        run={true}
      />
      <div className={cx("modal-inner")}></div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default CongratuationModal;
