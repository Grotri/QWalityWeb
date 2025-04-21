import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const onSuccess = (message: string, autoClose?: number) => {
  toast.success(message, { autoClose });
};

export const onError = (message: string, autoClose?: number) => {
  toast.error(message, { autoClose });
};

export const onWarning = (message: string, autoClose?: number) => {
  toast.warning(message, { autoClose });
};

export const onInfo = (message: string, autoClose?: number) => {
  toast.info(message, { autoClose });
};
