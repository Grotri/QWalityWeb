import useAuthStore from "../store/useAuthStore";
import { useRoleLimits } from "./useRoleLimits";

export const useAvailableRoles = () => {
  const { user } = useAuthStore();
  const roleLimits = useRoleLimits();

  const currentRole = user.role;
  const rolesOrder =
    roleLimits === 1
      ? ["owner"]
      : roleLimits === 2
      ? ["user", "owner"]
      : ["user", "moderator", "administrator", "owner"];

  if (!currentRole) {
    return [];
  }

  const availableRoles: string[] = rolesOrder.filter(
    (roleKey) => rolesOrder.indexOf(roleKey) < rolesOrder.indexOf(currentRole)
  );

  return availableRoles;
};
