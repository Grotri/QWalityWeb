import api from "./index";

export const getDefects = async () => {
  return await api.get("/defects");
};
