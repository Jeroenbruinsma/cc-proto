import { FunctionComponent } from "react";
import styles from "./LoadingIndicator.module.css";


export type LoadingIndicatorProps = {
  className?: string;
};

const LoadingIndicator: FunctionComponent<LoadingIndicatorProps> = ({
}) => {
  return (
    <div className={styles.loadingIndicator}>
    <div className={styles.loadingIndicatorWrapper}>
      <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <circle className={styles.spin2} cx="400" cy="400" fill="none"
        r="217" stroke-width="46" stroke="#0091D3"
        stroke-dasharray="670 1400"
        stroke-linecap="round" />
        </svg>
    </div>
    </div>
  );
};

export default LoadingIndicator;
