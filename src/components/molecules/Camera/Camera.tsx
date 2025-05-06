import { FC } from "react";
import { ICameraItem } from "./types";
import Button from "../../atoms/Button";
import styles from "./Camera.module.scss";
import { CameraIcon } from "../../../assets/icons";

const Camera: FC<ICameraItem> = ({ camera, onPress }) => (
  <div className={styles.itemWrapper}>
    <div className={styles.item}>
      <div className={styles.image}>
        <CameraIcon width={32} />
      </div>
      <span className={styles.itemName}>{camera.title}</span>
    </div>
    <Button onPress={onPress} style={styles.btn}>
      Восстановить
    </Button>
  </div>
);

export default Camera;
