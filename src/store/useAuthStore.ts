import { create } from "zustand";
import { IStoreStatus } from "../model/misc";
import { EErrors } from "../constants/errors";
import { emailPattern, innPattern } from "../constants/patterns";
import { v4 as uuidv4 } from "uuid";
import { onError, onSuccess } from "../helpers/toast";
import { IErrors, initialErrors, initialUser, IUser } from "../model/user";
import { initialAccounts } from "../constants/accounts";

interface IUseAuthStore extends IStoreStatus {
  user: IUser;
  setUserField: (field: keyof IUser, value: string) => void;
  setUser: (newUser: IUser) => void;
  clearUser: () => void;
  errors: IErrors;
  setErrorsField: (field: keyof IErrors, error: string) => void;
  clearErrors: () => void;
  register: (code: string) => void;
  validate: (code: string) => boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const useAuthStore = create<IUseAuthStore>((set, get) => {
  const storedUser = localStorage.getItem("user");

  return {
    loading: false,
    error: null,
    errors: { ...initialErrors },
    user: storedUser ? JSON.parse(storedUser) : { ...initialUser },

    clearUser: () => set({ user: { ...initialUser } }),

    setUser: (newUser) => {
      localStorage.setItem("user", JSON.stringify(newUser));
      set({ user: { ...newUser } });
    },

    setUserField: (field, value) =>
      set((state) => {
        const updatedUser = { ...state.user, [field]: value };
        if (field === "subscription") {
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        return { user: updatedUser };
      }),

    logout: () => {
      localStorage.removeItem("user");
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

    register: (code) => {
      const { user, validate } = get();

      if (validate(code)) {
        try {
          const newUser: IUser = {
            id: uuidv4(),
            login: user.login.trim(),
            password: user.password.trim(),
            inn: user.inn?.trim(),
            role: user.role,
          };

          localStorage.setItem("user", JSON.stringify(newUser));
          set({
            loading: true,
            user: newUser,
          });
          onSuccess("Вы успешно зарегистрировались!", 2000);
        } catch (error) {
          console.log(error);
          onError("Произошла ошибка при регистрации");
        } finally {
          set({ loading: false });
        }
      } else {
        onError(EErrors.fields);
      }
    },

    login: (email, password) => {
      try {
        const existingAccount = initialAccounts.find(
          (acc) => acc.login === email && acc.password === password
        );
        if (existingAccount) {
          localStorage.setItem("user", JSON.stringify(existingAccount));
          set({
            loading: true,
            user: existingAccount,
          });
          onSuccess("Вы успешно вошли в аккаунт!", 2000);
        } else {
          onError("Такого аккаунта не существует");
        }
      } catch (error) {
        console.log(error);
        onError("Произошла ошибка при входе в аккаунт");
      } finally {
        set({ loading: false });
      }
    },
  };
});

export default useAuthStore;
