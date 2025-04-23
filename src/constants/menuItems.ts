import { FC } from "react";
import { IIcon } from "../assets/icons/types";
import { HelpIcon, HomeIcon, TrashBinIcon } from "../assets/icons";
import { ERoutes } from "../router/routes";

export interface IMenuItem {
  icon: FC<IIcon>;
  title: string;
  path: string;
}

export const menuItems: IMenuItem[] = [
  {
    icon: HomeIcon,
    title: "Главная",
    path: ERoutes.main,
  },
  {
    icon: TrashBinIcon,
    title: "Корзина",
    path: ERoutes.trashBin,
  },
  {
    icon: HelpIcon,
    title: "Помощь",
    path: ERoutes.support,
  },
];
