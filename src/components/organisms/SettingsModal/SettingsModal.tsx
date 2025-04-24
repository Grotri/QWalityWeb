import { FC, useEffect, useState } from "react";
import { ISettingsModal } from "./types";
import styles from "./SettingsModal.module.scss";
import Dropdown from "../../atoms/Dropdown";
import { settingsItems } from "../../../constants/settingsItems";
import Button from "../../atoms/Button";
import clsx from "clsx";

const SettingsModal: FC<ISettingsModal> = ({ isOpen, setIsOpen }) => {
  const [isAutoDelete, setIsAutoDelete] = useState<string>("No");
  const [isAutoClear, setIsAutoClear] = useState<string>("No");
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!isDeleteModalOpen) {
      setCode("");
      setError("");
    }
  }, [isDeleteModalOpen]);

  return (
    <>
      <div className={clsx(styles.wrapper, isOpen && styles.wrapperVisible)}>
        <div className={styles.dropdowns}>
          <div className={styles.dropdownWrapper}>
            <span className={styles.dropdownText}>Авто-удаление дефектов</span>
            <Dropdown
              data={settingsItems}
              setValue={setIsAutoDelete}
              value={isAutoDelete}
              wrapperStyle={styles.dropdown}
              fontSize="14px"
              valueMargin="6px"
            />
          </div>
          <div className={styles.dropdownWrapper}>
            <span className={styles.dropdownText}>Авто-чистка корзины</span>
            <Dropdown
              data={settingsItems}
              setValue={setIsAutoClear}
              value={isAutoClear}
              wrapperStyle={styles.dropdown}
              fontSize="14px"
              valueMargin="6px"
            />
          </div>
        </div>
        <div className={styles.btns}>
          <Button
            style={styles.btn}
            color="blue"
            onPress={() => setIsExitModalOpen(true)}
          >
            Выйти из аккаунта
          </Button>
          <Button
            style={styles.btn}
            color="red"
            onPress={() => setIsDeleteModalOpen(true)}
          >
            Удалить аккаунт
          </Button>
        </div>
        <span className={styles.version}>QWality Release v1.0.0</span>
      </div>
    </>
  );
};

export default SettingsModal;
