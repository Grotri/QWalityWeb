import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import { ERoutes } from "../../../router/routes";
import { roleRestrictedRoutes } from "../../../router/roleRestrictions";

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

  if (!user.id) {
    return <Navigate to={ERoutes.register} replace />;
  }

  if (!user.subscription && !allowUnsubscribed) {
    return <Navigate to={ERoutes.subscription} replace />;
  }

  if (user.subscription && location.pathname === ERoutes.subscription) {
    return <Navigate to={ERoutes.main} replace />;
  }

  if (restrictedRoutes.includes(location.pathname)) {
    return <Navigate to={ERoutes.accessDenied} replace />;
  }

  return element;
};

export default PrivateRoute;
