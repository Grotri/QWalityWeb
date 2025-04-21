export interface IErrors {
  login: string;
  password: string;
  name: string;
}

export const initialErrors: IErrors = {
  login: "",
  password: "",
  name: "",
};
