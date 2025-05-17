import { useParams } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import Button from "../../atoms/Button";
import { useCost } from "../../../helpers/useCost";
import styles from "./Payment.module.scss";
import { onSuccess } from "../../../helpers/toast";
import { useTranslation } from "react-i18next";

const Payment = () => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  const { setUserField } = useAuthStore();
  const subscriptionCost = useCost(subscriptionId || "0");

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>
        {t("subscriptionPaymentIntro")} {subscriptionCost} {t("rubles")}
      </span>
      {subscriptionId && (
        <Button
          onPress={() => {
            setUserField("subscription", subscriptionId);
            onSuccess(t("subscriptionPaid"));
          }}
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
