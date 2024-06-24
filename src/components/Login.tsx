import { FunctionComponent } from "react";
import UsernameField from "./UsernameField";
import styles from "./Login.module.css";

export type LoginType = {
  className?: string;
  onClose?: () => void;
};

const Login: FunctionComponent<LoginType> = ({ className = "", onClose }) => {
  return (
    <div className={[styles.login, className].join(" ")}>
      <h1 className={styles.cavotecConnectInsights}>
        Cavotec Connect Insights
      </h1>
      <UsernameField labelText="Username" />
      <UsernameField labelText="Password" />
      <div className={styles.insightsLink}>
        <div className={styles.link}>
          <div className={styles.clickMe}>Reset password</div>
        </div>
      </div>
      <div className={styles.loginButton}>
        <button className={styles.button}>
          <div className={styles.buttontext}>Login</div>
        </button>
      </div>
    </div>
  );
};

export default Login;
