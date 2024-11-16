import React, { useCallback } from "react";
import styles from "@/components/common/button/buyButton/BuyButton.module.scss";
import classNames from "classnames/bind";
import { useChain } from "@/states/partial/chain/ChainProvider";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEY } from "@/shared/constants/api";
import { createPoolIn } from "@/shared/api/Transaction";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL, SET_MODAL } from "@/states/global/slice/modal";

const cx = classNames.bind(styles);

type Props = {
  type: "normal" | "expand";
};

const BuyButton = ({ type }: Props) => {
  const dispatch = useDispatch();
  const { address: account } = useAccount();
  const { walletClient, address, chain } = useChain();

  const handleBuyToken = useCallback(async () => {
    if (walletClient && address && account) {
      await walletClient?.sendTransaction({
        to: address as `0x${string}`,
        value: parseUnits("0.1", 18),
        account,
        chain,
      });
    }
  }, [address, walletClient, account, chain]);

  const buyTokenMutation = useMutation({
    mutationKey: [MUTATION_KEY.BUY_TOKEN, chain, account, address],
    mutationFn: handleBuyToken,
    onSuccess: () => {
      poolInMutation.mutate({
        chain: chain.name,
        wallet: account as `0x${string}`,
        tokenAmount: 0.1,
      });
    },
  });

  const poolInMutation = useMutation({
    mutationKey: [MUTATION_KEY.POOL_IN, chain, account, address],
    mutationFn: createPoolIn,
    onSuccess: () => {
      dispatch(
        SET_MODAL({
          key: "Congratuation",
          layer: 1,
          params: {
            key: "Congratuation",
          },
        })
      );

      setTimeout(() => {
        dispatch(
          CLOSE_MODAL({
            key: "Congratuation",
          })
        );
      }, 5000);
    },
  });

  return (
    <button
      className={cx("button-container", {
        normal: type === "normal",
        expand: type === "expand",
      })}
      onClick={() => {
        buyTokenMutation.mutate();
      }}
    />
  );
};

export default BuyButton;
