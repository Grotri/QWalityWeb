import { useNavigate } from "react-router-dom";
import useAccountStore from "../../../store/useAccountStore";
import { FormEvent, useState } from "react";
import { IErrors, initialErrors } from "./types";
import { EErrors } from "../../../constants/errors";
import { emailPattern } from "../../../constants/patterns";
import { IAccount } from "../../../model/account";
import { v4 as uuidv4 } from "uuid";
import { onError } from "../../../helpers/toast";
import styles from "./Admin.module.scss";
import Input from "../../atoms/Input/Input";
import InputPassword from "../../atoms/InputPassword";
import Button from "../../atoms/Button";
import Slider from "../../atoms/Slider";
import Dropdown from "../../atoms/Dropdown";
import { roles } from "../../../constants/roles";
import GetReportModal from "../../organisms/GetReportModal";

const Admin = () => {
  const navigate = useNavigate();
  const { accounts, addAccount } = useAccountStore();
  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });
  const [role, setRole] = useState<string>("0");
  const [isMainModalOpened, setIsMainModalOpened] = useState<boolean>(false);
  const [confidence, setConfidence] = useState<number>(0.75);

  const validate = (): boolean => {
    const newErrors: IErrors = {
      name: !name.trim() ? EErrors.required : "",
      login: !login.trim()
        ? EErrors.required
        : !emailPattern.test(login.trim())
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

  const createSubAccount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const account: IAccount = {
      id: uuidv4(),
      name,
      login,
      password,
      role,
    };
    if (validate()) {
      addAccount(account);
      setLogin("");
      setPassword("");
      setName("");
    } else {
      onError(EErrors.fields);
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
            label="Имя пользователя"
            value={name}
            onChangeText={(name) => {
              setName(name);
              setErrors({ ...errors, name: "" });
            }}
            errorText={errors.name}
            maxLength={254}
            inputClassName={styles.confirmationInputWrapper}
            inputFieldClassName={styles.confirmationInput}
            labelClassName={styles.confirmationInputLabel}
          />
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
            data={roles.map((role) => ({
              value: role.id,
              label: role.name,
            }))}
            value={role}
            setValue={setRole}
            label="Роль"
            controlHeight="29px"
            iconScale={1.3}
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
          onPress={() => navigate("AccountManagement")}
        >
          Управлять аккаунтами
        </Button>
        <span className={styles.statistics}>
          {accounts.length}/15 аккаунтов
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
