import axios from "axios";
import { getRefresh, getToken, setToken } from "./token";
import { forceLogout } from "./forceLogout";
import { onError } from "../helpers/toast";

const api = axios.create({
  baseURL: "https://api.qwality.space",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefresh();

      if (!refreshToken) {
        forceLogout();
        return Promise.reject(error);
      }

      try {
        const res = await api.post("/auth/refresh", {
          refresh_token: refreshToken,
        });

        const newAccessToken = res.data.access_token;
        setToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        onError("Сессия истекла. Пожалуйста, войдите заново.");
        forceLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
