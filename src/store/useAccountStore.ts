import { create } from "zustand";
import { IStoreStatus } from "../model/misc";
import { EErrors } from "../constants/errors";
import { onError, onSuccess, onWarning } from "../helpers/toast";
import { IUser } from "../model/user";
import { ERoles } from "../constants/roles";
import i18n from "../i18n";
import {
  createSubAccount,
  deleteSubAccount,
  getSubAccounts,
} from "../api/user";
import convertSubAccounts from "../utils/convertSubAccounts";

export interface IErrors {
  login: string;
  password: string;
}

interface IUseAccountStore extends IStoreStatus {
  accounts: IUser[];
  errors: IErrors[];
  fetchAccounts: () => Promise<void>;
  registerAccount: (login: string, password: string, role: string) => void;
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

  fetchAccounts: async () => {
    try {
      set({ loading: true, error: null });
      const res = await getSubAccounts();
      set({
        accounts: convertSubAccounts(res.data),
        loading: false,
        error: false,
      });
    } catch (error) {
      console.log(error);
      set({ error, loading: false });
    }
  },

  registerAccount: async (login: string, password: string, role: string) => {
    const currRole = i18n.t(ERoles[role as keyof typeof ERoles]);

    try {
      set({ loading: true, error: null });
      const request = await createSubAccount({
        login,
        password,
        role,
      });
      const newAccount: IUser = {
        id: request.data.id.toString(),
        login,
        password: "",
        role,
        theme: "dark",
        fontSize: "medium",
      };
      set((state) => ({
        accounts: [...state.accounts, newAccount],
        errors: [...state.errors, { login: "", password: "" }],
        loading: false,
        error: false,
      }));
      onSuccess(`${currRole} ${i18n.t("created")}`);
    } catch (error) {
      onError(i18n.t("failedToCreateAccount"));
      console.error(error);
      set({ error, loading: false });
    }
  },

  validate: (newAccount, index) => {
    const { errors } = get();
    const { login, password } = newAccount;

    const newError: IErrors = {
      login: !login.trim() ? i18n.t(EErrors.required) : "",
      password: !password.trim()
        ? i18n.t(EErrors.required)
        : password.trim().length < 8
        ? i18n.t(EErrors.password)
        : "",
    };

    const newErrors = [...errors];
    newErrors[index] = { ...newError };
    set({ errors: newErrors });
    return Object.values(newError).every((error) => !error);
  },

  changeAccount: async (index, newAccount) => {
    const { accounts, validate } = get();
    const oldAccount = accounts[index];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { inn, subscription, ...oldAccountData } = oldAccount;
    if (JSON.stringify(oldAccountData) !== JSON.stringify(newAccount)) {
      if (validate(newAccount, index)) {
        try {
          set({ loading: true, error: null });
          // await editAccount(newAccount.id, {
          //   login: newAccount.login,
          //   password: newAccount.password,
          //   role: newAccount.role,
          // });
          set((state) => ({
            accounts: state.accounts.map((account, i) =>
              i === index ? newAccount : account
            ),
            loading: false,
            error: false,
          }));
          onSuccess(i18n.t("accountDataChanged"));
        } catch (error) {
          onError(i18n.t("failedToChangeData"));
          console.error(error);
          set({ error, loading: false });
        }
      } else {
        onError(i18n.t("fillFormCorrectlyFirst"));
      }
    } else {
      onWarning(i18n.t(EErrors.noChanges));
    }
  },

  changeError: (index, field, value) =>
    set((state) => {
      const newErrors = [...state.errors];
      newErrors[index] = { ...newErrors[index], [field]: value };
      return { errors: newErrors };
    }),

  deleteAccount: async (index) => {
    const { accounts, errors } = get();
    const userToDelete = accounts[index];
    const role = i18n.t(ERoles[userToDelete.role as keyof typeof ERoles]);

    try {
      set({ loading: true, error: null });
      await deleteSubAccount(userToDelete.id);
      set({
        accounts: accounts.filter((account) => account.id !== userToDelete.id),
        errors: errors.filter((_, i) => i !== index),
        loading: false,
        error: false,
      });
      onSuccess(`${role} ${userToDelete.login} ${i18n.t("deleted")}`);
    } catch (error) {
      onError(i18n.t("failedToDeleteAccount"));
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
