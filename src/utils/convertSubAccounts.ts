import { IUser } from "../model/user";
import { UserNode } from "./convertUserInfo";

export default (data: UserNode[]): IUser[] =>
  data.map((user: UserNode) => ({
    id: user.id.toString(),
    inn: "",
    login: user.login,
    password: user.hashed_password || "",
    role: user.role,
    theme: user.color_theme,
    fontSize: user.font_size,
  }));
