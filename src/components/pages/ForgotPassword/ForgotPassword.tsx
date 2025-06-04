import { FormEvent, useState } from "react";
import styles from "./ForgotPassword.module.scss";
import { IErrors, initialErrors } from "./types";
import { emailPattern } from "../../../constants/patterns";
import { EErrors } from "../../../constants/errors";
import { useNavigate } from "react-router-dom";
import { onError } from "../../../helpers/toast";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button";
import InputPassword from "../../atoms/InputPassword";
import useAuthStore from "../../../store/useAuthStore";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { sendResetCode, restorePassword } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });

  const validate = (): boolean => {
    const newErrors: IErrors = {
      email: !email.trim()
        ? t(EErrors.required)
        : !emailPattern.test(email.trim())
        ? t(EErrors.email)
        : "",
      code: !code.trim() ? t(EErrors.required) : "",
      password: !password.trim()
        ? t(EErrors.required)
        : password.trim().length < 8
        ? t(EErrors.password)
        : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const changePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      restorePassword(email.trim(), code.trim(), password.trim(), navigate);
    } else {
      onError(t(EErrors.fields));
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={changePassword}>
        <span className={styles.title}>{t("passwordRecovery")}</span>
        <div className={styles.fields}>
          <Input
            label={t("email")}
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
              label={t("code")}
              value={code}
              onChangeText={(code) => {
                setCode(code);
                setErrors({ ...errors, code: "" });
              }}
              maxLength={6}
              errorText={errors.code}
              inputFieldClassName={styles.input}
            />
            <Button
              style={styles.codeBtn}
              color="blue"
              onPress={() => sendResetCode(email.trim())}
            >
              <span className={styles.codeBtnText}>{t("getCode")}</span>
            </Button>
          </div>
          <InputPassword
            label={t("newPassword")}
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
          <span className={styles.changeBtnText}>{t("recoverPassword")}</span>
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
