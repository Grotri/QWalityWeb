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
import Payment from "../components/pages/Payment";
import PaymentChange from "../components/pages/PaymentChange";

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
              <PageTemplate headerTitle="selectSubscriptionLevel">
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
                headerTitle="selectSubscriptionLevel"
                backPath={ERoutes.profile}
              >
                <SubscriptionChange />
              </PageTemplate>
            }
          />
        ),
      },
      {
        path: `${ERoutes.subscription}${ERoutes.payment}/:subscriptionId`,
        element: (
          <PrivateRoute
            allowUnsubscribed
            element={
              <PageTemplate
                backPath={ERoutes.subscription}
                headerTitle="subscriptionPayment"
                centralized
              >
                <Payment />
              </PageTemplate>
            }
          />
        ),
      },
      {
        path: `${ERoutes.subscriptionEdit}${ERoutes.payment}/:subscriptionId`,
        element: (
          <PrivateRoute
            element={
              <PageTemplate
                backPath={ERoutes.subscriptionEdit}
                headerTitle="subscriptionPayment"
                centralized
              >
                <PaymentChange />
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
                headerTitle="profile"
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
                headerTitle="adminPanel"
                backPath={ERoutes.profile}
                canScroll
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
                headerTitle="accountManagement"
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
              <PageTemplate headerTitle="help" hasMenu canScroll>
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
              <PageTemplate headerTitle="trash" hasMenu canScroll>
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
