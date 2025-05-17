import { FC, useEffect, useState } from "react";
import { ICameraFilterModal, initialCameraFilter } from "./types";
import { EDefectOptions } from "./enums";
import { onError } from "../../../helpers/toast";
import { EErrors } from "../../../constants/errors";
import Modal from "../../atoms/Modal";
import styles from "./CameraFilterModal.module.scss";
import { CrossIcon } from "../../../assets/icons";
import Radio from "../../atoms/Radio";
import DatePicker from "../../atoms/DatePicker";
import Dropdown from "../../atoms/Dropdown";
import Button from "../../atoms/Button";
import { useTranslation } from "react-i18next";

const CameraFilterModal: FC<ICameraFilterModal> = ({
  isOpen,
  setIsOpen,
  initialFilter,
  onApply,
}) => {
  const { t } = useTranslation();
  const [isDateFilter, setIsDateFilter] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [option, setOption] =
    useState<keyof typeof EDefectOptions>("missingElement");

  const closeModal = () => {
    setIsOpen(false);
    if (!isDateFilter) {
      setIsDateFilter(true);
    }
    setStartDate(null);
    setEndDate(null);
    setOption("missingElement");
  };

  const handleApply = () => {
    if (isDateFilter) {
      if (!startDate || !endDate) {
        onError(t(EErrors.chooseDates));
        return;
      }

      if (startDate > endDate) {
        onError(t(EErrors.timeDates));
        return;
      }
    }

    onApply({
      isDateFilter,
      startDate,
      endDate,
      option,
    });
    closeModal();
  };

  const handleReset = () => {
    onApply({ ...initialCameraFilter });
    closeModal();
  };

  useEffect(() => {
    if (isOpen) {
      setIsDateFilter(initialFilter.isDateFilter);
      setStartDate(initialFilter.startDate);
      setEndDate(initialFilter.endDate);
      setOption(initialFilter.option);
    }
  }, [isOpen, initialFilter]);

  return (
    <Modal isVisible={isOpen} onClose={closeModal}>
      <div className={styles.modal}>
        <div className={styles.crossIconWrapper}>
          <CrossIcon style={styles.crossIcon} onClick={closeModal} />
          <span className={styles.modalTitle}>{t("filter")}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.radioWrapper}>
            <Radio
              label={t("byDate")}
              isChecked={isDateFilter}
              setIsChecked={() => setIsDateFilter(true)}
              style={styles.radio}
              radioWrapperStyle={styles.radioWrapperStyle}
              labelStyle={styles.labelStyle}
            />
            <div className={styles.row}>
              <DatePicker
                date={startDate}
                setDate={(date) => setStartDate(date)}
                bgColor="var(--subDropdownListBgTransparent)"
              />
              <div className={styles.dash} />
              <DatePicker
                date={endDate}
                setDate={(date) => setEndDate(date)}
                bgColor="var(--subDropdownListBgTransparent)"
              />
            </div>
          </div>
          <div className={styles.radioWrapper}>
            <Radio
              label={t("byDefects")}
              isChecked={!isDateFilter}
              setIsChecked={() => setIsDateFilter(false)}
              style={styles.radio}
              radioWrapperStyle={styles.radioWrapperStyle}
              labelStyle={styles.labelStyle}
            />
            <Dropdown
              data={Object.entries(EDefectOptions).map(
                ([key, value]) => ({
                  value: key,
                  label: t(value),
                })
              )}
              value={option}
              setValue={(item) =>
                setOption(item as keyof typeof EDefectOptions)
              }
              controlBackgroundColor="var(--subDropdownListBgTransparent)"
              controlHeight="30px"
              fontSize="calc(16px * var(--font-scale))"
              marginVertical="6px"
            />
          </div>
          <Button style={styles.btn} color="modal" onPress={handleApply}>
            {t("apply")}
          </Button>
          {JSON.stringify(initialCameraFilter) !==
            JSON.stringify(initialFilter) && (
            <Button style={styles.btn} color="darkBlue" onPress={handleReset}>
              {t("resetFilters")}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CameraFilterModal;
