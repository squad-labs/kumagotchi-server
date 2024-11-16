import React, { useEffect, useRef, useState } from "react";
import styles from "@/components/common/input/genInput/GenInput.module.scss";
import classNames from "classnames/bind";
import { useChain } from "@/states/partial/chain/ChainProvider";
import ABI from "@/public/assets/kumagochi-abi.json";
import { useAccount } from "wagmi";
import { sepolia } from "viem/chains";

const cx = classNames.bind(styles);

const GenInput = () => {
  const { walletClient } = useChain();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const { address } = useAccount();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);
  return (
    <input
      onClick={() => {
        inputRef.current?.focus();
      }}
      type="text"
      role="input"
      ref={inputRef}
      aria-label="token-gen-input"
      value={value}
      className={cx("input")}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onKeyUp={async (e) => {
        if (e.key === "Enter" && value === "/generate token") {
          const res = await walletClient?.deployContract({
            abi: ABI.abi,
            account: address as `0x${string}`,
            bytecode: ABI.bytecode as `0x${string}`,
            chain: sepolia,
          });
          console.log(res);
          setValue("");
        }
      }}
    />
  );
};

export default GenInput;
