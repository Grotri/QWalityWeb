import { FC } from "react";
import { ISliderCard } from "./types";
import styles from "./SliderCard.module.scss";
import Button from "../../atoms/Button";
import Radio from "../../atoms/Radio";
import clsx from "clsx";

const SliderCard: FC<ISliderCard> = ({
  id,
  currentId,
  title,
  description,
  radioLabels,
  price,
  onPress,
}) => (
  <div className={styles.card}>
    <div className={styles.mainInfo}>
      <span className={styles.title}>{title}</span>
      <div className={styles.line} />
      <span className={styles.description}>{description}</span>
      <div className={styles.radios}>
        {radioLabels.map((label: string, index: number) => (
          <Radio label={label} isChecked key={index} style={styles.radio} />
        ))}
      </div>
    </div>
    <div className={styles.subInfo}>
      <span className={styles.price}>{price} руб. в месяц</span>
      {currentId !== undefined && currentId === id ? (
        <span className={clsx(styles.btn, styles.choosenBtn)}>Выбрано</span>
      ) : (
        <Button color="welcomeBrightBlue" style={styles.btn} onPress={onPress}>
          Выбрать
        </Button>
      )}
    </div>
  </div>
);

export default SliderCard;
