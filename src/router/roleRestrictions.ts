import { ERoutes } from "./routes";

export const roleRestrictedRoutes: Record<string, string[]> = {
  ["user"]: [
    ERoutes.subscriptionEdit,
    ERoutes.admin,
    ERoutes.accountManagement,
  ],
  ["moderator"]: [
    ERoutes.subscriptionEdit,
    ERoutes.admin,
    ERoutes.accountManagement,
  ],
  ["administrator"]: [ERoutes.subscriptionEdit],
  ["owner"]: [],
};
