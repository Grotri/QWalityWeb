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
import { fontSizes } from "../../../constants/fontSizes";
import { themes } from "../../../constants/themes";
import { languages } from "../../../constants/languages";
import { TFontSize, TLanguage, TTheme } from "../../../model/user";
import { useTranslation } from "react-i18next";
import { editAccount } from "../../../api/user";

const SettingsModal: FC<ISettingsModal> = ({ isOpen, setIsOpen }) => {
  const {
    user,
    setUser,
    language,
    setLanguage,
    sendDeleteCode,
    deleteAccount,
    logout,
  } = useAuthStore();
  const { clearAccounts } = useAccountStore();
  const { t } = useTranslation();

  const [isAutoDelete, setIsAutoDelete] = useState<string>("No");
  const [isAutoClear, setIsAutoClear] = useState<string>("No");
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const toggleTheme = (value: string) => {
    setUser({ ...user, theme: value as TTheme });
    editAccount(user.id, { color_theme: value });
  };

  const toggleFontSize = (value: string) => {
    setUser({ ...user, fontSize: value as TFontSize });
    editAccount(user.id, { font_size: value });
  };

  const toggleLanguage = (value: string) => {
    setLanguage(value as TLanguage);
  };

  const onCloseModal = () => {
    logout(clearAccounts);
    setIsOpen(false);
  };

  const handleDeleteAccount = () => {
    if (!code.trim()) {
      setError(t(EErrors.required));
      onError(t("enterCodeFirst"));
    } else {
      deleteAccount(code, onCloseModal);
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
        <div className={styles.dropdowns}>
          {user.role !== "user" && (
            <>
              <div className={styles.dropdownWrapper}>
                <span className={styles.dropdownText}>
                  {t("autoDeleteDefects")}
                </span>
                <Dropdown
                  data={settingsItems.map((item) => ({
                    value: item.value,
                    label: t(item.label),
                  }))}
                  setValue={setIsAutoDelete}
                  value={isAutoDelete}
                  wrapperStyle={styles.dropdown}
                  fontSize="calc(14px * var(--font-scale))"
                  marginHorizontal="8px"
                  marginVertical="4px"
                />
              </div>
              <div className={styles.dropdownWrapper}>
                <span className={styles.dropdownText}>
                  {t("autoCleanTrash")}
                </span>
                <Dropdown
                  data={settingsItems.map((item) => ({
                    value: item.value,
                    label: t(item.label),
                  }))}
                  setValue={setIsAutoClear}
                  value={isAutoClear}
                  wrapperStyle={styles.dropdown}
                  fontSize="calc(14px * var(--font-scale))"
                  marginHorizontal="8px"
                  marginVertical="4px"
                />
              </div>
            </>
          )}
          <div className={styles.dropdownWrapper}>
            <span className={styles.dropdownText}>{t("theme")}</span>
            <Dropdown
              data={themes.map((item) => ({
                value: item.value,
                label: t(item.label),
              }))}
              setValue={toggleTheme}
              value={user.theme}
              wrapperStyle={styles.dropdown}
              fontSize="calc(14px * var(--font-scale))"
              marginHorizontal="8px"
              marginVertical="4px"
            />
          </div>
          <div className={styles.dropdownWrapper}>
            <span className={styles.dropdownText}>{t("fontSize")}</span>
            <Dropdown
              data={fontSizes.map((item) => ({
                value: item.value,
                label: t(item.label),
              }))}
              setValue={toggleFontSize}
              value={user.fontSize}
              wrapperStyle={styles.dropdown}
              fontSize="calc(14px * var(--font-scale))"
              marginHorizontal="8px"
              marginVertical="4px"
            />
          </div>
          <div className={styles.dropdownWrapper}>
            <span className={styles.dropdownText}>{t("language")}</span>
            <Dropdown
              data={languages.map((item) => ({
                value: item.value,
                label: t(item.label),
              }))}
              setValue={toggleLanguage}
              value={language}
              wrapperStyle={styles.dropdown}
              fontSize="calc(14px * var(--font-scale))"
              marginHorizontal="8px"
              marginVertical="4px"
            />
          </div>
        </div>
        <div className={styles.btns}>
          <Button
            style={styles.btn}
            color="blue"
            onPress={() => setIsExitModalOpen(true)}
          >
            {t("logout")}
          </Button>
          {user.role === "owner" && (
            <Button
              style={styles.btn}
              color="red"
              onPress={() => setIsDeleteModalOpen(true)}
            >
              {t("deleteAccount")}
            </Button>
          )}
        </div>
        <span className={styles.version}>QWality Release v1.2.0</span>
      </div>
      <Modal isVisible={isExitModalOpen} setIsVisible={setIsExitModalOpen}>
        <div className={styles.exitModal}>
          <span className={styles.modalTitle}>{t("logoutConfirmation")}</span>
          <div className={styles.modalBtns}>
            <Button
              style={styles.modalBtn}
              color="blue"
              onPress={() => {
                logout(clearAccounts);
                setIsOpen(false);
              }}
            >
              {t("yes")}
            </Button>
            <Button
              style={styles.modalBtn}
              color="blue"
              onPress={() => setIsExitModalOpen(false)}
            >
              {t("no")}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal isVisible={isDeleteModalOpen} setIsVisible={setIsDeleteModalOpen}>
        <div className={styles.deleteModal}>
          <span className={styles.modalTitle}>{t("confirmDeleteAccount")}</span>
          <div className={styles.confirmationWrapper}>
            <Input
              label={t("confirmationCode")}
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
            <Button
              style={styles.codeBtn}
              color="blue"
              onPress={sendDeleteCode}
            >
              {t("sendCode")}
            </Button>
          </div>
          <div className={styles.modalBtns}>
            <Button
              style={clsx(styles.modalCancelBtn, styles.modalDeleteBtn)}
              color="red"
              onPress={handleDeleteAccount}
            >
              {t("delete")}
            </Button>
            <Button
              style={styles.modalCancelBtn}
              color="blue"
              onPress={() => setIsDeleteModalOpen(false)}
            >
              {t("cancelAction")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SettingsModal;
