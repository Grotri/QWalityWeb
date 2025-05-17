export type TTheme = "light" | "dark";
export type TFontSize = "small" | "default" | "large";
export type TLanguage = "ru" | "eng";

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
  fontSize: "default",
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
