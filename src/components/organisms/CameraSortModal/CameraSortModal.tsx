import { FC, useEffect, useState } from "react";
import { ICameraSortModal } from "./types";
import { ESortOptions } from "./enums";
import Modal from "../../atoms/Modal";
import styles from "./CameraSortModal.module.scss";
import { CrossIcon } from "../../../assets/icons";
import Dropdown from "../../atoms/Dropdown";
import Button from "../../atoms/Button";
import { useTranslation } from "react-i18next";

const CameraSortModal: FC<ICameraSortModal> = ({
  isOpen,
  initialOption,
  setIsOpen,
  onApply,
}) => {
  const { t } = useTranslation();
  const [option, setOption] = useState<keyof typeof ESortOptions>("type");

  const closeModal = () => {
    setIsOpen(false);
    setOption("type");
  };

  const handleApply = () => {
    onApply(option);
    closeModal();
  };

  const handleReset = () => {
    onApply(undefined);
    closeModal();
  };

  useEffect(() => {
    if (isOpen) {
      setOption(initialOption || "type");
    }
  }, [isOpen, initialOption]);

  return (
    <Modal isVisible={isOpen} onClose={closeModal}>
      <div className={styles.modal}>
        <div className={styles.crossIconWrapper}>
          <CrossIcon style={styles.crossIcon} onClick={closeModal} />
          <span className={styles.modalTitle}>{t("sort")}</span>
        </div>
        <div className={styles.content}>
          <Dropdown
            data={Object.entries(ESortOptions).map(([key, value]) => ({
              value: key,
              label: t(value),
            }))}
            value={option}
            setValue={(item) => setOption(item as keyof typeof ESortOptions)}
            controlBackgroundColor="var(--subDropdownListBgTransparent)"
            controlHeight="28px"
            iconScale={1.2}
            marginVertical="6px"
          />
          <div className={styles.btns}>
            <Button style={styles.btn} color="modal" onPress={handleApply}>
              {t("apply")}
            </Button>
            {initialOption && (
              <Button style={styles.btn} color="darkBlue" onPress={handleReset}>
                {t("resetSorting")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CameraSortModal;
