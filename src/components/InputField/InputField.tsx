import { FunctionComponent } from "react";
import styles from "./InputField.module.css";

export type InputFieldType = {
  className?: string;
  labelText?: string;
};

const InputField: FunctionComponent<InputFieldType> = ({
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

export default InputField;
