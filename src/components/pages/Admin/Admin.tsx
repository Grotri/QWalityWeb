import { useNavigate } from "react-router-dom";
import useAccountStore from "../../../store/useAccountStore";
import { FormEvent, useState } from "react";
import { IErrors, initialErrors } from "./types";
import { EErrors } from "../../../constants/errors";
import { v4 as uuidv4 } from "uuid";
import { onError } from "../../../helpers/toast";
import styles from "./Admin.module.scss";
import Input from "../../atoms/Input/Input";
import InputPassword from "../../atoms/InputPassword";
import Button from "../../atoms/Button";
import Slider from "../../atoms/Slider";
import Dropdown from "../../atoms/Dropdown";
import GetReportModal from "../../organisms/GetReportModal";
import { ERoutes } from "../../../router/routes";
import { IUser } from "../../../model/user";
import { useAvailableRoles } from "../../../helpers/useAvailableRoles";
import { useAccountLimits } from "../../../helpers/useAccountLimits";
import { ERoles } from "../../../constants/roles";

const Admin = () => {
  const navigate = useNavigate();
  const { accounts, registerAccount } = useAccountStore();
  const availableRoles = useAvailableRoles();
  const accountLimits = useAccountLimits();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });
  const [role, setRole] = useState<string>("user");
  const [isMainModalOpened, setIsMainModalOpened] = useState<boolean>(false);
  const [confidence, setConfidence] = useState<number>(0.75);

  const validate = (): boolean => {
    const newErrors: IErrors = {
      login: !login.trim() ? EErrors.required : "",
      password: !password.trim()
        ? EErrors.required
        : password.trim().length < 8
        ? EErrors.password
        : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const createSubAccount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (accounts.length < accountLimits) {
      const account: IUser = {
        id: uuidv4(),
        login: login.trim(),
        password: password.trim(),
        role,
        theme: "dark",
        fontSize: "default",
      };
      if (validate()) {
        registerAccount(account);
        setLogin("");
        setPassword("");
      } else {
        onError(EErrors.fields);
      }
    } else {
      onError("Достигнут лимит аккаунтов");
    }
  };

  return (
    <div className={styles.adminWrapper}>
      <div className={styles.sliderWrapper}>
        <span className={styles.subTitle}>Уверенность нейросети</span>
        <Slider value={confidence} onChange={setConfidence} />
      </div>
      <form className={styles.infoWrapper} onSubmit={createSubAccount}>
        <span className={styles.subTitle}>Регистрация суб-аккаунта</span>
        <div className={styles.inputs}>
          <Input
            label="Логин"
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
            label="Пароль"
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
              label: ERoles[key as keyof typeof ERoles],
            }))}
            value={role}
            setValue={setRole}
            label="Роль"
            controlHeight="29px"
            iconScale={1.3}
            marginVertical="8px"
          />
        </div>
        <Button color="blue" style={styles.btn} type="submit">
          Создать аккаунт
        </Button>
        <Button
          color="blue"
          style={styles.btn}
          onPress={() => setIsMainModalOpened(true)}
        >
          Управлять отчетами
        </Button>
        <Button
          color="blue"
          style={styles.btn}
          onPress={() => navigate(ERoutes.accountManagement)}
        >
          Управлять аккаунтами
        </Button>
        <span className={styles.statistics}>
          {accounts.length}/{accountLimits} аккаунтов
        </span>
      </form>
      <GetReportModal
        isOpen={isMainModalOpened}
        setIsOpen={setIsMainModalOpened}
      />
    </div>
  );
};

export default Admin;
