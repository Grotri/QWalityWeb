import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import Button from "../../atoms/Button";
import { useCost } from "../../../helpers/useCost";
import styles from "./PaymentChange.module.scss";
import { onSuccess } from "../../../helpers/toast";
import { ERoutes } from "../../../router/routes";
import { useTranslation } from "react-i18next";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../../firebase";

const PaymentChange = () => {
  const navigate = useNavigate();
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
          onPress={() => {
            handleLicense(subscriptionId, () => {
              navigate(ERoutes.profile);
              onSuccess(t("subscriptionPaid"), 2000);
              onSuccess(t("subscriptionLevelChanged"), 2000);
              logEvent(analytics, "updated_to_extended_pricing_plan");
            });
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
