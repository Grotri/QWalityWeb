import axios from "axios";
import { getRefresh, getToken, setRefresh, setToken } from "./token";
import { forceLogout } from "./forceLogout";
import { onError } from "../helpers/toast";
import i18n from "../i18n";

const api = axios.create({
  baseURL: "https://api.qwality.space",
  headers: {
    "Content-Type": "application/json",
  },
});

export const plainAxios = axios.create();

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefresh();
  if (!refreshToken) return null;

  try {
    const res = await plainAxios.post(
      "https://api.qwality.space/auth/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const newAccessToken = res.data.access_token;
    const newRefreshToken = res.data.refresh_token;

    setToken(newAccessToken);
    if (newRefreshToken) {
      setRefresh(newRefreshToken);
    }

    return newAccessToken;
  } catch {
    return null;
  }
};

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

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      const newToken = await refreshAccessToken();

      isRefreshing = false;

      if (newToken) {
        onRefreshed(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }

      onError(i18n.t("sessionExpired"));
      forceLogout();
    }

    return Promise.reject(error);
  }
);

export default api;
