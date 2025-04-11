import { FunctionComponent, useCallback, useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { backendUrl, firstPageAfterLogin } from "../../config";
import axios from "axios";
import { useAuth } from "../../AuthProvider";

export type LoginType = {
  className?: string;
  onClose?: () => void;
};

const Login: FunctionComponent<LoginType> = ({ className = "" }) => {
  const [email, set_email ] = useState<string>("")
  const [password, set_password ] = useState<string>("")
  const { token, onLogin } = useAuth();
  const navigate = useNavigate()

  const loginLogic =  useCallback( async () => {
    try {
      
      const url = `${backendUrl}/login`;
      const body = {email, password}
      const res = await axios.post(url, body ) 
      if(res?.data?.token){
        onLogin(res?.data?.token)
  
      }
    } catch (err) {
      console.log("err", err);
    }
  }, [email, password])

  useEffect(()=>{
    if(token){
      navigate(firstPageAfterLogin)
    }
  },[])
 
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <img className={styles.logo} src="/cavotec_logo.png"/>
        <div className={[styles.login, className].join(" ")}>
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
      </div>
    </div>
  );
};

export default Login;
