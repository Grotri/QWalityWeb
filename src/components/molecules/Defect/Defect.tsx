import { FC } from "react";
import { IDefectItem } from "./types";
import Button from "../../atoms/Button";
import styles from "./Defect.module.scss";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const Defect: FC<IDefectItem> = ({
  defect,
  textBtn,
  onPress,
  setSelectedDefect,
  pressableIcon = false,
  isInTrashBin = false,
}) => {
  const { t } = useTranslation();
  const { name, date, deletedAt } = defect;

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
          <span className={styles.itemName}>{t(name)}</span>
          <span className={styles.itemDate}>
            {isInTrashBin && deletedAt ? deletedAt : date}
          </span>
        </div>
      </div>
      {textBtn && (
        <Button onPress={onPress} style={styles.btn}>
          {textBtn}
        </Button>
      )}
    </div>
  );
};

export default Defect;
