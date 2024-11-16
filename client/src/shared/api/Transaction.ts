import axios from "axios";

type CreatePoolInParams = {
  chain: string;
  wallet: string;
  tokenAmount: number;
};

export const createPoolIn = async (params: CreatePoolInParams) => {
  try {
    const res = await axios.post("/api/transaction/pool-in", params);
    return res.data;
  } catch (err) {
    return null;
  }
};
