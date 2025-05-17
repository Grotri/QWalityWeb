import { SyntheticEvent, useState } from "react";
import { questions } from "../../../constants/questions";
import BottomFixIcon from "../../molecules/BottomFixIcon";
import styles from "./FAQ.module.scss";
import {
  CustomAccordion,
  CustomAccordionDetails,
  CustomAccordionSummary,
} from "./styles";
import { BottomIcon, MessageIcon } from "../../../assets/icons";
import SupportContent from "../../atoms/SupportContent";
import { supportLink } from "../../../constants/support";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string | false>(false);

  const handleSectionChange =
    (section: string) => (_: SyntheticEvent, newExpanded: boolean) => {
      setActiveSection(newExpanded ? section : false);
    };

  return (
    <div className={styles.wrapper}>
      {questions.length > 0 ? (
        questions.map((question) => (
          <CustomAccordion
            key={question.id}
            expanded={activeSection === question.id}
            onChange={handleSectionChange(question.id)}
          >
            <CustomAccordionSummary expandIcon={<BottomIcon scale={2} />}>
              <span className={styles.headerText}>{question.title}</span>
            </CustomAccordionSummary>
            <CustomAccordionDetails>
              <div className={styles.content}>
                <span className={styles.contentText}>{question.answer}</span>
              </div>
            </CustomAccordionDetails>
          </CustomAccordion>
        ))
      ) : (
        <SupportContent message={t("emptyHere")} />
      )}
      <BottomFixIcon
        icon={<MessageIcon style={styles.messageIcon} />}
        text={t("contactSupport")}
        onPress={() => window.open(supportLink, "_blank")}
      />
    </div>
  );
};

export default FAQ;
