import { ReactNode } from "react";
import { matchPath, Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import { ERoutes } from "../../../router/routes";
import { roleRestrictedRoutes } from "../../../router/roleRestrictions";
import { getToken } from "../../../api/token";

const PrivateRoute = ({
  element,
  allowUnsubscribed = false,
}: {
  element: ReactNode;
  allowUnsubscribed?: boolean;
}) => {
  const { user } = useAuthStore();
  const location = useLocation();
  const restrictedRoutes = roleRestrictedRoutes[user.role] || [];
  const isRestricted = restrictedRoutes.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  if (!getToken()) {
    return <Navigate to={ERoutes.register} replace />;
  }

  if (!user.subscription && !allowUnsubscribed) {
    return <Navigate to={ERoutes.subscription} replace />;
  }

  if (
    user.subscription &&
    (location.pathname === ERoutes.subscription ||
      location.pathname.startsWith(
        `${ERoutes.subscription}${ERoutes.payment}/`
      ))
  ) {
    return <Navigate to={ERoutes.main} replace />;
  }

  if (isRestricted) {
    return <Navigate to={ERoutes.accessDenied} replace />;
  }

  return element;
};

export default PrivateRoute;
