import styles from "./ErrorPage.module.scss";

const ErrorPage = () => (
  <div className={styles.wrapper}>
    <span className={styles.title}>Ошибка</span>
    <span className={styles.description}>Что-то пошло не так...</span>
  </div>
);

export default ErrorPage;
