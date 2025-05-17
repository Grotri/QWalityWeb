import { FC } from "react";
import { ISliderCard } from "./types";
import styles from "./SliderCard.module.scss";
import Button from "../../atoms/Button";
import Radio from "../../atoms/Radio";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const SliderCard: FC<ISliderCard> = ({
  id,
  currentId,
  title,
  description,
  radioLabels,
  price,
  onPress,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <div className={styles.mainInfo}>
        <span className={styles.title}>{t(title)}</span>
        <div className={styles.line} />
        <span className={styles.description}>{t(description)}</span>
        <div className={styles.radios}>
          {radioLabels.map((label: string, index: number) => (
            <Radio
              label={t(label)}
              isChecked
              key={index}
              style={styles.radio}
            />
          ))}
        </div>
      </div>
      <div className={styles.subInfo}>
        <span className={styles.price}>
          {price} {t("rubPerMonth")}
        </span>
        {currentId !== undefined && currentId === id ? (
          <span className={clsx(styles.btn, styles.choosenBtn)}>
            {t("selected")}
          </span>
        ) : (
          <Button
            color="welcomeBrightBlue"
            style={styles.btn}
            onPress={onPress}
          >
            {t("choose")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SliderCard;
