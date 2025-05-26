import ReactModal from "@mui/material/Modal";
import { IModal } from "./types";
import { FC } from "react";
import styles from "./Modal.module.scss";
import { Backdrop } from "@mui/material";

const Modal: FC<IModal> = ({ children, isVisible, setIsVisible, onClose }) => {
  const handleClose = () => {
    if (setIsVisible) {
      setIsVisible(false);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <ReactModal
      open={isVisible}
      onClose={handleClose}
      closeAfterTransition
      disableEnforceFocus
      disableAutoFocus
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
    >
      <div className={styles.modal}>{children}</div>
    </ReactModal>
  );
};

export default Modal;
