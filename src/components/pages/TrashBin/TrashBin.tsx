import { useEffect, useState } from "react";
import useCamerasStore from "../../../store/useCamerasStore";
import styles from "./TrashBin.module.scss";
import { IDefect } from "../../../model/defect";
import SupportContent from "../../atoms/SupportContent";
import Modal from "../../atoms/Modal";
import { CrossIcon, TrashBinIcon } from "../../../assets/icons";
import DatePicker from "../../atoms/DatePicker";
import Button from "../../atoms/Button";
import BottomFixIcon from "../../molecules/BottomFixIcon";
import Defect from "../../molecules/Defect";
import useAuthStore from "../../../store/useAuthStore";
import Camera from "../../molecules/Camera";
import { ICamera } from "../../../model/camera";
import { onError } from "../../../helpers/toast";
import { useCameraLimits } from "../../../helpers/useCameraLimits";
import { useTranslation } from "react-i18next";
import { parseCustomDate } from "../../../helpers/formatDate";

const TrashBin = () => {
  const { t } = useTranslation();
  const {
    cameras,
    recoverDefect,
    recoverCamera,
    clearTrashBin,
    clearTrashBinByDates,
    loading,
    error,
  } = useCamerasStore();
  const { user } = useAuthStore();
  const cameraLimits = useCameraLimits();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const deletedDefects = cameras.flatMap((camera) =>
    camera.defects
      .filter((d) => !!d.deletedAt)
      .map((defect) => ({
        type: "defect",
        data: defect,
        cameraId: camera.id,
      }))
  );

  const deletedCameras = cameras
    .filter((camera) => !!camera.deletedAt)
    .map((camera) => ({ type: "camera", data: camera, cameraId: camera.id }));

  const trashItems = [...deletedCameras, ...deletedDefects].sort((a, b) => {
    const timeA = a.data.deletedAt ? parseCustomDate(a.data.deletedAt) : 0;
    const timeB = b.data.deletedAt ? parseCustomDate(b.data.deletedAt) : 0;
    return timeB - timeA;
  });

  useEffect(() => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  }, [cameras]);

  useEffect(() => {
    if (!isModalOpen) {
      setStartDate(null);
      setEndDate(null);
    }
  }, [isModalOpen]);

  return (
    <>
      {(!user.id || loading) && <SupportContent isLoading={loading} />}
      {!loading && error && <SupportContent type="error" message={error} />}
      {user.id && !loading && !error && !trashItems.length && (
        <SupportContent message={t("trashEmpty")} />
      )}
      {!loading && !error && trashItems.length > 0 && (
        <div className={styles.wrapper}>
          {trashItems.map((item) => {
            if (item.type === "defect") {
              return (
                <Defect
                  key={item.data.id}
                  defect={item.data as IDefect}
                  textBtn={user.role !== "user" ? t("restore") : undefined}
                  onPress={() => recoverDefect(item.cameraId, item.data.id)}
                  isInTrashBin
                />
              );
            } else {
              return (
                <Camera
                  key={item.data.id}
                  camera={item.data as ICamera}
                  onPress={() => {
                    if (
                      cameras.filter((c) => !c.deletedAt).length < cameraLimits
                    ) {
                      recoverCamera(item.cameraId);
                    } else {
                      onError(t("camerasLimitReached"));
                    }
                  }}
                />
              );
            }
          })}
          <Modal isVisible={isModalOpen} setIsVisible={setIsModalOpen}>
            <div className={styles.modal}>
              <div className={styles.crossIconWrapper}>
                <CrossIcon
                  style={styles.crossIcon}
                  onClick={() => setIsModalOpen(false)}
                />
                <span className={styles.modalTitle}>{t("deleteHistory")}</span>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.row}>
                  <DatePicker
                    date={startDate}
                    setDate={(date) => setStartDate(date)}
                    height="30px"
                  />
                  <div className={styles.dash} />
                  <DatePicker
                    date={endDate}
                    setDate={(date) => setEndDate(date)}
                    height="30px"
                  />
                </div>
                <div className={styles.row}>
                  <Button
                    color="red"
                    style={styles.btnModal}
                    onPress={clearTrashBin}
                  >
                    {t("deleteAll")}
                  </Button>
                  <div className={styles.empty} />
                  <Button
                    style={styles.btnModal}
                    color="management"
                    onPress={() => clearTrashBinByDates(startDate, endDate)}
                  >
                    {t("delete")}
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
          {trashItems.length > 0 && user.role !== "user" && (
            <BottomFixIcon
              icon={<TrashBinIcon width={38} />}
              text={t("clearCart")}
              onPress={() => setIsModalOpen(true)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default TrashBin;
