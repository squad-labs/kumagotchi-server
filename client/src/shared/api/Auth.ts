import axios from "axios";

type LoginParams = {
  address: string;
  timezone: string;
  ens: string;
  profileImg: string;
};

export const login = async (params: LoginParams) => {
  try {
    const res = await axios.post("/api/users/login", {
      wallet: params.address,
      timezone: params.timezone,
      ens: params.ens,
      profileImg: params.profileImg,
    });

    return res.data;
  } catch (err) {
    return null;
  }
};
