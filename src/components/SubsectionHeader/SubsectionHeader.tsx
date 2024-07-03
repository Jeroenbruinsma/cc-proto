import { FunctionComponent } from "react";
import styles from "./SubsectionHeader.module.css";

export type SubsectionHeaderType = {
  className?: string;
};

const SubsectionHeader: FunctionComponent<SubsectionHeaderType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.subsectionHeader, className].join(" ")}>
      <div className={styles.titleplussince}>
        <b className={styles.kpiStatistics}>Current Status</b>
      </div>
      <div className={styles.lineframe}>
        <div className={styles.lineframeChild} />
      </div>
    </div>
  );
};

export default SubsectionHeader;
