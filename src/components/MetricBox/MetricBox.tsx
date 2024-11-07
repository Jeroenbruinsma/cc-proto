import { FunctionComponent } from "react";
import styles from "./MetricBox.module.css";

export type MetricBoxType = {
  className?: string;
  unitAvailability: string;
  metricValue: string;

  /** Action props */
  onMetricBoxContainerClick?: () => void;
};

const MetricBox: FunctionComponent<MetricBoxType> = ({
  className = "",
  unitAvailability,
  metricValue,
  onMetricBoxContainerClick,
}) => {
  return (
    <div
      className={[styles.metricBox, className].join(" ")}
      onClick={onMetricBoxContainerClick}
    >
      <div className={[styles.metricBackground].join(" ")} />
      <b className={styles.unitAvailability}>{unitAvailability}</b>
      <b className={styles.metricValue}>{metricValue}</b>
    </div>
  );
};

export default MetricBox;
