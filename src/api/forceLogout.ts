import { removeToken, removeRefresh } from "../api/token";
import useAuthStore from "../store/useAuthStore";

export const forceLogout = () => {
  const { clearUser } = useAuthStore.getState();
  removeToken();
  removeRefresh();
  sessionStorage.removeItem("user");
  clearUser();
};
