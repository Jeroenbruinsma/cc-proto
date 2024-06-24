import { FunctionComponent } from "react";
import styles from "./UsernameField.module.css";

export type UsernameFieldType = {
  className?: string;
  labelText?: string;
};

const UsernameField: FunctionComponent<UsernameFieldType> = ({
  className = "",
  labelText,
}) => {
  return (
    <div className={[styles.usernameField, className].join(" ")}>
      <div className={styles.textfieldLabel}>
        <div className={styles.labeltext}>{labelText}</div>
        <div className={styles.inputBackground}>
          <div className={styles.inputBox} />
        </div>
      </div>
    </div>
  );
};

export default UsernameField;
