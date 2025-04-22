import { FC } from "react";
import Button from "../../atoms/Button";
import useAuthStore from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../../../router/routes";

const Main: FC = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div>
      <Button color="blue" onPress={logout}>
        Main
      </Button>
      <Button color="blue" onPress={() => navigate(ERoutes.subscriptionEdit)}>
        Subs
      </Button>
      <Button color="blue" onPress={() => navigate(ERoutes.profile)}>
        profile
      </Button>
      <Button color="blue" onPress={() => navigate(ERoutes.support)}>
        FAQ
      </Button>
    </div>
  );
};

export default Main;
