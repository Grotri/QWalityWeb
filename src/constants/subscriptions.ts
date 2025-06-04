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
    title: "demo",
    description: "basicFunctionality",
    radioLabels: ["1role", "1account", "1camera"],
    price: cost["0"],
  },
  {
    id: 1,
    title: "standard",
    description: "extendedFunctionality",
    radioLabels: ["2role", "4account", "3camera"],
    price: cost["1"],
  },
  {
    id: 2,
    title: "pro",
    description: "fullFunctionality",
    radioLabels: ["4role", "8account", "8camera"],
    price: cost["2"],
  },
  {
    id: 3,
    title: "ultima",
    description: "fullFunctionality",
    radioLabels: ["4role", "20account", "15camera"],
    price: cost["3"],
  },
];
