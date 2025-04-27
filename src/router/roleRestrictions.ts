import { ERoutes } from "./routes";

export const roleRestrictedRoutes: Record<string, string[]> = {
  ["user"]: [ERoutes.subscriptionEdit],
  ["moderator"]: [],
  ["administrator"]: [],
  ["owner"]: [],
};
