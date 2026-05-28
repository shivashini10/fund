import api from "@/lib/axios";

export const createOrder = async (campaignId, amount) => {
  const res = await api.post("/payments/create-order", {
    campaignId,
    amount,
  });

  return res.data;
};

export const verifyPayment = async (data) => {
  const res = await api.post("/payments/verify", data);
  return res.data;
};