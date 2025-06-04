import { useParams } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import Button from "../../atoms/Button";
import { useCost } from "../../../helpers/useCost";
import styles from "./Payment.module.scss";
import { useTranslation } from "react-i18next";
import { onSuccess } from "../../../helpers/toast";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../../firebase";

const Payment = () => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  const { handleLicense } = useAuthStore();
  const subscriptionCost = useCost(subscriptionId || "0");

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>
        {t("subscriptionPaymentIntro")} {subscriptionCost} {t("rubles")}
      </span>
      {subscriptionId && (
        <Button
          onPress={() =>
            handleLicense(subscriptionId, () => {
              onSuccess(t("subscriptionPaid"));
              logEvent(analytics, "extended_subscription_selected");
            })
          }
          style={styles.btn}
          color="blue"
        >
          {t("pay")}
        </Button>
      )}
    </div>
  );
};

export default Payment;
