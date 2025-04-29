import { ISliderCard } from "../components/organisms/SliderCard/types";

export const rolesLimits: Record<string, number> = {
  "0": 1,
  "1": 3,
  "2": 4,
  "3": 4,
};

export const accountLimits: Record<string, number> = {
  "0": 1,
  "1": 8,
  "2": 16,
  "3": 32,
};

export const cameraLimits: Record<string, number> = {
  "0": 1,
  "1": 3,
  "2": 8,
  "3": 15,
};

export type ISubscription = ISliderCard;

export const subscriptions: ISubscription[] = [
  {
    id: 0,
    title: "Демо",
    description: "Базовый функционал",
    radioLabels: [
      `${rolesLimits["0"]} роль`,
      `${accountLimits["0"]} аккаунт`,
      `${cameraLimits["0"]} камера`,
    ],
    price: "0",
  },
  {
    id: 1,
    title: "Старт",
    description: "Расширенный функционал",
    radioLabels: [
      `${rolesLimits["1"]} роли`,
      `${accountLimits["1"]} аккаунтов`,
      `${cameraLimits["1"]} камеры`,
    ],
    price: "15000",
  },
  {
    id: 2,
    title: "Премиум",
    description: "Полноценный функционал",
    radioLabels: [
      `${rolesLimits["2"]} роли`,
      `${accountLimits["2"]} аккаунтов`,
      `${cameraLimits["2"]} камер`,
    ],
    price: "30000",
  },
  {
    id: 3,
    title: "Премиум +",
    description: "Полноценный функционал",
    radioLabels: [
      `${rolesLimits["3"]} роли`,
      `${accountLimits["3"]} аккаунта`,
      `${cameraLimits["3"]} камер`,
    ],
    price: "50000",
  },
];
