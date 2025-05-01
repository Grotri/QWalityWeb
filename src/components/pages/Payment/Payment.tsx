import { useParams } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import Button from "../../atoms/Button";
import { useCost } from "../../../helpers/useCost";
import styles from "./Payment.module.scss";
import { onSuccess } from "../../../helpers/toast";

const Payment = () => {
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
            onSuccess("Подписка успешно оплачена");
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

export default Payment;
