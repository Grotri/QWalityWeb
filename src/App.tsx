import { FC, useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import AppRouter from "./router";
import useAuthStore from "./store/useAuthStore";

const App: FC = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    const body = document.body;
    if (user.theme === "light") {
      body.classList.add("light-theme");
    } else {
      body.classList.remove("light-theme");
    }
  }, [user.theme]);

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
