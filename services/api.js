import api from "@/lib/axios";

// Campaigns
export const getCampaigns = async () => {
  const res = await api.get("/campaigns");
  return res.data;
};

export const createCampaign = async (data) => {
  const res = await api.post("/campaigns", data);
  return res.data;
};

export const API = {
  campaigns: "/campaigns",
  payments: "/payments",
  auth: "/auth",
  chatbot: "/chatbot",
};