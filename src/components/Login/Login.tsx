import { FunctionComponent } from "react";
import InputField from "../InputField/InputField";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export type LoginType = {
  className?: string;
  onClose?: () => void;
};

const Login: FunctionComponent<LoginType> = ({ className = "" }) => {
  const navigate = useNavigate()
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <img className={styles.logo} src="/cavotec_logo.png"/>
        <div className={[styles.login, className].join(" ")}>
        <h1 className={styles.cavotecConnectInsights}>
          Cavotec Connect Insights
        </h1>
        <InputField labelText="Username" />
        <InputField labelText="Password" />
        <div className={styles.insightsLink}>
          <div className={styles.link}>
            <div className={styles.clickMe}>Reset password</div>
          </div>
        </div>
        <div className={styles.loginButton}>
          <button className={styles.button}>
            <div className={styles.buttontext} onClick={()=> navigate("/sites")}>Login</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
