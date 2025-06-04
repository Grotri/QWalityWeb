import { FC, FormEvent, useEffect, useState } from "react";
import { ICameraSettingsModal } from "./types";
import useCamerasStore from "../../../store/useCamerasStore";
import { ICamera, initialCamera } from "../../../model/camera";
import { CrossIcon } from "../../../assets/icons";
import Input from "../../atoms/Input/Input";
import Radio from "../../atoms/Radio";
import Button from "../../atoms/Button";
import styles from "./CameraSettingsModal.module.scss";
import Modal from "../../atoms/Modal";
import { useTranslation } from "react-i18next";

const CameraSettingsModal: FC<ICameraSettingsModal> = ({
  camera,
  setCamera,
  isHistoryModalOpen,
  setIsHistoryModalOpen,
}) => {
  const { t } = useTranslation();
  const {
    errors,
    setErrorsField,
    editCamera,
    refreshErrors,
    deleteCamera,
    deleteHistory,
  } = useCamerasStore();
  const [cameraInfo, setCameraInfo] = useState<ICamera>({ ...initialCamera });
  const { title, link, online } = cameraInfo;

  const handleEditCamera = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editCamera(cameraInfo, setCamera);
    setIsHistoryModalOpen(null);
  };

  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };

  const openCameraModal = () => {
    setIsHistoryModalOpen(false);
  };

  const closeModal = () => {
    setIsHistoryModalOpen(null);
    setCamera(null);
  };

  useEffect(() => {
    if (camera) {
      refreshErrors();
      setCameraInfo({ ...camera });
    }
  }, [camera]);

  return (
    <Modal isVisible={!!camera} onClose={closeModal}>
      <div className={styles.modals}>
        <form className={styles.modal} onSubmit={handleEditCamera}>
          <div className={styles.crossIconWrapper}>
            <CrossIcon style={styles.crossIcon} onClick={closeModal} />
            <Input
              value={title}
              onChangeText={(title) => {
                setCameraInfo({ ...cameraInfo, title });
                setErrorsField("name", "");
              }}
              maxLength={15}
              errorText={errors.name}
              className={styles.customTitleStyles}
              inputClassName={styles.customTitleInputStyles}
              inputFieldClassName={styles.customTitleInputFieldStyles}
            />
          </div>
          <div className={styles.content}>
            <Input
              label={t("cameraLink")}
              value={link}
              onChangeText={(link) => {
                setCameraInfo({ ...cameraInfo, link });
                setErrorsField("link", "");
              }}
              errorText={errors.link}
              inputClassName={styles.customTitleInputStyles}
              inputFieldClassName={styles.customInputFieldStyles}
              labelClassName={styles.customLabelStyles}
            />
            <div className={styles.stateWrapper}>
              <span className={styles.stateText}>{t("status")}</span>
              <div className={styles.stateRadios}>
                <Radio
                  label={t("online")}
                  isChecked={online}
                  setIsChecked={() =>
                    setCameraInfo({ ...cameraInfo, online: true })
                  }
                  radioWrapperStyle={styles.radioWrapperStyle}
                  labelStyle={styles.radioLabelStyle}
                />
                <Radio
                  label={t("offline")}
                  isChecked={!online}
                  setIsChecked={() =>
                    setCameraInfo({ ...cameraInfo, online: false })
                  }
                  radioWrapperStyle={styles.radioWrapperStyle}
                  labelStyle={styles.radioLabelStyle}
                />
              </div>
            </div>
            <div className={styles.btns}>
              <div className={styles.flexBtns}>
                <Button
                  style={styles.btn}
                  color="red"
                  onPress={openHistoryModal}
                >
                  {t("deleteHistory")}
                </Button>
                <Button
                  style={styles.btn}
                  color="red"
                  onPress={openCameraModal}
                >
                  {t("deleteCamera")}
                </Button>
              </div>
              <Button style={styles.fullBtn} color="modal" type="submit">
                {t("save")}
              </Button>
            </div>
          </div>
        </form>
        {isHistoryModalOpen !== null && (
          <div className={styles.modal}>
            <span className={styles.smallModalTitle}>
              {t("confirmDelete")}{" "}
              {isHistoryModalOpen ? t("history") : t("cameraTake")}?
            </span>
            <div className={styles.smallModalBtns}>
              <Button
                style={styles.btnBolderText}
                color="red"
                onPress={() => {
                  if (!isHistoryModalOpen) {
                    deleteCamera(cameraInfo);
                  } else {
                    deleteHistory(cameraInfo.id);
                  }
                  closeModal();
                }}
              >
                {t("yes")}
              </Button>
              <Button
                style={styles.btnBolderText}
                color="modal"
                onPress={() => setIsHistoryModalOpen(null)}
              >
                {t("no")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CameraSettingsModal;
