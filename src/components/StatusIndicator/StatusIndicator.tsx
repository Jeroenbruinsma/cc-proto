import { FunctionComponent } from "react";
import styles from "./StatusIndicator.module.css";
import IndicatorBoll from './indicatorbolljumbo.svg';

export type StatusIndicatorType = {
  className?: string;
  text: string
  subText: string
  subSubText?: string
  indicatorBollColor: string;
};

const StatusIndicator: FunctionComponent<StatusIndicatorType> = ({
  className = "",
  text,
  subText,
  indicatorBollColor
}) => {
  return (
    <div className={[styles.statusindicator, className].join(" ")}>
      {/* @ts-ignore */}
      <IndicatorBoll fill={indicatorBollColor}/>
      <div className={styles.textframe}>
        <b className={styles.charging}>{text || "-"}</b>
        <div className={styles.subText}>{subText || "-"}</div>
        {/* <div className={styles.subSubText}>{subSubText || ""}</div> */}
      </div>
    </div>
  );
};

export default StatusIndicator;
