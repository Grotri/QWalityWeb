import { FormEvent, useState } from "react";
import styles from "./ForgotPassword.module.scss";
import { IErrors, initialErrors } from "./types";
import { emailPattern } from "../../../constants/patterns";
import { EErrors } from "../../../constants/errors";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../../../router/routes";
import { onError, onSuccess } from "../../../helpers/toast";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button";
import InputPassword from "../../atoms/InputPassword";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });

  const validate = (): boolean => {
    const newErrors: IErrors = {
      email: !email.trim()
        ? EErrors.required
        : !emailPattern.test(email.trim())
        ? EErrors.email
        : "",
      code: !code.trim() ? EErrors.required : "",
      password: !password.trim()
        ? EErrors.required
        : password.trim().length < 8
        ? EErrors.password
        : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const changePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      navigate(ERoutes.login);
      onSuccess("Пароль сменен, зайдите с новыми данными", 5000);
    } else {
      onError(EErrors.fields);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={changePassword}>
        <span className={styles.title}>Восстановление пароля</span>
        <div className={styles.fields}>
          <Input
            label="Почта"
            value={email}
            onChangeText={(email) => {
              setEmail(email);
              setErrors({ ...errors, email: "" });
            }}
            maxLength={254}
            errorText={errors.email}
            inputFieldClassName={styles.input}
          />
          <div className={styles.confirmationWrapper}>
            <Input
              label="Код"
              value={code}
              onChangeText={(code) => {
                setCode(code);
                setErrors({ ...errors, code: "" });
              }}
              maxLength={6}
              errorText={errors.code}
              inputFieldClassName={styles.input}
            />
            <Button style={styles.codeBtn} color="blue">
              <span className={styles.codeBtnText}>Получить код</span>
            </Button>
          </div>
          <InputPassword
            label="Новый пароль"
            value={password}
            onChangeText={(password) => {
              setPassword(password);
              setErrors({ ...errors, password: "" });
            }}
            errorText={errors.password}
            inputFieldClassName={styles.input}
          />
        </div>
        <Button color="blue" style={styles.changeBtn} type="submit">
          <span className={styles.changeBtnText}>Восстановить пароль</span>
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
