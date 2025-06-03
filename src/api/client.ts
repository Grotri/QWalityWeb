import api from "./index";

export const sendDeleteAccountCode = async () => {
  return await api.delete("/clients/send-code");
};

export const confirmDeleteAccount = async (code: string) => {
  return await api.delete("/clients/confirm", { data: { code } });
};
