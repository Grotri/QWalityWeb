import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ERoutes } from "./routes";
import PageTemplate from "../components/templates/PageTemplate";
import Registration from "../components/pages/Registration";

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
      // {
      //   path: ERoutes.test,
      //   element: (
      //     <PageHeaderProvider header="Тестовая страница">
      //       <PrivateRoute element={<TestPage />} />
      //     </PageHeaderProvider>
      //   ),
      // },
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
