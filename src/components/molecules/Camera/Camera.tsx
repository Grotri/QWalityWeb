import { FC } from "react";
import { ICameraItem } from "./types";
import Button from "../../atoms/Button";
import styles from "./Camera.module.scss";
import { CameraIcon } from "../../../assets/icons";
import { useTranslation } from "react-i18next";
import { formatISOToCustomDate } from "../../../helpers/formatDate";

const Camera: FC<ICameraItem> = ({ camera, onPress }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.item}>
        <div className={styles.image}>
          <CameraIcon width={32} />
        </div>
        <div className={styles.info}>
          <span className={styles.itemName}>{camera.title}</span>
          {camera.deletedAt && (
            <span className={styles.itemDate}>
              {formatISOToCustomDate(camera.deletedAt)}
            </span>
          )}
        </div>
      </div>
      <Button onPress={onPress} style={styles.btn}>
        {t("restore")}
      </Button>
    </div>
  );
};

export default Camera;
