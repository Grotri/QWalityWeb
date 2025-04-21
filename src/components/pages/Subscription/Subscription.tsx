import { FC } from "react";
import Button from "../../atoms/Button";
import useAuthStore from "../../../store/useAuthStore";

const Subscription: FC = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      <Button color="blue" onPress={logout}>
        Subscription
      </Button>
    </div>
  );
};

export default Subscription;
