import { FunctionComponent } from "react";
import styles from "./StatusIndicator.module.css";

export type StatusIndicatorType = {
  className?: string;
};

const StatusIndicator: FunctionComponent<StatusIndicatorType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.statusindicator, className].join(" ")}>
      <img
        className={styles.indicatorbolljumboIcon}
        loading="lazy"
        alt=""
        src="/indicatorbolljumbo.svg"
      />
      <div className={styles.textframe}>
        <b className={styles.charging}>Parked</b>
        <div className={styles.parkedSince48}>since 48 hrs</div>
      </div>
    </div>
  );
};

export default StatusIndicator;
