import useAccountStore from "../../../store/useAccountStore";
import { SyntheticEvent, useEffect, useState } from "react";
import styles from "./AccountManagement.module.scss";
import { BottomIcon, ProfileIcon } from "../../../assets/icons";
import Input from "../../atoms/Input/Input";
import InputPassword from "../../atoms/InputPassword";
import Dropdown from "../../atoms/Dropdown";
import Button from "../../atoms/Button";
import {
  CustomAccordion,
  CustomAccordionDetails,
  CustomAccordionSummary,
} from "./styles";
import SupportContent from "../../atoms/SupportContent";
import { IUser } from "../../../model/user";
import { useAvailableRoles } from "../../../helpers/useAvailableRoles";
import useAuthStore from "../../../store/useAuthStore";

const AccountManagement = () => {
  const {
    accounts,
    fetchAccounts,
    changeAccount,
    deleteAccount,
    errors,
    changeError,
    refreshErrors,
  } = useAccountStore();
  const { user } = useAuthStore();
  const availableRoles = useAvailableRoles();
  const [activeSection, setActiveSection] = useState<string | false>(false);
  const [sections, setSections] = useState<IUser[]>([...accounts]);

  const handleSectionChange =
    (section: string) => (_: SyntheticEvent, newExpanded: boolean) => {
      setActiveSection(newExpanded ? section : false);
    };

  const changeAccountField = (
    id: string,
    field: keyof IUser,
    value: string
  ) => {
    setSections(
      sections.map((account) =>
        account.id === id ? { ...account, [field]: value } : account
      )
    );
  };

  useEffect(() => {
    setSections([...accounts]);
  }, [accounts]);

  useEffect(() => {
    refreshErrors();
  }, [refreshErrors]);

  useEffect(() => {
    if (!accounts.length) {
      fetchAccounts(user.role);
    }
  }, []);

  return (
    <div className={styles.managerWrapper}>
      {accounts.length > 0 ? (
        sections.map((section, index: number) => {
          const error = errors[index] || { login: "", password: "" };
          const initialUser = accounts.find(
            (account) => account.id === section.id
          );

          return (
            <CustomAccordion
              key={section.id}
              expanded={activeSection === section.id}
              onChange={handleSectionChange(section.id)}
            >
              <CustomAccordionSummary
                expandIcon={<BottomIcon scale={2} stroke={1.5} />}
              >
                <div className={styles.header}>
                  <ProfileIcon
                    width={42}
                    stroke={9}
                    style={styles.profileIcon}
                  />
                  <span className={styles.headerText}>
                    {initialUser?.login}
                  </span>
                </div>
              </CustomAccordionSummary>
              <CustomAccordionDetails>
                <div className={styles.content}>
                  <div className={styles.fields}>
                    <Input
                      label="Логин"
                      value={section.login}
                      onChangeText={(login) => {
                        changeAccountField(section.id, "login", login);
                        changeError(index, "login", "");
                      }}
                      errorText={error.login}
                      inputClassName={styles.input}
                      labelClassName={styles.inputLabel}
                      inputFieldClassName={styles.inputField}
                      errorClassName={styles.inputError}
                    />
                    <InputPassword
                      label="Пароль"
                      value={section.password}
                      onChangeText={(password) => {
                        changeAccountField(section.id, "password", password);
                        changeError(index, "password", "");
                      }}
                      errorText={error.password}
                      inputClassName={styles.input}
                      labelClassName={styles.inputLabel}
                      inputFieldClassName={styles.inputField}
                      errorClassName={styles.inputError}
                      iconSize={20}
                    />
                    <Dropdown
                      data={availableRoles}
                      value={section.role}
                      setValue={(role) =>
                        changeAccountField(section.id, "role", role)
                      }
                      label="Роль"
                      controlHeight="24px"
                      marginHorizontal="10px"
                      marginVertical="6px"
                    />
                  </div>
                  <div className={styles.btns}>
                    <Button
                      color="management"
                      style={styles.btn}
                      onPress={() =>
                        changeAccount(index, {
                          id: section.id,
                          login: section.login.trim(),
                          password: section.password.trim(),
                          role: section.role,
                        })
                      }
                    >
                      Изменить
                    </Button>
                    <Button
                      color="red"
                      style={styles.btn}
                      onPress={() => {
                        deleteAccount(index);
                        setActiveSection(false);
                      }}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              </CustomAccordionDetails>
            </CustomAccordion>
          );
        })
      ) : (
        <SupportContent message="У вас нет управляемых аккаунтов" />
      )}
    </div>
  );
};

export default AccountManagement;
