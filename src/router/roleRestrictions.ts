import { ERoutes } from "./routes";

export const roleRestrictedRoutes: Record<string, string[]> = {
  ["user"]: [
    ERoutes.subscriptionEdit,
    `${ERoutes.subscriptionEdit}${ERoutes.payment}/:subscriptionId`,
    ERoutes.admin,
    ERoutes.accountManagement,
  ],
  ["moderator"]: [
    ERoutes.subscriptionEdit,
    `${ERoutes.subscriptionEdit}${ERoutes.payment}/:subscriptionId`,
    ERoutes.admin,
    ERoutes.accountManagement,
  ],
  ["administrator"]: [
    ERoutes.subscriptionEdit,
    `${ERoutes.subscriptionEdit}${ERoutes.payment}/:subscriptionId`,
  ],
  ["owner"]: [],
};
