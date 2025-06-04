import { FC, FormEvent, useEffect, useState } from "react";
import { IAddCameraModal } from "./types";
import useCamerasStore from "../../../store/useCamerasStore";
import styles from "./AddCameraModal.module.scss";
import Modal from "../../atoms/Modal";
import { CrossIcon } from "../../../assets/icons";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button";
import { useTranslation } from "react-i18next";

const AddCameraModal: FC<IAddCameraModal> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const { addCamera, errors, setErrorsField, refreshErrors } =
    useCamerasStore();
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const handleAddCamera = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCamera(name, link);
  };

  useEffect(() => {
    if (!isOpen) {
      refreshErrors();
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <Modal isVisible={isOpen} setIsVisible={setIsOpen}>
      <form className={styles.modal} onSubmit={handleAddCamera}>
        <div className={styles.crossIconWrapper}>
          <CrossIcon
            style={styles.crossIcon}
            onClick={() => setIsOpen(false)}
          />
          <span className={styles.modalTitle}>{t("addCamera")}</span>
        </div>
        <div className={styles.modalContent}>
          <Input
            label={t("name")}
            value={name}
            onChangeText={(name) => {
              setName(name);
              setErrorsField("name", "");
            }}
            errorText={errors.name}
            maxLength={20}
            inputClassName={styles.inputWrapper}
            inputFieldClassName={styles.input}
            labelClassName={styles.inputLabel}
            errorClassName={styles.errorLabel}
          />
          <Input
            label={t("cameraLink")}
            value={link}
            onChangeText={(link) => {
              setLink(link);
              setErrorsField("link", "");
            }}
            errorText={errors.link}
            inputClassName={styles.inputWrapper}
            inputFieldClassName={styles.input}
            labelClassName={styles.inputLabel}
            errorClassName={styles.errorLabel}
          />
        </div>
        <Button style={styles.btn} color="modal" type="submit">
          {t("add")}
        </Button>
      </form>
    </Modal>
  );
};

export default AddCameraModal;
