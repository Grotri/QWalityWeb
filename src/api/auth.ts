import api from "./index";

interface ILoginRequestParams {
  login: string;
  password: string;
  tin: string;
  type: "legal person";
  code: string;
}

interface IResetPassword {
  email: string;
}

interface IConfirmResetPassword {
  email: string;
  code: string;
  new_password: string;
}

export const loginRequest = async (login: string, password: string) => {
  return await api.post("/auth/login", { login, password });
};

export const registerRequest = async (payload: ILoginRequestParams) => {
  return await api.post("/clients", payload);
};

export const sendCode = async (payload: IResetPassword) => {
  return await api.post("/auth/send-registration-code", payload);
};

export const resetPassword = async (payload: IResetPassword) => {
  return await api.post("/auth/reset-password-request", payload);
};

export const confirmResetPassword = async (payload: IConfirmResetPassword) => {
  return await api.post("/auth/reset-password-confirm", payload);
};
