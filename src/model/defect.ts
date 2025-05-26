export interface IDefect {
  id: string;
  name: string;
  date: string;
  deletedAt?: string;
  photo?: string;
}

export const initialDefect: IDefect = {
  id: "",
  name: "",
  date: "",
};
