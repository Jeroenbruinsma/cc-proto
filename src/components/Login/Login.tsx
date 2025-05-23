import { FunctionComponent, useCallback, useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { backendUrl, firstPageAfterLogin } from "../../config";
import axios from "axios";
import { useAuth } from "../../AuthProvider";
import * as Sentry from "@sentry/react";
import { useTranslation } from "react-i18next";

export type LoginType = {
  className?: string;
  onClose?: () => void;
  children?: React.ReactNode;
};

const Login: FunctionComponent<LoginType> = ({ className = "", children }) => {
  const [email, set_email ] = useState<string>("")
  const [password, set_password ] = useState<string>("")
  const { token, onLogin } = useAuth();
  const [ errorCode, set_errorCode ] = useState<undefined|string>(undefined);
  const { t } = useTranslation()
  const navigate = useNavigate()

  const loginLogic = useCallback(async () => {
    try {
      const url = `${backendUrl}/login`;
      const body = { email, password };
      const config = {
        timeout: 3000,
      };
      const res = await axios.post(url, body, config);
      if (res?.data?.token) {
        onLogin(res?.data?.token);
      }
    } catch (err: any) {
      Sentry.captureException(err);
      if (err?.code === 'ERR_NETWORK') {
        set_errorCode("no_server_connection_possible");
      } else if (err?.code === 'ECONNABORTED') {
        set_errorCode("no_server_connection_possible");
      } else if (err?.response?.data?.msg) {
        set_errorCode(err.response?.data?.msg);
      }
    }
  }, [email, password])

  useEffect(()=>{
    if(token){
      navigate(firstPageAfterLogin)
    }
    const localStorageToken = localStorage.getItem("token")
    if(localStorageToken){
      onLogin(localStorageToken)
    }
  },[])

  useEffect(()=>{set_errorCode(undefined)},[email,password])
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center"}}>
        <div className={[styles.login, className].join(" ")}>
        <img className={styles.logo} src="/cavotec_logo.png"/>
        <h1 className={styles.cavotecConnectInsights}>
          Cavotec Connect Insights
        </h1>
          <div className={[styles.usernameField, className].join(" ")}>
            <div className={styles.textfieldLabel}>
            <div className={styles.labeltext}>{"Username"}</div>
            <div className={styles.inputBackground}>
            <input className={styles.inputBox} 
                    value={email} 
                    onChange={(e:any) => set_email(e.target.value)} 
                    type="text" 
                    placeholder="Enter your username" />
          </div>
        </div>
      </div>
          <div className={[styles.usernameField, className].join(" ")}>
            <div className={styles.textfieldLabel}>
            <div className={styles.labeltext}>{"Password"}</div>
            <div className={styles.inputBackground}>
            <input className={styles.inputBox}  
                  value={password} 
                  onChange={(e:any) => set_password(e.target.value)} 
                  type="password" 
                  id="password"
                  placeholder="Enter your password" />
          </div>
        </div>
      </div>
      {errorCode ? <p className={styles.error}>{t(`login.error.${errorCode}`)}</p> : null}
        <div className={styles.insightsLink}>
          <div className={styles.link}>
            <div className={styles.clickMe}>Reset password</div>
          </div>
        </div>
        <div className={styles.loginButton}>
          <button className={styles.button} onClick={loginLogic}>
            <div className={styles.buttontext} >Login</div>
          </button>
        </div>
            {children}
      </div>
    </div>
  );
};

export default Login;
