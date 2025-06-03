import { useNavigate } from "react-router-dom";
import useAccountStore from "../../../store/useAccountStore";
import { FormEvent, useEffect, useState } from "react";
import { IErrors, initialErrors } from "./types";
import { EErrors } from "../../../constants/errors";
import { onError } from "../../../helpers/toast";
import styles from "./Admin.module.scss";
import Input from "../../atoms/Input/Input";
import InputPassword from "../../atoms/InputPassword";
import Button from "../../atoms/Button";
import Slider from "../../atoms/Slider";
import Dropdown from "../../atoms/Dropdown";
import GetReportModal from "../../organisms/GetReportModal";
import { ERoutes } from "../../../router/routes";
import { useAvailableRoles } from "../../../helpers/useAvailableRoles";
import { useAccountLimits } from "../../../helpers/useAccountLimits";
import { ERoles } from "../../../constants/roles";
import { useTranslation } from "react-i18next";
import useSensivityStore from "../../../store/useSensivityStore";
import useAuthStore from "../../../store/useAuthStore";
import { CircularProgress } from "@mui/material";

const Admin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { accounts, registerAccount, loading: accLoading } = useAccountStore();
  const { sensivity, editSensivity, getSensivity, loading } =
    useSensivityStore();
  const availableRoles = useAvailableRoles();
  const accountLimits = useAccountLimits();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });
  const [role, setRole] = useState<string>("user");
  const [isMainModalOpened, setIsMainModalOpened] = useState<boolean>(false);
  const [confidence, setConfidence] = useState<number>(0);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);

  const validate = (): boolean => {
    const newErrors: IErrors = {
      login: !login.trim() ? t(EErrors.required) : "",
      password: !password.trim()
        ? t(EErrors.required)
        : password.trim().length < 8
        ? t(EErrors.password)
        : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const createSubAccount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (accounts.length < accountLimits) {
      if (validate()) {
        registerAccount(login.trim(), password.trim(), role);
        setLogin("");
        setPassword("");
      } else {
        onError(t(EErrors.fields));
      }
    } else {
      onError(t("accountsLimitReached"));
    }
  };

  useEffect(() => {
    if (sensivity === null && user.id) {
      getSensivity();
    }
  }, [getSensivity, sensivity, user.id]);

  useEffect(() => {
    setConfidence(sensivity === null ? 0 : sensivity);
  }, [sensivity]);

  useEffect(() => {
    if (!userInteracted) return;

    const timeout = setTimeout(() => {
      editSensivity(confidence);
    }, 500);

    return () => clearTimeout(timeout);
  }, [confidence, editSensivity, userInteracted]);

  return (
    <div className={styles.adminWrapper}>
      <div className={styles.sliderWrapper}>
        <span className={styles.subTitle}>{t("networkConfidence")}</span>
        {loading || sensivity === null ? (
          <CircularProgress size="20px" />
        ) : (
          <Slider
            value={confidence}
            onChange={(value) => {
              setConfidence(value);
              setUserInteracted(true);
            }}
          />
        )}
      </div>
      <form className={styles.infoWrapper} onSubmit={createSubAccount}>
        <span className={styles.subTitle}>{t("subAccountRegistration")}</span>
        <div className={styles.inputs}>
          <Input
            label={t("login")}
            value={login}
            onChangeText={(login) => {
              setLogin(login);
              setErrors({ ...errors, login: "" });
            }}
            errorText={errors.login}
            maxLength={254}
            inputClassName={styles.confirmationInputWrapper}
            inputFieldClassName={styles.confirmationInput}
            labelClassName={styles.confirmationInputLabel}
          />
          <InputPassword
            label={t("password")}
            value={password}
            onChangeText={(password) => {
              setPassword(password);
              setErrors({ ...errors, password: "" });
            }}
            errorText={errors.password}
            inputClassName={styles.confirmationInputWrapper}
            inputFieldClassName={styles.confirmationInput}
            labelClassName={styles.confirmationInputLabel}
          />
          <Dropdown
            data={availableRoles.map((key) => ({
              value: key,
              label: t(ERoles[key as keyof typeof ERoles]),
            }))}
            value={role}
            setValue={setRole}
            label={t("role")}
            controlHeight="29px"
            iconScale={1.3}
            marginVertical="8px"
          />
        </div>
        <Button color="blue" style={styles.btn} type="submit">
          {t("createAccount")}
        </Button>
        <Button
          color="blue"
          style={styles.btn}
          onPress={() => setIsMainModalOpened(true)}
        >
          {t("manageReports")}
        </Button>
        <Button
          color="blue"
          style={styles.btn}
          onPress={() => navigate(ERoutes.accountManagement)}
        >
          {t("manageAccounts")}
        </Button>
        {accLoading || !accounts.length ? (
          <CircularProgress size="20px" />
        ) : (
          <span className={styles.statistics}>
            {accounts.length}/{accountLimits} {t("accountsCount")}
          </span>
        )}
      </form>
      <GetReportModal
        isOpen={isMainModalOpened}
        setIsOpen={setIsMainModalOpened}
      />
    </div>
  );
};

export default Admin;
