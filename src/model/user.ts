export interface IUser {
  id: string;
  inn?: string;
  login: string;
  password: string;
  subscription?: string;
  role: string;
}

export const initialUser: IUser = {
  id: "",
  inn: "",
  login: "",
  password: "",
  role: "owner",
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
