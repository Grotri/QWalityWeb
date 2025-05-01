import { create } from "zustand";
import { IStoreStatus } from "../model/misc";
import { EErrors } from "../constants/errors";
import { onError, onSuccess, onWarning } from "../helpers/toast";
import { IUser } from "../model/user";
import { ERoles } from "../constants/roles";

export interface IErrors {
  login: string;
  password: string;
}

interface IUseAccountStore extends IStoreStatus {
  accounts: IUser[];
  errors: IErrors[];
  addAccount: (account: IUser) => void;
  registerAccount: (account: IUser) => void;
  changeAccount: (index: number, newAccount: IUser) => void;
  changeError: (index: number, field: keyof IErrors, value: string) => void;
  refreshErrors: () => void;
  validate: (newAccount: IUser, index: number) => boolean;
  deleteAccount: (index: number) => void;
  clearAccounts: () => void;
}

const useAccountStore = create<IUseAccountStore>((set, get) => ({
  loading: false,
  error: null,
  accounts: [],
  errors: [],

  addAccount: (account) => {
    try {
      set({ loading: true, error: null });
      set((state) => ({
        accounts: [...state.accounts, account],
        errors: [...state.errors, { login: "", password: "" }],
        loading: false,
        error: false,
      }));
    } catch (error) {
      onError("Не удалось добавить аккаунт");
      console.error(error);
      set({ error, loading: false });
    }
  },

  registerAccount: (account) => {
    const currRole = ERoles[account.role as keyof typeof ERoles];

    try {
      set({ loading: true, error: null });
      set((state) => ({
        accounts: [...state.accounts, account],
        errors: [...state.errors, { login: "", password: "" }],
        loading: false,
        error: false,
      }));
      onSuccess(`${currRole} создан`);
    } catch (error) {
      onError("Не удалось создать аккаунт");
      console.error(error);
      set({ error, loading: false });
    }
  },

  validate: (newAccount, index) => {
    const { errors } = get();
    const { login, password } = newAccount;

    const newError: IErrors = {
      login: !login.trim() ? EErrors.required : "",
      password: !password.trim()
        ? EErrors.required
        : password.trim().length < 8
        ? EErrors.password
        : "",
    };

    const newErrors = [...errors];
    newErrors[index] = { ...newError };
    set({ errors: newErrors });
    return Object.values(newError).every((error) => !error);
  },

  changeAccount: (index, newAccount) => {
    const { accounts, validate } = get();
    const oldAccount = accounts[index];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { inn, subscription, ...oldAccountData } = oldAccount;
    if (JSON.stringify(oldAccountData) !== JSON.stringify(newAccount)) {
      if (validate(newAccount, index)) {
        try {
          set({ loading: true, error: null });
          set((state) => ({
            accounts: state.accounts.map((account, i) =>
              i === index ? newAccount : account
            ),
            loading: false,
            error: false,
          }));
          onSuccess(`Данные аккаунта изменены`);
        } catch (error) {
          onError("Не удалось изменить данные");
          console.error(error);
          set({ error, loading: false });
        }
      } else {
        onError("Сначала корректно заполните поля формы");
      }
    } else {
      onWarning(EErrors.noChanges);
    }
  },

  changeError: (index, field, value) =>
    set((state) => {
      const newErrors = [...state.errors];
      newErrors[index] = { ...newErrors[index], [field]: value };
      return { errors: newErrors };
    }),

  deleteAccount: (index) => {
    const { accounts, errors } = get();
    const userToDelete = accounts[index];
    const role = ERoles[userToDelete.role as keyof typeof ERoles];

    try {
      set({ loading: true, error: null });
      set({
        accounts: accounts.filter((account) => account.id !== userToDelete.id),
        errors: errors.filter((_, i) => i !== index),
        loading: false,
        error: false,
      });
      onSuccess(`${role} ${userToDelete.login} удален`);
    } catch (error) {
      onError("Не удалось удалить аккаунт");
      console.error(error);
      set({ error, loading: false });
    }
  },

  refreshErrors: () => {
    const { accounts } = get();
    set({ errors: accounts.map(() => ({ login: "", password: "" })) });
  },

  clearAccounts: () => {
    set({ accounts: [] });
  },
}));

export default useAccountStore;
