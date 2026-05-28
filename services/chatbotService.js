import api from "@/lib/axios";

export const sendMessageToBot = async (message) => {
  const res = await api.post("/chatbot", { message });
  return res.data.reply;
};