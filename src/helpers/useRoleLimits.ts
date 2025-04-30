import { rolesLimits } from "../constants/subscriptions";
import useAuthStore from "../store/useAuthStore";

export const useRoleLimits = () => {
  const { user } = useAuthStore();
  const currentSubscription = user.subscription;

  return currentSubscription ? rolesLimits[currentSubscription] || 0 : 0;
};
