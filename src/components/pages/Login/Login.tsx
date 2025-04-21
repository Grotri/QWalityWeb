import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import { FormEvent, useState } from "react";
import { IErrors, initialErrors } from "./types";
import { EErrors } from "../../../constants/errors";
import { emailPattern } from "../../../constants/patterns";
import { onError } from "../../../helpers/toast";
import styles from "./Login.module.scss";
import Input from "../../atoms/Input/Input";
import InputPassword from "../../atoms/InputPassword";
import Button from "../../atoms/Button";
import { ERoutes } from "../../../router/routes";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });

  const validate = (): boolean => {
    const newErrors: IErrors = {
      email: !email.trim()
        ? EErrors.required
        : !emailPattern.test(email.trim())
        ? EErrors.email
        : "",
      password: !password.trim()
        ? EErrors.required
        : password.trim().length < 8
        ? EErrors.password
        : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      login(email, password);
    } else {
      onError(EErrors.fields);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleLogin}>
        <span className={styles.title}>Войти</span>
        <Input
          label="Почта / логин"
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
          label="Пароль"
          value={password}
          onChangeText={(password) => {
            setPassword(password);
            setErrors({ ...errors, password: "" });
          }}
          errorText={errors.password}
          inputFieldClassName={styles.input}
        />
        <Button color="blue" style={styles.loginBtn} type="submit">
          <span className={styles.loginBtnText}>Войти</span>
        </Button>
        <Button onPress={() => navigate(ERoutes.passwordRecovery)}>
          <span className={styles.forgotBtnText}>Забыли пароль?</span>
        </Button>
      </form>
    </div>
  );
};

export default Login;
