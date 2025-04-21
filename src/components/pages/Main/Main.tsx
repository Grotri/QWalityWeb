import { FC } from "react";
import Button from "../../atoms/Button";
import useAuthStore from "../../../store/useAuthStore";

const Main: FC = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      <Button color="blue" onPress={logout}>
        Main
      </Button>
    </div>
  );
};

export default Main;
