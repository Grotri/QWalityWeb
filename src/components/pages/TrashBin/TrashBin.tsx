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

const TrashBin = () => {
  const { cameras, recoverDefect, clearTrashBin, clearTrashBinByDates } =
    useCamerasStore();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const deletedDefects = cameras.flatMap((camera) =>
    camera.defects.filter((d) => d.isDeleted)
  );

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
      {deletedDefects.length > 0 ? (
        cameras.map((camera) =>
          camera.defects
            .filter((d) => d.isDeleted)
            .map((defect: IDefect) => (
              <Defect
                key={defect.id}
                defect={defect}
                textBtn={user.role !== "user" ? "Восстановить" : undefined}
                onPress={() => recoverDefect(camera.id, defect.id)}
              />
            ))
        )
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
