import { FC, useEffect, useState } from "react";
import { IGetReportModal } from "./types";
import Modal from "../../atoms/Modal";
import { CrossIcon } from "../../../assets/icons";
import styles from "./GetReportModal.module.scss";
import Dropdown from "../../atoms/Dropdown";
import { formats } from "../../../constants/formats";
import Button from "../../atoms/Button";
import { onError, onSuccess } from "../../../helpers/toast";
import Radio from "../../atoms/Radio";
import DatePicker from "../../atoms/DatePicker";
import { EErrors } from "../../../constants/errors";
import { useTranslation } from "react-i18next";
import useReportsAndLogsStore from "../../../store/useReportsAndLogsStore";

const GetReportModal: FC<IGetReportModal> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const { getReport, getLog } = useReportsAndLogsStore();
  const [isSubModalOpened, setIsSubModalOpened] = useState<boolean>(false);
  const [type, setType] = useState<"report" | "log">("report");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [format, setFormat] = useState<string>("pdf");

  const closeModal = () => {
    setIsOpen(false);
  };

  const validateDates = (): boolean => {
    if (!startDate || !endDate) {
      onError(t(EErrors.chooseDates));
      return false;
    }

    if (endDate > new Date()) {
      onError(t(EErrors.futureDate));
      return false;
    }

    if (startDate > endDate) {
      onError(t(EErrors.timeDates));
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateDates()) return;

    if (startDate && endDate) {
      if (type === "report") {
        getReport(startDate, endDate, format, closeModal);
      } else if (type === "log") {
        getLog(startDate, endDate, format, closeModal);
      }
    }
  };

  const handleDelete = () => {
    if (!validateDates()) return;

    onSuccess(type === "log" ? t("logDeleted") : t("reportDeleted"));
    closeModal();
  };

  useEffect(() => {
    if (!isOpen) {
      setType("report");
      setStartDate(null);
      setEndDate(null);
      setFormat("pdf");
      setIsSubModalOpened(false);
    }
  }, [isOpen]);

  return (
    <Modal isVisible={isOpen} setIsVisible={setIsOpen}>
      <div className={styles.modals}>
        <div className={styles.modal}>
          <div className={styles.crossIconWrapper}>
            <CrossIcon style={styles.crossIcon} onClick={closeModal} />
            <span className={styles.modalTitle}>
              {type === "log" ? t("getLog") : t("getReport")}
            </span>
          </div>
          <div className={styles.modalContent}>
            <div className={styles.row}>
              <Radio
                label={t("report")}
                isChecked={type === "report"}
                setIsChecked={() => {
                  setType("report");
                }}
              />
              <div className={styles.empty} />
              <Radio
                label={t("log")}
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
                marginVertical="8px"
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
                {type === "log" ? t("deleteLog") : t("deleteReport")}
              </Button>
              <div className={styles.empty} />
              <Button
                color="management"
                style={styles.btnModal}
                onPress={handleSave}
              >
                {t("download")}
              </Button>
            </div>
          </div>
        </div>
        {isSubModalOpened && (
          <div className={styles.modal}>
            <span className={styles.subModalTitle}>
              {type === "log"
                ? t("confirmDeleteLog")
                : t("confirmDeleteReport")}
            </span>
            <div className={styles.modalContent}>
              <div className={styles.row}>
                <Button
                  color="red"
                  style={styles.btnModalBold}
                  onPress={handleDelete}
                >
                  {t("yes")}
                </Button>
                <div className={styles.empty} />
                <Button
                  color="management"
                  style={styles.btnModalBold}
                  onPress={() => {
                    setIsSubModalOpened(false);
                  }}
                >
                  {t("no")}
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
