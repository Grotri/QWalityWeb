import { FC } from "react";
import useAuthStore from "../../../store/useAuthStore";
import styles from "./Subscription.module.scss";
import SliderCard from "../../organisms/SliderCard";
import { ISubscription, subscriptions } from "../../../constants/subscriptions";

const Subscription: FC = () => {
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
          onPress={() => setUserField("subscription", slider.id.toString())}
        />
      ))}
    </div>
  );
};

export default Subscription;
