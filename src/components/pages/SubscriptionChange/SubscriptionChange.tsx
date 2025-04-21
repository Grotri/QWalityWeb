import styles from "./SubscriptionChange.module.scss";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import { slidersInfo } from "../../../constants/slider";
import { ISliderCard } from "../../organisms/SliderCard/types";
import SliderCard from "../../organisms/SliderCard";
import { ERoutes } from "../../../router/routes";
import { onSuccess } from "../../../helpers/toast";
import Button from "../../atoms/Button";

const SubscriptionChange = () => {
  const navigate = useNavigate();
  const { user, setUserField, logout } = useAuthStore();

  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {slidersInfo.map((slider: ISliderCard) => (
          <SliderCard
            key={slider.id}
            id={slider.id}
            currentId={user.subscription ? +user.subscription : undefined}
            title={slider.title}
            description={slider.description}
            radioLabels={slider.radioLabels}
            price={slider.price}
            onPress={() => {
              setUserField("subscription", slider.id.toString());
              // TODO: изменить путь на профиль
              navigate(ERoutes.main);
              onSuccess("Вы успешно поменяли уровень подписки", 2000);
            }}
          />
        ))}
      </div>
      <Button color="welcomeBlue" style={styles.cancelBtn} onPress={logout}>
        Отменить подписку
      </Button>
    </div>
  );
};

export default SubscriptionChange;
