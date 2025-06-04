import api from "./index";

interface ICreateSubAccountParams {
  login?: string;
  role?: string;
  password?: string;
  color_theme?: string;
  font_size?: string;
}

export const getUserInfo = async () => {
  return await api.get("/users/me");
};

export const createSubAccount = async (payload: ICreateSubAccountParams) => {
  return await api.post("/users/sub-account", payload);
};

export const getSubAccounts = async () => {
  return await api.get("/users");
};

export const editAccount = async (
  id: string,
  payload: ICreateSubAccountParams
) => {
  return await api.patch(`/users/${id}`, payload);
};

export const deleteSubAccount = async (id: string) => {
  return await api.delete(`/users/${id}`);
};
