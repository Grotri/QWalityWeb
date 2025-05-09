import api from "./index";

export const getUserInfo = async () => {
  return await api.get("/users/me");
};
