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
import { useTranslation } from "react-i18next";

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        ? t(EErrors.required)
        : !emailPattern.test(userInfo.login.trim())
        ? t(EErrors.email)
        : "",
      code: !code.trim() ? t(EErrors.required) : "",
      inn:
        !userInfo.inn || !userInfo.inn.trim()
          ? t(EErrors.required)
          : !innPattern.test(userInfo.inn.trim())
          ? t(EErrors.inn)
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
        onSuccess(t("profileDataChanged"));
      } else {
        onError(t(EErrors.fields));
      }
    } else {
      onWarning(t(EErrors.noChanges));
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
            {t("emailOrLoginChange")}
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
          <span className={styles.cardPointTitle}>{t("role")}</span>
          <span className={styles.cardPointData}>
            {t(ERoles[user.role as keyof typeof ERoles])}
          </span>
        </div>
        {user.role === "owner" && (
          <div className={styles.cardPoint}>
            <span className={styles.cardPointTitle}>{t("inn")}</span>
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
              {t("editData")}
            </Button>
          )}
          {user.role === "owner" && (
            <Button
              style={styles.btn}
              color="blue"
              onPress={() => navigate(ERoutes.subscriptionEdit)}
            >
              {t("manageSubscription")}
            </Button>
          )}
          {["owner", "administrator"].includes(user.role) && (
            <Button
              style={styles.btn}
              color="blue"
              onPress={() => navigate(ERoutes.admin)}
            >
              {t("adminPanel")}
            </Button>
          )}
        </>
      ) : (
        <>
          <div className={styles.confirmationWrapper}>
            <Input
              label={t("confirmationCode")}
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
              {t("sendCode")}
            </Button>
          </div>
          <Button style={styles.btn} color="blue" type="submit">
            {t("saveChanges")}
          </Button>
          <Button style={styles.btn} color="blue" onPress={cancel}>
            {t("cancelAction")}
          </Button>
          <div className={styles.supportTextWrapper}>
            <span className={styles.supportText}>{t("noAccessToEmail")}</span>
            <span
              className={styles.supportTextUnderlined}
              onClick={() => window.open(supportLink, "_blank")}
            >
              {t("contactTechSupport")}
            </span>
          </div>
        </>
      )}
    </form>
  );
};

export default Profile;
