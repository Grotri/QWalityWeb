import { create } from "zustand";
import { IStoreStatus } from "../model/misc";
import { EErrors } from "../constants/errors";
import { emailPattern, innPattern } from "../constants/patterns";
import { v4 as uuidv4 } from "uuid";
import { onError, onSuccess } from "../helpers/toast";
import {
  IErrors,
  initialErrors,
  initialUser,
  IUser,
  TLanguage,
} from "../model/user";
import {
  confirmResetPassword,
  loginRequest,
  registerRequest,
  resetPassword,
  sendCode,
} from "../api/auth";
import { getToken, setRefresh, setToken } from "../api/token";
import { forceLogout } from "../api/forceLogout";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { ERoutes } from "../router/routes";
import i18n from "../i18n";

interface IUseAuthStore extends IStoreStatus {
  user: IUser;
  errors: IErrors;
  language: TLanguage;
  setLanguage: (lang: TLanguage) => void;
  setUserField: (field: keyof IUser, value: string) => void;
  setUser: (newUser: IUser) => void;
  clearUser: () => void;
  setErrorsField: (field: keyof IErrors, error: string) => void;
  clearErrors: () => void;
  validate: (code: string) => boolean;
  login: (
    email: string,
    password: string,
    addAccount: (account: IUser) => void
  ) => Promise<void>;
  register: (
    code: string,
    addAccount: (account: IUser) => void
  ) => Promise<void>;
  logout: (clearAccounts: () => void) => void;
  sendRegisterCode: (email: string) => void;
  sendResetCode: (email: string) => void;
  restorePassword: (
    email: string,
    code: string,
    password: string,
    navigate: NavigateFunction
  ) => void;
}

