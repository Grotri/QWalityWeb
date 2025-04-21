import { useNavigate } from "react-router-dom";
import useAuthStore, { initialUser, IUser } from "../../../store/useAuthStore";
import { FormEvent, useEffect, useState } from "react";
import { IErrors, initialErrors } from "./types";
import { EErrors } from "../../../constants/errors";
import { emailPattern } from "../../../constants/patterns";
import { onError, onSuccess } from "../../../helpers/toast";
import styles from "./Profile.module.scss";
import ProfileIcon from "../../../assets/icons/ProfileIcon";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button";
import { ERoutes } from "../../../router/routes";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [userInfo, setUserInfo] = useState<IUser>({ ...initialUser });
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });
  const [code, setCode] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const cancel = () => {
    setIsEditMode(false);
    setUserInfo({ ...user });
    setCode("");
    setErrors({ ...initialErrors });
  };

  const validate = (): boolean => {
    const newErrors: IErrors = {
      email: !userInfo.email.trim()
        ? EErrors.required
        : !emailPattern.test(userInfo.email.trim())
        ? EErrors.email
        : "",
      code: !code.trim() ? EErrors.required : "",
      inn: !userInfo.inn
        ? EErrors.required
        : userInfo.inn.length !== 10 && userInfo.inn.length !== 12
        ? EErrors.inn
        : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const saveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setIsEditMode(false);
      setCode("");
      setUser({ ...userInfo });
      onSuccess("Данные профиля изменены");
    } else {
      onError(EErrors.fields);
    }
  };

  useEffect(() => {
    setUserInfo({ ...user });
  }, [user]);

  return (
    <form className={styles.profileWrapper} onSubmit={saveChanges}>
      <ProfileIcon />
      <div className={styles.card}>
        <div className={styles.cardPoint}>
          <span className={styles.cardPointTitle}>
            Электронная почта / логин
          </span>
          {!isEditMode ? (
            <span className={styles.cardPointData}>{userInfo.email}</span>
          ) : (
            <Input
              value={userInfo.email}
              onChangeText={(email) => {
                setUserInfo({ ...userInfo, email });
                setErrors({ ...errors, email: "" });
              }}
              maxLength={254}
              errorText={errors.email}
              inputClassName={styles.formInput}
              inputFieldClassName={styles.input}
              errorClassName={styles.error}
            />
          )}
        </div>
        <div className={styles.cardPoint}>
          <span className={styles.cardPointTitle}>Роль</span>
          <span className={styles.cardPointData}>Владелец</span>
        </div>
        <div className={styles.cardPoint}>
          <span className={styles.cardPointTitle}>ИНН</span>
          {!isEditMode ? (
            <span className={styles.cardPointData}>{userInfo.inn}</span>
          ) : (
            <Input
              value={userInfo.inn}
              onChangeText={(inn) => {
                setUserInfo({ ...userInfo, inn });
                setErrors({ ...errors, inn: "" });
              }}
              maxLength={12}
              errorText={errors.inn}
              inputClassName={styles.formInput}
              inputFieldClassName={styles.input}
              errorClassName={styles.error}
            />
          )}
        </div>
      </div>
      {!isEditMode ? (
        <>
          <Button
            style={styles.btn}
            color="blue"
            onPress={() => setIsEditMode(true)}
          >
            Изменить данные
          </Button>
          <Button
            style={styles.btn}
            color="blue"
            onPress={() => navigate(ERoutes.subscriptionEdit)}
          >
            Управлять подпиской
          </Button>
          <Button style={styles.btn} color="blue">
            Админ панель
          </Button>
        </>
      ) : (
        <>
          <div className={styles.confirmationWrapper}>
            <Input
              label="Код подтверждения"
              value={code}
              onChangeText={(code) => {
                setCode(code);
                setErrors({ ...errors, code: "" });
              }}
              maxLength={6}
              errorText={errors.code}
              inputClassName={styles.confirmationInput}
              labelClassName={styles.confirmationInputLabel}
              inputFieldClassName={styles.input}
              errorClassName={styles.error}
            />
            <Button style={styles.codeBtn} color="darkBlue">
              Отправить код
            </Button>
          </div>
          <Button style={styles.btn} color="blue" type="submit">
            Сохранить изменения
          </Button>
          <Button style={styles.btn} color="blue" onPress={cancel}>
            Отменить
          </Button>
          <div className={styles.supportTextWrapper}>
            <span className={styles.supportText}>Нет доступа к почте?</span>
            <span className={styles.supportTextUnderlined}>
              Обратитесь в тех. поддержку
            </span>
          </div>
        </>
      )}
    </form>
  );
};

export default Profile;
