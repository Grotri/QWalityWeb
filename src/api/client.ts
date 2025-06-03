import api from "./index";

export const sendDeleteAccountCode = async () => {
  return await api.delete("/clients/send-code");
};

export const confirmDeleteAccount = async (code: string) => {
  return await api.delete("/clients/confirm", { data: { code } });
};

export const getSensivity = async () => {
  return await api.get("/clients/sensivity");
};

export const editSensivity = async (sensivity: number) => {
  return await api.patch("/clients/sensivity", { sensivity });
};
