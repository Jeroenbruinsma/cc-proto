import { FunctionComponent } from "react";
import styles from "./SubsectionHeader.module.css";

export type SubsectionHeaderType = {
  className?: string;
  title: string
  center?: boolean
};

const SubsectionHeader: FunctionComponent<SubsectionHeaderType> = ({
  className = "",
  title,
  center =  false
}) => {
  return (
    <div className={[styles.subsectionHeader, className].join(" ")}>
      <div className={styles.titleplussince}>
        <b style={{textAlign: center ? "center": "left"}} className={styles.kpiStatistics}>{title}</b>
      </div>
      <div className={styles.lineframe}>
        <div className={styles.lineframeChild} />
      </div>
    </div>
  );
};

export default SubsectionHeader;
