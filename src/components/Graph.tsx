import { FunctionComponent } from "react";
import styles from "./Graph.module.css";

export type GraphType = {
  className?: string;
};

const Graph: FunctionComponent<GraphType> = ({ className = "" }) => {
  return (
    <section className={[styles.graph, className].join(" ")}>
      <div className={styles.subsectionHeader}>
        <div className={styles.titleplussince}>
          <b className={styles.kpiStatistics}>
            KPI Statistics - Unit Availability
          </b>
          <div className={styles.sinceDropdown}>
            <div className={styles.sinceDropdownInner}>
              <img
                className={styles.frameChild}
                loading="lazy"
                alt=""
                src="/polygon-11.svg"
              />
            </div>
            <div className={styles.months}> 12 months</div>
          </div>
        </div>
        <div className={styles.lineframe}>
          <div className={styles.lineframeChild} />
        </div>
      </div>
      <img
        className={styles.screenshot20240423At1544}
        loading="lazy"
        alt=""
        src="/screenshot-20240423-at-1544-1@2x.png"
      />
    </section>
  );
};

export default Graph;
