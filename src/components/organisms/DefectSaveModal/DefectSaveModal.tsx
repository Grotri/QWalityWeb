import { FC, useEffect, useState } from "react";
import { IDefectSaveModal } from "./types";
import { IDefect, initialDefect } from "../../../model/defect";
import Modal from "../../atoms/Modal";
import styles from "./DefectSaveModal.module.scss";
import { convertISODate } from "../../../helpers/formatDate";
import Button from "../../atoms/Button";
import { onSuccess } from "../../../helpers/toast";

const DefectSaveModal: FC<IDefectSaveModal> = ({ onClose, defect }) => {
  const [defectInfo, setDefectInfo] = useState<IDefect>({ ...initialDefect });
  const { name, date } = defectInfo;

  useEffect(() => {
    if (defect) {
      setDefectInfo({ ...defect });
    }
  }, [defect]);

  return (
    <Modal isVisible={!!defect} onClose={onClose}>
      <div className={styles.modal}>
        <span className={styles.modalTitle}>Хотите скачать изображение?</span>
        <span className={styles.name}>
          Дефект ({name}) {convertISODate(date)}
        </span>
        <div className={styles.btns}>
          <Button
            color="modal"
            style={styles.btn}
            onPress={() => {
              onClose();
              onSuccess("Изображение скачано");
            }}
          >
            Да
          </Button>
          <Button color="modal" style={styles.btn} onPress={onClose}>
            Нет
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DefectSaveModal;
