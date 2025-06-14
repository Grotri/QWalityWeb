import styles from "./SubscriptionChange.module.scss";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import SliderCard from "../../organisms/SliderCard";
import { ERoutes } from "../../../router/routes";
import { onError, onSuccess } from "../../../helpers/toast";
import Button from "../../atoms/Button";
import {
  accountLimits,
  cameraLimits,
  ISubscription,
  subscriptions,
} from "../../../constants/subscriptions";
import useCamerasStore from "../../../store/useCamerasStore";
import useAccountStore from "../../../store/useAccountStore";
import { getAllowedRolesBySubscription } from "../../../helpers/getAllowedRolesBySubscription";
import { useTranslation } from "react-i18next";

const SubscriptionChange = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, handleDemoLicense, logout } = useAuthStore();
  const { cameras } = useCamerasStore();
  const { accounts, clearAccounts } = useAccountStore();

  const handleChangeSubscription = (sliderId: string) => {
    const camerasLimit = cameraLimits[sliderId];
    const accountLimit = accountLimits[sliderId];
    const allowedRoles = getAllowedRolesBySubscription(sliderId);

    const hasTooManyAccounts = accountLimit < accounts.length;
    const hasTooManyCameras =
      camerasLimit < cameras.filter((c) => !c.deletedAt).length;
    const invalidAccounts = accounts.filter(
      (account) => !allowedRoles.includes(account.role)
    );

    if (hasTooManyAccounts) {
      onError(t("cannotSwitchPlanDueToSubAccounts"), 2000);
    } else if (hasTooManyCameras) {
      onError(t("cannotSwitchPlanDueToCameras"), 2000);
    } else if (invalidAccounts.length > 0) {
      const rolesList = [...new Set(invalidAccounts.map((a) => a.role))].join(
        ", "
      );
      onError(
        `${t("cannotSwitchPlanDueToRoles")}: ${rolesList}, ${t(
          "rolesNotAllowedInPlan"
        )}`,
        3000
      );
    } else {
      if (sliderId === "0") {
        handleDemoLicense(() => {
          navigate(ERoutes.profile);
          onSuccess(t("subscriptionLevelChanged"), 2000);
        });
      } else {
        navigate(`${ERoutes.subscriptionEdit}${ERoutes.payment}/${sliderId}`);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {subscriptions.map((slider: ISubscription) => (
          <SliderCard
            key={slider.id}
            id={slider.id}
            currentId={user.subscription ? +user.subscription : undefined}
            title={slider.title}
            description={slider.description}
            radioLabels={slider.radioLabels}
            price={slider.price}
            onPress={() => {
              handleChangeSubscription(slider.id.toString());
            }}
          />
        ))}
      </div>
      <Button
        color="welcomeBlue"
        style={styles.cancelBtn}
        onPress={() => {
          logout(clearAccounts);
        }}
      >
        {t("cancelSubscription")}
      </Button>
    </div>
  );
};

export default SubscriptionChange;
