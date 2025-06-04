import { cameraLimits } from "../constants/subscriptions";
import useAuthStore from "../store/useAuthStore";

export const useCameraLimits = () => {
  const { user } = useAuthStore();
  const currentSubscription = user.subscription;

  return currentSubscription ? cameraLimits[currentSubscription] || 0 : 0;
};
