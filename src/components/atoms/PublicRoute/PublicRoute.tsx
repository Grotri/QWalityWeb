import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import { ERoutes } from "../../../router/routes";

const PublicRoute = ({ element }: { element: ReactNode }) => {
  const { user } = useAuthStore();

  return user.id ? <Navigate to={ERoutes.main} replace /> : element;
};

export default PublicRoute;
