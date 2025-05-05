import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { IErrors, initialErrors } from "./types";
import { EErrors } from "../../../constants/errors";
import { emailPattern, innPattern } from "../../../constants/patterns";
import { onError, onSuccess, onWarning } from "../../../helpers/toast";
import styles from "./Profile.module.scss";
import { ProfileIcon } from "../../../assets/icons";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button";
import { ERoutes } from "../../../router/routes";
import useAuthStore from "../../../store/useAuthStore";
import { initialUser, IUser } from "../../../model/user";
import { ERoles } from "../../../constants/roles";
import { supportLink } from "../../../constants/support";

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
      login: !userInfo.login.trim()
        ? EErrors.required
        : !emailPattern.test(userInfo.login.trim())
        ? EErrors.email
        : "",
      code: !code.trim() ? EErrors.required : "",
      inn:
        !userInfo.inn || !userInfo.inn.trim()
          ? EErrors.required
          : !innPattern.test(userInfo.inn.trim())
          ? EErrors.inn
          : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const saveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProfile: IUser = {
      ...userInfo,
      login: userInfo.login.trim(),
      inn: userInfo.inn?.trim(),
    };
    if (JSON.stringify(user) !== JSON.stringify(newProfile)) {
      if (validate()) {
        setIsEditMode(false);
        setCode("");
        setUser(newProfile);
        onSuccess("Данные профиля изменены");
      } else {
        onError(EErrors.fields);
      }
    } else {
      onWarning(EErrors.noChanges);
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
            <span className={styles.cardPointData}>{userInfo.login}</span>
          ) : (
            <Input
              value={userInfo.login}
              onChangeText={(email) => {
                setUserInfo({ ...userInfo, login: email });
                setErrors({ ...errors, login: "" });
              }}
              maxLength={254}
              errorText={errors.login}
              inputClassName={styles.formInput}
              inputFieldClassName={styles.input}
              errorClassName={styles.error}
            />
          )}
        </div>
        <div className={styles.cardPoint}>
          <span className={styles.cardPointTitle}>Роль</span>
          <span className={styles.cardPointData}>
            {ERoles[user.role as keyof typeof ERoles]}
          </span>
        </div>
        {user.role === "owner" && (
          <div className={styles.cardPoint}>
            <span className={styles.cardPointTitle}>ИНН</span>
            {!isEditMode ? (
              <span className={styles.cardPointData}>{userInfo.inn}</span>
            ) : (
              <Input
                value={userInfo.inn || ""}
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
        )}
      </div>
      {!isEditMode ? (
        <>
          {user.role === "owner" && (
            <Button
              style={styles.btn}
              color="blue"
              onPress={() => setIsEditMode(true)}
            >
              Изменить данные
            </Button>
          )}
          {user.role === "owner" && (
            <Button
              style={styles.btn}
              color="blue"
              onPress={() => navigate(ERoutes.subscriptionEdit)}
            >
              Управлять подпиской
            </Button>
          )}
          {["owner", "administrator"].includes(user.role) && (
            <Button
              style={styles.btn}
              color="blue"
              onPress={() => navigate(ERoutes.admin)}
            >
              Админ панель
            </Button>
          )}
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
              className={styles.confirmation}
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
            <span
              className={styles.supportTextUnderlined}
              onClick={() => window.open(supportLink, "_blank")}
            >
              Обратитесь в тех. поддержку
            </span>
          </div>
        </>
      )}
    </form>
  );
};

export default Profile;
