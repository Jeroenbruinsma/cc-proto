import { FunctionComponent } from "react";
import Login from "../Login/Login";
import styles from "./LoginFormContainer.module.css";
import { useTranslation } from "react-i18next";

export type LoginFormContainerType = {
  className?: string;
  sessionExpired?: boolean;
};

const LoginFormContainer: FunctionComponent<LoginFormContainerType> = ({
  className = "",
  sessionExpired
}) => {
  const {t} = useTranslation()
  return (
    <div className={[styles.loginFormContainer, className].join(" ")}>
      <Login>
      { sessionExpired ? <div className={styles.loginFormErrors}>
        <p className={styles.loginFormErrorsText}> {t("login.session.expired")}</p>
      </div> :null}
      </Login>
    </div>
  );
};

export default LoginFormContainer;
