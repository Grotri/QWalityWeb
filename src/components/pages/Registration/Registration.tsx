import { FormEvent, useEffect, useState } from "react";
import useAuthStore from "../../../store/useAuthStore";
import Input from "../../atoms/Input/Input";
import styles from "./Registration.module.scss";
import Button from "../../atoms/Button";
import InputPassword from "../../atoms/InputPassword";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../../../router/routes";

const Registration = () => {
  const navigate = useNavigate();
  const {
    errors,
    clearErrors,
    setErrorsField,
    user,
    setUserField,
    clearUser,
    register,
  } = useAuthStore();

  const [code, setCode] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(code);
  };

  useEffect(() => {
    clearUser();
    setCode("");
    clearErrors();
  }, [clearErrors, clearUser]);

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <span className={styles.title}>Регистрация</span>
        <Input
          label="ИНН"
          maxLength={12}
          value={user.inn}
          onChangeText={(inn) => {
            setUserField("inn", inn);
            setErrorsField("inn", "");
          }}
          errorText={errors.inn}
        />
        <Input
          label="Почта"
          value={user.email}
          onChangeText={(email) => {
            setUserField("email", email);
            setErrorsField("email", "");
          }}
          maxLength={254}
          errorText={errors.email}
        />
        <InputPassword
          label="Пароль"
          value={user.password}
          onChangeText={(password) => {
            setUserField("password", password);
            setErrorsField("password", "");
          }}
          errorText={errors.password}
        />
        <div className={styles.codeWrapper}>
          <Input
            label="Код"
            value={code}
            onChangeText={(code) => {
              setCode(code);
              setErrorsField("code", "");
            }}
            maxLength={6}
            errorText={errors.code}
          />
          <Button style={styles.codeBtn} color="blue">
            <span className={styles.codeBtnText}>Получить код</span>
          </Button>
        </div>
        <Button color="blue" style={styles.createBtn} type="submit">
          <span className={styles.createBtnText}>Зарегистрироваться</span>
        </Button>
        <Button onPress={() => navigate(ERoutes.login)}>
          <span className={styles.loginBtnText}>Уже есть аккаунт?</span>
        </Button>
      </form>
    </div>
  );
};

export default Registration;
