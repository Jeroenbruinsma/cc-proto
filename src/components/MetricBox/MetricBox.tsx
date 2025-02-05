import { FunctionComponent } from "react";
import styles from "./MetricBox.module.css";

export type MetricBoxType = {
  className?: string;
  metricName: string;
  metricValue: string;
  secondMetricValue?: string
  onMetricBoxContainerClick?: () => void;
};

const MetricBox: FunctionComponent<MetricBoxType> = ({
  className = "",
  metricName,
  metricValue,
  secondMetricValue,
  onMetricBoxContainerClick,
}) => {
  return (
    <div
      className={[styles.metricBox, className].join(" ")}
      onClick={onMetricBoxContainerClick}
    >
      <div className={[styles.metricBackground].join(" ")} />
      <b className={styles.metricName}>{metricName}</b>
      {secondMetricValue ? 
      <b className={styles.metricValue}>{metricValue} | {secondMetricValue}</b> : 
      <b className={styles.metricValue}>{metricValue} </b> 
      }
    </div>
  );
};

export default MetricBox;
