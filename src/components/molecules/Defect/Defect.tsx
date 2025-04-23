import { FC } from "react";
import { IDefectItem } from "./types";
import Button from "../../atoms/Button";
import styles from "./Defect.module.scss";
import { convertISODate } from "../../../helpers/formatDate";
import clsx from "clsx";

const Defect: FC<IDefectItem> = ({
  defect,
  textBtn,
  onPress,
  setSelectedDefect,
  pressableIcon = false,
}) => {
  const { name, date } = defect;

  const clickDefect = () => {
    if (setSelectedDefect) {
      setSelectedDefect(defect);
    }
  };

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.item}>
        {pressableIcon ? (
          <Button
            style={clsx(styles.image, styles.imageBtn)}
            onPress={clickDefect}
          >
            <span>.jpg</span>
          </Button>
        ) : (
          <div className={styles.image}>
            <span>.jpg</span>
          </div>
        )}
        <div className={styles.info}>
          <span className={styles.itemName}>{name}</span>
          <span className={styles.itemDate}>{convertISODate(date)}</span>
        </div>
      </div>
      <Button onPress={onPress} style={styles.btn}>
        {textBtn}
      </Button>
    </div>
  );
};

export default Defect;
