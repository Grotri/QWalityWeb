import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ERoutes } from "./routes";
import PageTemplate from "../components/templates/PageTemplate";
import Registration from "../components/pages/Registration";
import Login from "../components/pages/Login";
import ForgotPassword from "../components/pages/ForgotPassword";
import PrivateRoute from "../components/atoms/PrivateRoute";
import Main from "../components/pages/Main";
import PublicRoute from "../components/atoms/PublicRoute";
import Subscription from "../components/pages/Subscription";

const router = createBrowserRouter([
  {
    path: "/",
    // element
    // TODO: добавить элемент ошибки
    children: [
      {
        index: true,
        element: (
          <PrivateRoute
            element={
              <PageTemplate>
                <Main />
              </PageTemplate>
            }
          />
        ),
      },
      {
        path: ERoutes.register,
        element: (
          <PublicRoute
            element={
              <PageTemplate>
                <Registration />
              </PageTemplate>
            }
          />
        ),
      },
      {
        path: ERoutes.login,
        element: (
          <PublicRoute
            element={
              <PageTemplate backPath={ERoutes.register}>
                <Login />
              </PageTemplate>
            }
          />
        ),
      },
      {
        path: ERoutes.passwordRecovery,
        element: (
          <PublicRoute
            element={
              <PageTemplate backPath={ERoutes.login}>
                <ForgotPassword />
              </PageTemplate>
            }
          />
        ),
      },
      {
        path: ERoutes.subscription,
        element: (
          <PrivateRoute
            allowUnsubscribed
            element={
              <PageTemplate>
                <Subscription />
              </PageTemplate>
            }
          />
        ),
      },
      // {
      //   path: '*',
      //   element: (
      //     <PageHeaderProvider
      //       header="Страница не найдена"
      //       backRoute={ERoutes.dashboard}
      //       backTooltip="На Главную"
      //     >
      //       <PrivateRoute element={<NotFound />} />
      //     </PageHeaderProvider>
      //   ),
      // },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
