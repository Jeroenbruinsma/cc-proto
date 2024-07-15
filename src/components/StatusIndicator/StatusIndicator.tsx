import { FunctionComponent } from "react";
import styles from "./StatusIndicator.module.css";

export type StatusIndicatorType = {
  className?: string;
  text: string
  subtext: string 
};

const StatusIndicator: FunctionComponent<StatusIndicatorType> = ({
  className = "",
  text,
  subtext
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
        <b className={styles.charging}>{text}</b>
        <div className={styles.parkedSince48}>{subtext}</div>
      </div>
    </div>
  );
};

export default StatusIndicator;
