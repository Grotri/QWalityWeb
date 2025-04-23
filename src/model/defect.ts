export interface IDefect {
  id: string;
  name: string;
  date: string;
  isDeleted: boolean;
}

export const initialDefect: IDefect = {
  id: "",
  name: "",
  date: "",
  isDeleted: false,
};
