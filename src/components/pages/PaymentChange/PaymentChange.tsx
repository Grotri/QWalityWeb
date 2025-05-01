import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import Button from "../../atoms/Button";
import { useCost } from "../../../helpers/useCost";
import styles from "./PaymentChange.module.scss";
import { onSuccess } from "../../../helpers/toast";
import { ERoutes } from "../../../router/routes";

const PaymentChange = () => {
  const navigate = useNavigate();
  const { subscriptionId } = useParams();
  const { setUserField } = useAuthStore();
  const subscriptionCost = useCost(subscriptionId || "0");

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>
        Вы собираетесь оплатить подписку за {subscriptionCost} рублей
      </span>
      {subscriptionId && (
        <Button
          onPress={() => {
            setUserField("subscription", subscriptionId);
            navigate(ERoutes.profile);
            onSuccess("Подписка успешно оплачена", 2000);
            onSuccess("Вы успешно поменяли уровень подписки", 2000);
          }}
          style={styles.btn}
          color="blue"
        >
          Оплатить
        </Button>
      )}
    </div>
  );
};

export default PaymentChange;
