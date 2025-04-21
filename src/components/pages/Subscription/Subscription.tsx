import { FC } from "react";
import useAuthStore from "../../../store/useAuthStore";
import styles from "./Subscription.module.scss";
import { slidersInfo } from "../../../constants/slider";
import { ISliderCard } from "../../organisms/SliderCard/types";
import SliderCard from "../../organisms/SliderCard";

const Subscription: FC = () => {
  const { setUserField } = useAuthStore();

  return (
    <div className={styles.wrapper}>
      {slidersInfo.map((slider: ISliderCard) => (
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
