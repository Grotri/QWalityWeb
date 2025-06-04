export type TTheme = "light" | "dark";
export type TFontSize = "small" | "medium" | "large";
export type TLanguage = "ru" | "eng" | "fr";

export interface IUser {
  id: string;
  inn?: string;
  login: string;
  password: string;
  subscription?: string;
  role: string;
  theme: TTheme;
  fontSize: TFontSize;
}

export const initialUser: IUser = {
  id: "",
  inn: "",
  login: "",
  password: "",
  role: "owner",
  theme: "dark",
  fontSize: "medium",
  subscription: "3",
};

export interface IErrors {
  inn: string;
  login: string;
  code: string;
  password: string;
}

export const initialErrors: IErrors = {
  inn: "",
  login: "",
  code: "",
  password: "",
};
