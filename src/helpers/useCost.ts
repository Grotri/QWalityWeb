import { cost } from "../constants/subscriptions";

export const useCost = (currentSubscription: string) => {
  return currentSubscription ? +cost[currentSubscription] || 0 : 0;
};
