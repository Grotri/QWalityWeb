const TOKEN = "TOKEN";
const REFRESH = "REFRESH";

// Token
export const setToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};

// Refresh token
export const setRefresh = (token: string) => {
  localStorage.setItem(REFRESH, token);
};

export const getRefresh = (): string | null => {
  return localStorage.getItem(REFRESH);
};

export const removeRefresh = () => {
  localStorage.removeItem(REFRESH);
};
