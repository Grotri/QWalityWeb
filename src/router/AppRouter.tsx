import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ERoutes } from "./routes";
import PageTemplate from "../components/templates/PageTemplate";
import Registration from "../components/pages/Registration";
import Login from "../components/pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: (
          <PageTemplate>
            <Registration />
          </PageTemplate>
        ),
      },
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
          <PageTemplate>
            <Login />
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
