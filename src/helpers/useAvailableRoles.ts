import { IDropdownData } from "../components/atoms/Dropdown/types";
import { ERoles } from "../constants/roles";
import useAuthStore from "../store/useAuthStore";

const rolesOrder = ["user", "moderator", "administrator", "owner"];

export const useAvailableRoles = () => {
  const { user } = useAuthStore();

  const currentRole = user.role;

  if (!currentRole) {
    return [];
  }

  const availableRoles: IDropdownData[] = rolesOrder
    .filter(
      (roleKey) => rolesOrder.indexOf(roleKey) < rolesOrder.indexOf(currentRole)
    )
    .map((key) => ({
      value: key,
      label: ERoles[key as keyof typeof ERoles],
    }));

  return availableRoles;
};
