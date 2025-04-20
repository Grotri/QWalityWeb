import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const onSuccess = (message: string) => {
  toast.success(message);
};

export const onError = (message: string) => {
  toast.error(message);
};

export const onWarning = (message: string) => {
  toast.warning(message);
};

export const onInfo = (message: string) => {
  toast.info(message);
};
