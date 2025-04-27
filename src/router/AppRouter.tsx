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
import SubscriptionChange from "../components/pages/SubscriptionChange";
import Profile from "../components/pages/Profile";
import Admin from "../components/pages/Admin";
import AccountManagement from "../components/pages/AccountManagement";
import FAQ from "../components/pages/FAQ";
import TrashBin from "../components/pages/TrashBin";
import { useState } from "react";
import AccessDenied from "../components/pages/AccessDenied";
import NotFound from "../components/pages/NotFound";
import ErrorPage from "../components/pages/ErrorPage";

const MainPageWithSearch = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <PageTemplate
      canScroll
      hasMenu
      isMainPage
      search={search}
      setSearch={setSearch}
    >
      <Main search={search} />
    </PageTemplate>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: (
      <PrivateRoute
        element={
          <PageTemplate>
            <ErrorPage />
          </PageTemplate>
        }
      />
    ),
    children: [
      {
        index: true,
        element: <PrivateRoute element={<MainPageWithSearch />} />,
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
              <PageTemplate backPath={ERoutes.register} centralized>
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
              <PageTemplate backPath={ERoutes.login} centralized>
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
              <PageTemplate headerTitle="Выберите уровень подписки">
                <Subscription />
              </PageTemplate>
            }
          />
        ),
      },
      {
        path: ERoutes.subscriptionEdit,
        element: (
          <PrivateRoute
            element={
              <PageTemplate
                headerTitle="Выберите уровень подписки"
                backPath={ERoutes.profile}
              >
                <SubscriptionChange />
              </PageTemplate>
            }
          />
        ),
      },
      {
        path: ERoutes.profile,
        element: (
          <PrivateRoute
            element={
              <PageTemplate
                headerTitle="Профиль"
                backPath={ERoutes.main}
                centralized
              >
                <Profile />
              </PageTemplate>
            }
          />
        ),
      },
      {
        path: ERoutes.admin,
        element: (
          <PrivateRoute
            element={
              <PageTemplate
                headerTitle="Админ панель"
                backPath={ERoutes.profile}
                centralized
              >
                <Admin />
              </PageTemplate>
            }
          />
        ),
      },
      {
        path: ERoutes.accountManagement,
        element: (
          <PrivateRoute
            element={
              <PageTemplate
                headerTitle="Управление аккаунтами"
                backPath={ERoutes.admin}
                canScroll
              >
                <AccountManagement />
              </PageTemplate>
            }
          />
        ),
      },
      {
        path: ERoutes.support,
        element: (
          <PrivateRoute
            element={
              <PageTemplate headerTitle="Помощь" hasMenu canScroll>
                <FAQ />
              </PageTemplate>
            }
          />
        ),
      },
      {
        path: ERoutes.trashBin,
        element: (
          <PrivateRoute
            element={
              <PageTemplate headerTitle="Корзина" hasMenu canScroll>
                <TrashBin />
              </PageTemplate>
            }
          />
        ),
      },
      {
        path: ERoutes.accessDenied,
        element: (
          <PrivateRoute
            element={
              <PageTemplate>
                <AccessDenied />
              </PageTemplate>
            }
          />
        ),
      },
      {
        path: "*",
        element: (
          <PrivateRoute
            element={
              <PageTemplate>
                <NotFound />
              </PageTemplate>
            }
          />
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
