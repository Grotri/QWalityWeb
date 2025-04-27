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
    login: "xdd",
    password: "123456789",
    role: "administrator",
    subscription: "1",
  },
  {
    id: "2",
    login: "admin",
    password: "adminadmin",
    role: "moderator",
    subscription: "1",
  },
  {
    id: "3",
    login: "owner",
    password: "ownerowner",
    role: "owner",
    subscription: "1",
  },
];
