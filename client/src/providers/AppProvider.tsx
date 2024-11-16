"use client";
import React, {
  Fragment,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { getCookie } from "cookies-next";
import { ThemeType } from "@/shared/types/etc/theme";
import { http, useAccount } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEY } from "@/shared/constants/api";
import { login } from "@/shared/api/Auth";
import { useRouter } from "next/navigation";
import { createEnsPublicClient } from "@ensdomains/ensjs";
import { mainnet } from "viem/chains";
import { getTimezone } from "@/shared/utils/date";
import ChainProvider from "@/states/partial/chain/ChainProvider";

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const router = useRouter();
  const theme = getCookie("theme") as ThemeType;
  const { address, isConnected } = useAccount();
  const [isMount, setIsMount] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);

  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme ? theme : "light"
    );
  }, []);

  const client = createEnsPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const loginMutation = useMutation({
    mutationKey: [MUTATION_KEY.LOGIN, address],
    mutationFn: login,
    onSuccess: (data) => {},
  });

  useEffect(() => {
    if (address && isMount) {
      const getEns = async () => {
        const res = await client.getName({
          address: address as `0x${string}`,
        });

        setName(res?.name);
      };
      const getProfile = async () => {
        if (name) {
          const res = await client.getRecords({
            name: name,
            texts: ["avatar", "email", "description"],
            contentHash: true,
            abi: true,
          });

          res.texts?.forEach((item) => {
            if (item.key === "avatar") {
              setAvatar(item.value);
            }
          });
        }
      };
      getProfile();
      getEns();
      loginMutation.mutate({
        address,
        timezone: getTimezone(),
        ens: name ?? "",
        profileImg: avatar ?? "",
      });
    }
    setIsMount(true);

    return () => {
      setIsMount(false);
    };
  }, [address, name, avatar, isMount]);
  return (
    <Fragment>
      <ChainProvider>{children}</ChainProvider>
    </Fragment>
  );
};

export default AppProvider;
