import api from "./index";

export const buyLicense = async (tariff_id: number) => {
  return await api.post("/licenses", { tariff_id });
};

export const getCurrentLicense = async () => {
  return await api.get("/licenses");
};
