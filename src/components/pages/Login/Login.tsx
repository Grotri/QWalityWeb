import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import { FormEvent, useState } from "react";
import { IErrors, initialErrors } from "./types";
import { EErrors } from "../../../constants/errors";
import { onError } from "../../../helpers/toast";
import styles from "./Login.module.scss";
import Input from "../../atoms/Input/Input";
import InputPassword from "../../atoms/InputPassword";
import Button from "../../atoms/Button";
import { ERoutes } from "../../../router/routes";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });

  const validate = (): boolean => {
    const newErrors: IErrors = {
      email: !email.trim() ? t(EErrors.required) : "",
      password: !password.trim()
        ? t(EErrors.required)
        : password.trim().length < 8
        ? t(EErrors.password)
        : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      login(email.trim(), password.trim());
    } else {
      onError(t(EErrors.fields));
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleLogin}>
        <span className={styles.title}>{t("signIn")}</span>
        <Input
          label={t("emailOrLogin")}
          value={email}
          onChangeText={(email) => {
            setEmail(email);
            setErrors({ ...errors, email: "" });
          }}
          maxLength={254}
          errorText={errors.email}
          inputFieldClassName={styles.input}
        />
        <InputPassword
          label={t("password")}
          value={password}
          onChangeText={(password) => {
            setPassword(password);
            setErrors({ ...errors, password: "" });
          }}
          errorText={errors.password}
          inputFieldClassName={styles.input}
        />
        <Button color="blue" style={styles.loginBtn} type="submit">
          <span className={styles.loginBtnText}>{t("signIn")}</span>
        </Button>
        <Button onPress={() => navigate(ERoutes.passwordRecovery)}>
          <span className={styles.forgotBtnText}>{t("forgotPassword")}</span>
        </Button>
      </form>
    </div>
  );
};

export default Login;
