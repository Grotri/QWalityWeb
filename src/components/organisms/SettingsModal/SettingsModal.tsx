import { FC, useEffect, useState } from "react";
import { ISettingsModal } from "./types";
import styles from "./SettingsModal.module.scss";
import Dropdown from "../../atoms/Dropdown";
import { settingsItems } from "../../../constants/settingsItems";
import Button from "../../atoms/Button";
import clsx from "clsx";
import { EErrors } from "../../../constants/errors";
import { onError } from "../../../helpers/toast";
import useAuthStore from "../../../store/useAuthStore";
import Modal from "../../atoms/Modal";
import Input from "../../atoms/Input/Input";
import useAccountStore from "../../../store/useAccountStore";

const SettingsModal: FC<ISettingsModal> = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuthStore();
  const { clearAccounts } = useAccountStore();

  const [isAutoDelete, setIsAutoDelete] = useState<string>("No");
  const [isAutoClear, setIsAutoClear] = useState<string>("No");
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const deleteAccount = () => {
    if (!code.trim()) {
      setError(EErrors.required);
      onError("Сначала введите код");
    } else {
      logout(clearAccounts);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isDeleteModalOpen) {
      setCode("");
      setError("");
    }
  }, [isDeleteModalOpen]);

  return (
    <>
      <div className={clsx(styles.wrapper, isOpen && styles.wrapperVisible)}>
        {user.role !== "user" && (
          <div className={styles.dropdowns}>
            <div className={styles.dropdownWrapper}>
              <span className={styles.dropdownText}>
                Авто-удаление дефектов
              </span>
              <Dropdown
                data={settingsItems}
                setValue={setIsAutoDelete}
                value={isAutoDelete}
                wrapperStyle={styles.dropdown}
                fontSize="14px"
                marginHorizontal="8px"
                marginVertical="4px"
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
                marginHorizontal="8px"
                marginVertical="4px"
              />
            </div>
          </div>
        )}
        <div className={styles.btns}>
          <Button
            style={styles.btn}
            color="blue"
            onPress={() => setIsExitModalOpen(true)}
          >
            Выйти из аккаунта
          </Button>
          {user.role === "owner" && (
            <Button
              style={styles.btn}
              color="red"
              onPress={() => setIsDeleteModalOpen(true)}
            >
              Удалить аккаунт
            </Button>
          )}
        </div>
        <span className={styles.version}>QWality Release v1.0.0</span>
      </div>
      <Modal isVisible={isExitModalOpen} setIsVisible={setIsExitModalOpen}>
        <div className={styles.exitModal}>
          <span className={styles.modalTitle}>Вы точно хотите выйти?</span>
          <div className={styles.modalBtns}>
            <Button
              style={styles.modalBtn}
              color="blue"
              onPress={() => {
                logout(clearAccounts);
                setIsOpen(false);
              }}
            >
              Да
            </Button>
            <Button
              style={styles.modalBtn}
              color="blue"
              onPress={() => setIsExitModalOpen(false)}
            >
              Нет
            </Button>
          </div>
        </div>
      </Modal>
      <Modal isVisible={isDeleteModalOpen} setIsVisible={setIsDeleteModalOpen}>
        <div className={styles.deleteModal}>
          <span className={styles.modalTitle}>Удалить аккаунт?</span>
          <div className={styles.confirmationWrapper}>
            <Input
              label="Код подтверждения"
              value={code}
              onChangeText={(code) => {
                setCode(code);
                setError("");
              }}
              errorText={error}
              maxLength={6}
              inputClassName={styles.inputWrapper}
              inputFieldClassName={styles.input}
              labelClassName={styles.inputLabel}
              errorClassName={styles.inputError}
            />
            <Button style={styles.codeBtn} color="blue">
              Отправить код
            </Button>
          </div>
          <div className={styles.modalBtns}>
            <Button
              style={clsx(styles.modalCancelBtn, styles.modalDeleteBtn)}
              color="red"
              onPress={deleteAccount}
            >
              Удалить
            </Button>
            <Button
              style={styles.modalCancelBtn}
              color="blue"
              onPress={() => setIsDeleteModalOpen(false)}
            >
              Отменить
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SettingsModal;
