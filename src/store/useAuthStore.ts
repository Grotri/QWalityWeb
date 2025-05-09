import { create } from "zustand";
import { IStoreStatus } from "../model/misc";
import { EErrors } from "../constants/errors";
import { emailPattern, innPattern } from "../constants/patterns";
import { v4 as uuidv4 } from "uuid";
import { onError, onSuccess } from "../helpers/toast";
import { IErrors, initialErrors, initialUser, IUser } from "../model/user";
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

interface IUseAuthStore extends IStoreStatus {
  user: IUser;
  errors: IErrors;
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
  const storedUser = sessionStorage.getItem("user");

  return {
    loading: false,
    error: null,
    errors: { ...initialErrors },
    user: storedUser && token ? JSON.parse(storedUser) : { ...initialUser },

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
            ? EErrors.required
            : !innPattern.test(inn.trim())
            ? EErrors.inn
            : "",
        login: !login.trim()
          ? EErrors.required
          : !emailPattern.test(login.trim())
          ? EErrors.email
          : "",
        code: !code.trim() ? EErrors.required : "",
        password: !password.trim()
          ? EErrors.required
          : password.trim().length < 8
          ? EErrors.password
          : "",
      };

      set({ errors: newErrors });
      return Object.values(newErrors).every((error) => !error);
    },

    register: async (code, addAccount) => {
      const { user, validate } = get();

      if (!validate(code)) {
        onError(EErrors.fields);
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
          onSuccess("Вы успешно зарегистрировались!", 2000);
        } else {
          onError("Регистрация не удалась");
        }
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            onError("Ошибка: " + error.response.data.error);
          } else {
            onError("Произошла ошибка при регистрации");
          }
        } else {
          onError("Неизвестная ошибка");
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
        onSuccess("Вы успешно вошли в аккаунт!", 2000);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            onError("Ошибка: " + error.response.data.error);
          } else {
            onError("Произошла ошибка при входе в аккаунт");
          }
        } else {
          onError("Неизвестная ошибка");
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
          onSuccess("Код выслан на почту");
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              onError("Ошибка: " + error.response.data.error);
            } else {
              onError("Произошла ошибка при отправке кода");
            }
          } else {
            onError("Неизвестная ошибка");
          }
          set({ error });
        } finally {
          set({ loading: false });
        }
      } else {
        onError("Сначала введите почту");
      }
    },

    sendResetCode: async (email) => {
      if (email) {
        try {
          set({ loading: true, error: null });
          await resetPassword({ email });
          onSuccess("Код выслан на почту");
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              onError("Ошибка: " + error.response.data.error);
            } else {
              onError("Произошла ошибка при отправке кода");
            }
          } else {
            onError("Неизвестная ошибка");
          }
          set({ error });
        } finally {
          set({ loading: false });
        }
      } else {
        onError("Сначала введите почту");
      }
    },

    restorePassword: async (email, code, password, navigate) => {
      try {
        set({ loading: true, error: null });
        await confirmResetPassword({ email, code, new_password: password });
        navigate(ERoutes.login);
        onSuccess("Пароль сменен, зайдите с новыми данными", 5000);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            onError("Ошибка: " + error.response.data.error);
          } else {
            onError("Произошла ошибка при восстановлении пароля");
          }
        } else {
          onError("Неизвестная ошибка");
        }
        set({ error });
      } finally {
        set({ loading: false });
      }
    },

    logout: (clearAccounts) => {
      forceLogout();
      clearAccounts();
    },
  };
});

export default useAuthStore;