const useAuthStore = create<IUseAuthStore>((set, get) => {
  const token = getToken();
  const storedLanguage = sessionStorage.getItem("language") as TLanguage | null;
  const storedUser = sessionStorage.getItem("user");

  return {
    loading: false,
    error: null,
    errors: { ...initialErrors },
    user: storedUser && token ? JSON.parse(storedUser) : { ...initialUser },
    language: storedLanguage || "ru",

    setUserField: (field, value) =>
      set((state) => {
        const updatedUser = { ...state.user, [field]: value };
        if (field === "subscription") {
          sessionStorage.setItem("user", JSON.stringify(updatedUser));
        }
        return { user: updatedUser };
      }),

    setUser: (newUser) => {
      sessionStorage.setItem("user", JSON.stringify(newUser));
      set({ user: { ...newUser } });
    },

    clearUser: () => {
      sessionStorage.removeItem("user");
      set({ user: { ...initialUser } });
    },

    setErrorsField: (field, error) =>
      set((state) => ({ errors: { ...state.errors, [field]: error } })),

    clearErrors: () => set({ errors: { ...initialErrors } }),

    validate: (code) => {
      const { user } = get();
      const { inn, login, password } = user;

      const newErrors: IErrors = {
        inn:
          !inn || !inn.trim()
            ? i18n.t(EErrors.required)
            : !innPattern.test(inn.trim())
            ? i18n.t(EErrors.inn)
            : "",
        login: !login.trim()
          ? i18n.t(EErrors.required)
          : !emailPattern.test(login.trim())
          ? i18n.t(EErrors.email)
          : "",
        code: !code.trim() ? i18n.t(EErrors.required) : "",
        password: !password.trim()
          ? i18n.t(EErrors.required)
          : password.trim().length < 8
          ? i18n.t(EErrors.password)
          : "",
      };

      set({ errors: newErrors });
      return Object.values(newErrors).every((error) => !error);
    },

    register: async (code, addAccount) => {
      const { user, validate } = get();

      if (!validate(code)) {
        onError(i18n.t(EErrors.fields));
        return;
      }

      set({ loading: true, error: null });

      try {
        const newUser: IUser = {
          id: uuidv4(),
          login: user.login.trim(),
          password: user.password.trim(),
          inn: user.inn?.trim(),
          role: user.role,
          theme: "dark",
          fontSize: "default",
        };

        const response = await registerRequest({
          email: newUser.login,
          password: newUser.password,
          tin: newUser.inn || "",
          type: "legal person",
          code: code.trim(),
        });

        if (response.status === 201) {
          const loginData = await loginRequest(newUser.login, newUser.password);
          const { access_token, refresh_token } = loginData.data;

          setToken(access_token);
          setRefresh(refresh_token);
          sessionStorage.setItem("user", JSON.stringify(newUser));
          set({ user: newUser });
          addAccount(newUser);
          onSuccess(i18n.t("registrationSuccess"), 2000);
        } else {
          onError(i18n.t("registrationFailed"));
        }
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            onError(`${i18n.t("error")}: ` + error.response.data.error);
          } else {
            onError(i18n.t("registrationError"));
          }
        } else {
          onError(i18n.t("unknownError"));
        }
        set({ error });
      } finally {
        set({ loading: false });
      }
    },

    login: async (email, password, addAccount) => {
      set({ loading: true, error: null });

      try {
        const newUser: IUser = {
          id: uuidv4(),
          login: email,
          password: password,
          inn: "1111111111",
          role: "owner",
          theme: "dark",
          fontSize: "default",
          subscription: "2",
        };

        const data = await loginRequest(email, password);
        const { access_token, refresh_token } = data.data;

        setToken(access_token);
        setRefresh(refresh_token);

        sessionStorage.setItem("user", JSON.stringify(newUser));
        set({ user: newUser });
        addAccount(newUser);
        onSuccess(i18n.t("loginSuccess"), 2000);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            onError(`${i18n.t("error")}: ` + error.response.data.error);
          } else {
            onError(i18n.t("loginError"));
          }
        } else {
          onError(i18n.t("unknownError"));
        }
        set({ error });
      } finally {
        set({ loading: false });
      }
    },

    sendRegisterCode: async (email) => {
      if (email) {
        try {
          set({ loading: true, error: null });
          await sendCode({ email });
          onSuccess(i18n.t("codeSentToEmail"));
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              onError(`${i18n.t("error")}: ` + error.response.data.error);
            } else {
              onError(i18n.t("codeSendError"));
            }
          } else {
            onError(i18n.t("unknownError"));
          }
          set({ error });
        } finally {
          set({ loading: false });
        }
      } else {
        onError(i18n.t("enterEmailFirst"));
      }
    },

    sendResetCode: async (email) => {
      if (email) {
        try {
          set({ loading: true, error: null });
          await resetPassword({ email });
          onSuccess(i18n.t("codeSentToEmail"));
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              onError(`${i18n.t("error")}: ` + error.response.data.error);
            } else {
              onError(i18n.t("codeSendError"));
            }
          } else {
            onError(i18n.t("unknownError"));
          }
          set({ error });
        } finally {
          set({ loading: false });
        }
      } else {
        onError(i18n.t("enterEmailFirst"));
      }
    },

    restorePassword: async (email, code, password, navigate) => {
      try {
        set({ loading: true, error: null });
        await confirmResetPassword({ email, code, new_password: password });
        navigate(ERoutes.login);
        onSuccess(i18n.t("passwordChanged"), 5000);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            onError(`${i18n.t("error")}: ` + error.response.data.error);
          } else {
            onError(i18n.t("passwordRecoveryError"));
          }
        } else {
          onError(i18n.t("unknownError"));
        }
        set({ error });
      } finally {
        set({ loading: false });
      }
    },

    setLanguage: (lang) => {
      i18n.changeLanguage(lang);
      sessionStorage.setItem("language", lang);
      set({ language: lang });
    },

    logout: (clearAccounts) => {
      forceLogout();
      clearAccounts();
    },
  };
});

export default useAuthStore;
