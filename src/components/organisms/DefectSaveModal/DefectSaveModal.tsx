import { FC, useEffect, useState } from "react";
import { IDefectSaveModal } from "./types";
import { IDefect, initialDefect } from "../../../model/defect";
import Modal from "../../atoms/Modal";
import styles from "./DefectSaveModal.module.scss";
import Button from "../../atoms/Button";
import { onWarning } from "../../../helpers/toast";
import { useTranslation } from "react-i18next";
import useCamerasStore from "../../../store/useCamerasStore";
import { CircularProgress } from "@mui/material";

const DefectSaveModal: FC<IDefectSaveModal> = ({ onClose, defect }) => {
  const { t } = useTranslation();
  const { downloadDefectImage, photoLoading } = useCamerasStore();
  const [defectInfo, setDefectInfo] = useState<IDefect>({ ...initialDefect });
  const { id, name, date, photo } = defectInfo;

  const handleDownload = async () => {
    if (!photo) {
      onWarning(t("noPhoto"));
      onClose();
      return;
    }

    downloadDefectImage(photo, id, onClose);
  };

  useEffect(() => {
    if (defect) {
      setDefectInfo({ ...defect });
    }
  }, [defect]);

  return (
    <Modal isVisible={!!defect} onClose={onClose}>
      <div className={styles.modal}>
        {photoLoading && (
          <CircularProgress
            size="50px"
            color="inherit"
            sx={{ margin: "12px 0" }}
          />
        )}
        {!photoLoading && (
          <>
            <span className={styles.modalTitle}>{t("wantDownloadImage")}</span>
            <span className={styles.name}>
              {t("defect")} ({t(name)}) {date}
            </span>
            <div className={styles.btns}>
              <Button color="modal" style={styles.btn} onPress={handleDownload}>
                {t("yes")}
              </Button>
              <Button color="modal" style={styles.btn} onPress={onClose}>
                {t("no")}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default DefectSaveModal;
