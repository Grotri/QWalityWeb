import "./i18n";
import { FC, useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import AppRouter from "./router";
import useAuthStore from "./store/useAuthStore";
import i18n from "./i18n";
import { getToken } from "./api/token";
import useAccountStore from "./store/useAccountStore";
import useCamerasStore from "./store/useCamerasStore";

const App: FC = () => {
  const { user, language, fetchUserInfo } = useAuthStore();
  const { fetchAccounts } = useAccountStore();
  const { fetchCameras } = useCamerasStore();

  useEffect(() => {
    const body = document.body;
    if (user.theme === "light") {
      body.classList.add("light-theme");
    } else {
      body.classList.remove("light-theme");
    }
  }, [user.theme]);

  useEffect(() => {
    document.body.classList.remove("font-small", "font-default", "font-large");
    document.body.classList.add(`font-${user.fontSize}`);
  }, [user.fontSize]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    if (user.id) {
      fetchCameras();
      if (user.role === "owner" || user.role === "admin") {
        fetchAccounts();
      }
    }
  }, [fetchAccounts, fetchCameras, user.id, user.role]);

  useEffect(() => {
    if (getToken()) {
      fetchUserInfo(true);
    }
  }, [fetchUserInfo]);

  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default App;
