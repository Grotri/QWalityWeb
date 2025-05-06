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

const TrashBin = () => {
  const {
    cameras,
    recoverDefect,
    recoverCamera,
    clearTrashBin,
    clearTrashBinByDates,
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
    const dateA = new Date(a.data.deletedAt ?? 0).getTime();
    const dateB = new Date(b.data.deletedAt ?? 0).getTime();
    return dateB - dateA;
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
    <div className={styles.wrapper}>
      {trashItems.length > 0 ? (
        trashItems.map((item) => {
          if (item.type === "defect") {
            return (
              <Defect
                key={item.data.id}
                defect={item.data as IDefect}
                textBtn={user.role !== "user" ? "Восстановить" : undefined}
                onPress={() => recoverDefect(item.cameraId, item.data.id)}
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
                    onError("Достигнут лимит камер");
                  }
                }}
              />
            );
          }
        })
      ) : (
        <SupportContent message="Корзина пуста" />
      )}
      <Modal isVisible={isModalOpen} setIsVisible={setIsModalOpen}>
        <div className={styles.modal}>
          <div className={styles.crossIconWrapper}>
            <CrossIcon
              style={styles.crossIcon}
              onClick={() => setIsModalOpen(false)}
            />
            <span className={styles.modalTitle}>Удалить историю</span>
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
                Удалить всё
              </Button>
              <div className={styles.empty} />
              <Button
                style={styles.btnModal}
                color="management"
                onPress={() => clearTrashBinByDates(startDate, endDate)}
              >
                Удалить
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      {deletedDefects.length > 0 && user.role !== "user" && (
        <BottomFixIcon
          icon={<TrashBinIcon width={38} />}
          text="Очистить корзину"
          onPress={() => setIsModalOpen(true)}
        />
      )}
    </div>
  );
};

export default TrashBin;
