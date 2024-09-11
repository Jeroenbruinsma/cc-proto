import { FunctionComponent } from "react";
import styles from "./StatusIndicator.module.css";
import IndicatorBoll from './indicatorbolljumbo.svg';

export type StatusIndicatorType = {
  className?: string;
  text: string
  subtext: string
  indicatorBollColor: Function;
};

const StatusIndicator: FunctionComponent<StatusIndicatorType> = ({
  className = "",
  text,
  subtext,
  indicatorBollColor
}) => {
  return (
    <div className={[styles.statusindicator, className].join(" ")}>
      {/* @ts-ignore */}
      <IndicatorBoll fill={indicatorBollColor}/>
      <div className={styles.textframe}>
        <b className={styles.charging}>{text || "-"}</b>
        <div className={styles.parkedSince48}>{subtext || "-"}</div>
      </div>
    </div>
  );
};

export default StatusIndicator;
