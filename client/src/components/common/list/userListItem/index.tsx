import React, { useEffect, useState } from "react";
import styles from "@/components/common/list/userListItem/UserListItem.module.scss";
import classNames from "classnames/bind";
import { http } from "wagmi";
import { mainnet } from "viem/chains";
import { createEnsPublicClient } from "@ensdomains/ensjs";
import AmountImage from "@/public/image/amount-image.svg";
import { getShortenAddress } from "@/shared/utils/address";

const cx = classNames.bind(styles);

type Props = {
  address?: `0x${string}`;
};

const UserListItem = ({ address }: Props) => {
  const [isMount, setIsMount] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);

  const client = createEnsPublicClient({
    chain: mainnet,
    transport: http(),
  });

  useEffect(() => {
    if (!address) return;
    const getEns = async () => {
      const res = await client.getName({ address });
      setName(res.name);
    };
    const getProfile = async () => {
      const res = await client.getRecords({
        name: "resister-boy.eth",
        texts: ["avatar", "email", "description"],
        contentHash: true,
        abi: true,
      });

      res.texts?.forEach((item) => {
        if (item.key === "avatar") {
          setAvatar(item.value);
        }
      });
    };
    setIsMount(true);
    getProfile();
    getEns();
  }, [address]);

  return (
    <div className={cx("item-container")}>
      <div className={cx("user-wrapper")}>
        {isMount && avatar ? (
          <img
            src={avatar ?? AmountImage}
            alt={name ?? "avatar"}
            className={cx("avatar")}
          />
        ) : (
          <AmountImage className={cx("avatar")} viewBox="0 0 20 20" />
        )}
        <p className={cx("name")}>{name ?? getShortenAddress(address ?? "")}</p>
      </div>
      <div className={cx("text-wrapper")}>
        <p className={cx("text-bold")}>KUMA</p>
        <p className={cx("text")}>$2,000</p>
        <div className={cx("ratio-wrapper")}>
          <p className={cx("ratio-text")}>4%</p>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
