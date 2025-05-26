import { FC, useEffect, useState } from "react";
import { IDefectSaveModal } from "./types";
import { IDefect, initialDefect } from "../../../model/defect";
import Modal from "../../atoms/Modal";
import styles from "./DefectSaveModal.module.scss";
import Button from "../../atoms/Button";
import { onSuccess } from "../../../helpers/toast";
import { useTranslation } from "react-i18next";

const DefectSaveModal: FC<IDefectSaveModal> = ({ onClose, defect }) => {
  const { t } = useTranslation();
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
        <span className={styles.modalTitle}>{t("wantDownloadImage")}</span>
        <span className={styles.name}>
          {t("defect")} ({t(name)}) {date}
        </span>
        <div className={styles.btns}>
          <Button
            color="modal"
            style={styles.btn}
            onPress={() => {
              onClose();
              onSuccess(t("imageDownloaded"));
            }}
          >
            {t("yes")}
          </Button>
          <Button color="modal" style={styles.btn} onPress={onClose}>
            {t("no")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DefectSaveModal;
