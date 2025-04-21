export interface IErrors {
  email: string;
  code: string;
  password: string;
}

export const initialErrors: IErrors = {
  email: "",
  code: "",
  password: "",
};
