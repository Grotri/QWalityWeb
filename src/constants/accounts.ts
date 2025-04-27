import { IUser } from "../model/user";

export const initialAccounts: IUser[] = [
  {
    id: "0",
    login: "qwerty12345",
    password: "qwerty12345",
    role: "user",
    subscription: "1",
  },
  {
    id: "1",
    login: "administrator",
    password: "administrator",
    role: "administrator",
    subscription: "1",
  },
  {
    id: "2",
    login: "moderator_000",
    password: "moderator_000",
    role: "moderator",
    subscription: "1",
  },
  {
    id: "3",
    login: "owner@mail.ru",
    password: "ownerowner",
    role: "owner",
    subscription: "1",
    inn: "1234567890",
  },
];
