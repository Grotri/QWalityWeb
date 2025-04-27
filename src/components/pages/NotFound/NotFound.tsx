import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";
import Button from "../../atoms/Button";
import { ERoutes } from "../../../router/routes";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <span className={styles.error}>404</span>
      <span className={styles.title}>Страница не найдена</span>
      <Button
        color="blue"
        style={styles.btn}
        onPress={() => navigate(ERoutes.main)}
      >
        Вернуться на главную страницу
      </Button>
    </div>
  );
};

export default NotFound;
