import { IUser, TFontSize, TTheme } from "../model/user";

export interface UserNode {
  color_theme: TTheme;
  font_size: TFontSize;
  hashed_password?: string;
  id: number;
  login: string;
  role: string;
  tin?: string;
}

export default (data: UserNode): IUser => ({
  id: data.id.toString(),
  inn: data.tin || "",
  login: data.login,
  password: "",
  subscription: "3",
  role: data.role,
  theme: data.color_theme,
  fontSize: data.font_size,
});
