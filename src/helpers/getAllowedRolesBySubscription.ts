import { rolesLimits } from "../constants/subscriptions";

export const getAllowedRolesBySubscription = (sliderId: string): string[] => {
  const roleLimit = rolesLimits[sliderId];
  return roleLimit === 1
    ? ["owner"]
    : roleLimit === 2
    ? ["user", "owner"]
    : ["user", "moderator", "admin", "owner"];
};
