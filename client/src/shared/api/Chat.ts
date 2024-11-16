import axios from "axios";

export const createChat = async (params: {
  message: string;
  wallet: string;
}) => {
  try {
    const res = await axios.post("/api/chat/create", params);
    if (res.status === 201) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getChat = async () => {
  try {
    const res = await axios.get("/api/chat/recent");
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const chat = async (params: { message: string }) => {
  try {
    const res = await axios.post("/api/chat", {
      content: params.message,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const tweet = async () => {
  try {
    const res = await axios.post("/api/tweet");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

type XmtpParams = {
  message: string;
};

export const xmtp = async ({ message }: XmtpParams) => {
  console.log("xmtp", message);
  try {
    const res = await axios.get("/api/xmtp");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
