import { ISliderCard } from "../components/organisms/SliderCard/types";

export const rolesLimits: Record<string, number> = {
  "0": 1,
  "1": 2,
  "2": 4,
  "3": 4,
};

export const accountLimits: Record<string, number> = {
  "0": 1,
  "1": 4,
  "2": 8,
  "3": 20,
};

export const cameraLimits: Record<string, number> = {
  "0": 1,
  "1": 3,
  "2": 8,
  "3": 15,
};

export const cost: Record<string, string> = {
  "0": "0",
  "1": "2999",
  "2": "8990",
  "3": "17999",
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
    price: cost["0"],
  },
  {
    id: 1,
    title: "Стандарт",
    description: "Расширенный функционал",
    radioLabels: [
      `${rolesLimits["1"]} роли`,
      `${accountLimits["1"]} аккаунта`,
      `${cameraLimits["1"]} камеры`,
    ],
    price: cost["1"],
  },
  {
    id: 2,
    title: "Про",
    description: "Полноценный функционал",
    radioLabels: [
      `${rolesLimits["2"]} роли`,
      `${accountLimits["2"]} аккаунтов`,
      `${cameraLimits["2"]} камер`,
    ],
    price: cost["2"],
  },
  {
    id: 3,
    title: "Ультима",
    description: "Полноценный функционал",
    radioLabels: [
      `${rolesLimits["3"]} роли`,
      `${accountLimits["3"]} аккаунтов`,
      `${cameraLimits["3"]} камер`,
    ],
    price: cost["3"],
  },
];
