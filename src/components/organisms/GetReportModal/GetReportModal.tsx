import { FC, useEffect, useState } from "react";
import { IGetReportModal } from "./types";
import Modal from "../../atoms/Modal";
import { CrossIcon } from "../../../assets/icons";
import styles from "./GetReportModal.module.scss";
import Dropdown from "../../atoms/Dropdown";
import { formats } from "../../../constants/formats";
import Button from "../../atoms/Button";
import { onSuccess } from "../../../helpers/toast";
import Radio from "../../atoms/Radio";
import DatePicker from "../../atoms/DatePicker";

const GetReportModal: FC<IGetReportModal> = ({ isOpen, setIsOpen }) => {
  const [isSubModalOpened, setIsSubModalOpened] = useState<boolean>(false);
  const [type, setType] = useState<"report" | "log">("report");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [format, setFormat] = useState<string>("0");

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setType("report");
      setStartDate(null);
      setEndDate(null);
      setFormat("0");
      setIsSubModalOpened(false);
    }
  }, [isOpen]);

  return (
    <Modal isVisible={isOpen} setIsVisible={setIsOpen}>
      <div className={styles.modals}>
        <div className={styles.modal}>
          <div className={styles.crossIconWrapper}>
            <CrossIcon style={styles.crossIcon} onClick={closeModal} />
            <span className={styles.modalTitle}>Получить отчет</span>
          </div>
          <div className={styles.modalContent}>
            <div className={styles.row}>
              <Radio
                label="Отчет"
                isChecked={type === "report"}
                setIsChecked={() => {
                  setType("report");
                }}
              />
              <div className={styles.empty} />
              <Radio
                label="Лог"
                isChecked={type === "log"}
                setIsChecked={() => {
                  setType("log");
                }}
              />
            </div>
            <div className={styles.row}>
              <DatePicker
                date={startDate}
                setDate={(date) => setStartDate(date)}
              />
              <div className={styles.dash} />
              <DatePicker date={endDate} setDate={(date) => setEndDate(date)} />
            </div>
            <div className={styles.row}>
              <Dropdown
                data={formats.map((format) => ({
                  value: format.id,
                  label: format.name,
                }))}
                value={format}
                setValue={setFormat}
                controlHeight="27px"
                wrapperStyle={styles.flex}
                borderRadius="8px"
                controlBackgroundColor="var(--dateAndListSelectsPopupBg)"
              />
              <div className={styles.empty} />
              <div className={styles.flex} />
            </div>
            <div className={styles.row}>
              <Button
                color="red"
                style={styles.btnModal}
                onPress={() => setIsSubModalOpened(true)}
              >
                Удалить лог
              </Button>
              <div className={styles.empty} />
              <Button
                color="management"
                style={styles.btnModal}
                onPress={() => {
                  closeModal();
                  onSuccess("Лог скачан");
                }}
              >
                Скачать
              </Button>
            </div>
          </div>
        </div>
        {isSubModalOpened && (
          <div className={styles.modal}>
            <span className={styles.subModalTitle}>
              Вы точно хотите удалить лог?
            </span>
            <div className={styles.modalContent}>
              <div className={styles.row}>
                <Button
                  color="red"
                  style={styles.btnModalBold}
                  onPress={() => {
                    closeModal();
                    onSuccess("Лог удален");
                  }}
                >
                  Да
                </Button>
                <div className={styles.empty} />
                <Button
                  color="management"
                  style={styles.btnModalBold}
                  onPress={() => {
                    setIsSubModalOpened(false);
                  }}
                >
                  Нет
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default GetReportModal;
