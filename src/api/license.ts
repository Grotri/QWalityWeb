import api from "./index";

interface IBuyLisenceParams {
  licenseType: string;
  paymentMethod: string;
}

export const giveLisence = async () => {
  return await api.get("/payments/seed-dev");
};

export const buyLisence = async (payload: IBuyLisenceParams) => {
  return await api.post("/lisences", payload);
};

export const getLisences = async () => {
  return await api.get("/lisences");
};
