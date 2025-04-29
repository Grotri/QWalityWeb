import { FC, useEffect, useState } from "react";
import { ICameraFilterModal, initialCameraFilter } from "./types";
import { EDefectFilterOptions } from "./enums";
import { onError } from "../../../helpers/toast";
import { EErrors } from "../../../constants/errors";
import Modal from "../../atoms/Modal";
import styles from "./CameraFilterModal.module.scss";
import { CrossIcon } from "../../../assets/icons";
import Radio from "../../atoms/Radio";
import DatePicker from "../../atoms/DatePicker";
import Dropdown from "../../atoms/Dropdown";
import Button from "../../atoms/Button";

const CameraFilterModal: FC<ICameraFilterModal> = ({
  isOpen,
  setIsOpen,
  initialFilter,
  onApply,
}) => {
  const [isDateFilter, setIsDateFilter] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [option, setOption] =
    useState<keyof typeof EDefectFilterOptions>("missingElement");

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
        onError(EErrors.chooseDates);
        return;
      }

      if (startDate > endDate) {
        onError(EErrors.timeDates);
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
          <span className={styles.modalTitle}>Фильтровать</span>
        </div>
        <div className={styles.content}>
          <div className={styles.radioWrapper}>
            <Radio
              label="По дате"
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
              label="По дефектам"
              isChecked={!isDateFilter}
              setIsChecked={() => setIsDateFilter(false)}
              style={styles.radio}
              radioWrapperStyle={styles.radioWrapperStyle}
              labelStyle={styles.labelStyle}
            />
            <Dropdown
              data={Object.entries(EDefectFilterOptions).map(
                ([key, value]) => ({
                  value: key,
                  label: value,
                })
              )}
              value={option}
              setValue={(item) =>
                setOption(item as keyof typeof EDefectFilterOptions)
              }
              controlBackgroundColor="var(--subDropdownListBgTransparent)"
              controlHeight="30px"
              fontSize="16px"
              marginVertical="6px"
            />
          </div>
          <Button style={styles.btn} color="modal" onPress={handleApply}>
            Применить
          </Button>
          {JSON.stringify(initialCameraFilter) !==
            JSON.stringify(initialFilter) && (
            <Button style={styles.btn} color="darkBlue" onPress={handleReset}>
              Сбросить фильтры
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CameraFilterModal;
