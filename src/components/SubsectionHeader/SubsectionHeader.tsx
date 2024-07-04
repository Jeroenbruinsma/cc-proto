import { FunctionComponent } from "react";
import styles from "./SubsectionHeader.module.css";

export type SubsectionHeaderType = {
  className?: string;
  title: string
};

const SubsectionHeader: FunctionComponent<SubsectionHeaderType> = ({
  className = "",
  title,
}) => {
  return (
    <div className={[styles.subsectionHeader, className].join(" ")}>
      <div className={styles.titleplussince}>
        <b className={styles.kpiStatistics}>{title}</b>
      </div>
      <div className={styles.lineframe}>
        <div className={styles.lineframeChild} />
      </div>
    </div>
  );
};

export default SubsectionHeader;
