import { accountLimits } from "../constants/subscriptions";
import useAuthStore from "../store/useAuthStore";

export const useAccountLimits = () => {
  const { user } = useAuthStore();
  const currentSubscription = user.subscription;

  return currentSubscription ? accountLimits[currentSubscription] || 0 : 0;
};
