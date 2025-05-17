import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import Button from "../../atoms/Button";
import { useCost } from "../../../helpers/useCost";
import styles from "./PaymentChange.module.scss";
import { onSuccess } from "../../../helpers/toast";
import { ERoutes } from "../../../router/routes";
import { useTranslation } from "react-i18next";

const PaymentChange = () => {
  const navigate = useNavigate();
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
            navigate(ERoutes.profile);
            onSuccess(t("subscriptionPaid"), 2000);
            onSuccess(t("subscriptionLevelChanged"), 2000);
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

export default PaymentChange;
