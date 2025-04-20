import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ERoutes } from "./routes";
import PageTemplate from "../components/templates/PageTemplate";
import Registration from "../components/pages/Registration";
import Login from "../components/pages/Login";
import ForgotPassword from "../components/pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    // element
    // TODO: добавить элемент ошибки
    children: [
      // {
      //   index: true,
      //   element: (
      //     <PageHeaderProvider header="Главная">
      //       <PrivateRoute element={<Dashboard />} />
      //     </PageHeaderProvider>
      //   ),
      // },
      {
        path: ERoutes.register,
        element: (
          <PageTemplate>
            <Registration />
          </PageTemplate>
        ),
      },
      {
        path: ERoutes.login,
        element: (
          <PageTemplate backPath={ERoutes.register}>
            <Login />
          </PageTemplate>
        ),
      },
      {
        path: ERoutes.passwordRecovery,
        element: (
          <PageTemplate backPath={ERoutes.login}>
            <ForgotPassword />
          </PageTemplate>
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
