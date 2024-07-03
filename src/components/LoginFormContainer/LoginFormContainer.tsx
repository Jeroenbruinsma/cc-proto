import { FunctionComponent } from "react";
import Login from "../Login/Login";
import styles from "./LoginFormContainer.module.css";

export type LoginFormContainerType = {
  className?: string;
};

const LoginFormContainer: FunctionComponent<LoginFormContainerType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.loginFormContainer, className].join(" ")}>
      <Login />
    </div>
  );
};

export default LoginFormContainer;
