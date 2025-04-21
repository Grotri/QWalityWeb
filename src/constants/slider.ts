import { ISliderCard } from "../components/organisms/SliderCard/types";

export type ISlider = ISliderCard;

export const slidersInfo: ISlider[] = [
  {
    id: 0,
    title: "Демо",
    description: "Базовый функционал",
    radioLabels: ["1 роль", "1 аккаунт", "1 камера"],
    price: "0",
  },
  {
    id: 1,
    title: "Старт",
    description: "Расширенный функционал",
    radioLabels: ["3 роли", "8 аккаунтов", "3 камеры"],
    price: "15000",
  },
  {
    id: 2,
    title: "Премиум",
    description: "Полноценный функционал",
    radioLabels: ["4 роли", "16 аккаунтов", "8 камер"],
    price: "30000",
  },
  {
    id: 3,
    title: "Премиум +",
    description: "Полноценный функционал",
    radioLabels: ["4 роли", "32 аккаунта", "15 камер"],
    price: "50000",
  },
];
