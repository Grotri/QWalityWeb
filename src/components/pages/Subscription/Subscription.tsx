import { FC } from "react";
import styles from "./Subscription.module.scss";
import SliderCard from "../../organisms/SliderCard";
import { ISubscription, subscriptions } from "../../../constants/subscriptions";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../../../router/routes";
import useAuthStore from "../../../store/useAuthStore";

const Subscription: FC = () => {
  const navigate = useNavigate();
  const { setUserField } = useAuthStore();

  return (
    <div className={styles.wrapper}>
      {subscriptions.map((slider: ISubscription) => (
        <SliderCard
          key={slider.id}
          id={slider.id}
          title={slider.title}
          description={slider.description}
          radioLabels={slider.radioLabels}
          price={slider.price}
          onPress={() => {
            if (slider.id !== 0) {
              navigate(
                `${ERoutes.subscription}${
                  ERoutes.payment
                }/${slider.id.toString()}`
              );
            } else {
              setUserField("subscription", "0");
            }
          }}
        />
      ))}
    </div>
  );
};

export default Subscription;
