import { create } from "zustand";
import { IStoreStatus } from "../model/misc";
import { EErrors } from "../constants/errors";
import { emailPattern, innPattern } from "../constants/patterns";
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
import { setRefresh, setToken } from "../api/token";
import { forceLogout } from "../api/forceLogout";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { ERoutes } from "../router/routes";
import i18n from "../i18n";
import { getUserInfo } from "../api/user";
import convertUserInfo from "../utils/convertUserInfo";
import {
  confirmDeleteAccount,
  editClient,
  sendDeleteAccountCode,
  sendUpdateClientCode,
} from "../api/client";

interface IUseAuthStore extends IStoreStatus {
  user: IUser;
  errors: IErrors;
  language: TLanguage;
  fetchUserInfo: (isWithTestSubs?: boolean) => Promise<void>;
  setLanguage: (lang: TLanguage) => void;
  setUserField: (field: keyof IUser, value: string) => void;
  setUser: (newUser: IUser) => void;
  clearUser: () => void;
  setErrorsField: (field: keyof IErrors, error: string) => void;
  clearErrors: () => void;
  validate: (code: string) => boolean;
  login: (login: string, password: string) => Promise<void>;
  register: (code: string) => Promise<void>;
  logout: (clearAccounts: () => void) => void;
  sendRegisterCode: (email: string) => void;
  sendResetCode: (email: string) => void;
  restorePassword: (
    email: string,
    code: string,
    password: string,
    navigate: NavigateFunction
  ) => void;
  sendDeleteCode: () => void;
  deleteAccount: (code: string, onClose: () => void) => void;
  sendEditCode: () => void;
  changeClient: (newAccount: IUser, code: string, onClose: () => void) => void;
}

const useAuthStore = create<IUseAuthStore>((set, get) => {
  const storedLanguage = localStorage.getItem("language") as TLanguage | null;

  return {
    loading: false,
    error: null,
    errors: { ...initialErrors },
    user: { ...initialUser },
    language: storedLanguage || "ru",

    fetchUserInfo: async (isWithTestSubs) => {
      try {
        set({ loading: true, error: null });
        const res = await getUserInfo();
        set({
          user: convertUserInfo(res.data, isWithTestSubs),
          loading: false,
          error: false,
        });
      } catch (error) {
        console.log(error);
        forceLogout();
        set({ error, loading: false });
      }
    },

    setUserField: (field, value) =>
      set((state) => {
        const updatedUser = { ...state.user, [field]: value };
        // if (field === "subscription") {
        //   localStorage.setItem("user", JSON.stringify(updatedUser));
        // }
        return { user: updatedUser };
      }),

    setUser: (newUser) => {
      set({ user: { ...newUser } });
    },

    clearUser: () => {
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

    register: async (code) => {
      const { user, validate, fetchUserInfo } = get();

      if (!validate(code)) {
        onError(i18n.t(EErrors.fields));
        return;
      }

      try {
        const response = await registerRequest({
          email: user.login.trim(),
          password: user.password.trim(),
          tin: user.inn?.trim() || "",
          type: "legal person",
          code: code.trim(),
        });

        if (response.status === 201) {
          const loginData = await loginRequest(
            user.login.trim(),
            user.password.trim()
          );
          const { access_token, refresh_token } = loginData.data;

          setToken(access_token);
          setRefresh(refresh_token);

          await fetchUserInfo(false);
          onSuccess(i18n.t("registrationSuccess"));
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
      }
    },

    login: async (login, password) => {
      try {
        const { fetchUserInfo } = get();
        const data = await loginRequest(login, password);
        const { access_token, refresh_token } = data.data;

        setToken(access_token);
        setRefresh(refresh_token);

        await fetchUserInfo(true);
        onSuccess(i18n.t("loginSuccess"));
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
      }
    },

    sendRegisterCode: async (email) => {
      if (email) {
        try {
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
        }
      } else {
        onError(i18n.t("enterEmailFirst"));
      }
    },

    sendResetCode: async (email) => {
      if (email) {
        try {
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
        }
      } else {
        onError(i18n.t("enterEmailFirst"));
      }
    },

    restorePassword: async (email, code, password, navigate) => {
      try {
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
      }
    },

    sendDeleteCode: async () => {
      try {
        await sendDeleteAccountCode();
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
      }
    },

    deleteAccount: async (code, onClose) => {
      try {
        await confirmDeleteAccount(code);
        onClose();
        onSuccess(i18n.t("accountDeleted"));
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
            onError(i18n.t("accountDeleteError"));
          }
        } else {
          onError(i18n.t("unknownError"));
        }
      }
    },

    sendEditCode: async () => {
      try {
        await sendUpdateClientCode();
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
      }
    },

    changeClient: async (newAccount, code, onClose) => {
      const { setUser } = get();
      try {
        await editClient({
          email: newAccount.login,
          tin: newAccount.inn || "",
          code,
        });
        setUser(newAccount);
        onClose();
        onSuccess(i18n.t("profileDataChanged"));
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
            onError(i18n.t("failedToChangeData"));
          }
        } else {
          onError(i18n.t("unknownError"));
        }
      }
    },

    setLanguage: (lang) => {
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
      set({ language: lang });
    },

    logout: (clearAccounts) => {
      forceLogout();
      clearAccounts();
    },
  };
});

export default useAuthStore;
