import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./KpiBox.module.css";

export type KpiBoxType = {
  className?: string;
};

const KpiBox: FunctionComponent<KpiBoxType> = ({ className = "" }) => {
  const navigate = useNavigate();

  const onMetricBoxContainerClick = useCallback(() => {
    navigate("/kpi-graph-page-ua");
  }, [navigate]);

  const onMetricBoxContainerClick1 = useCallback(() => {
    // Please sync "KPI graph page-mtbf" to the project
  }, []);

  const onMetricBoxContainerClick2 = useCallback(() => {
    // Please sync "KPI graph page-performance" to the project
  }, []);

  const onMetricBoxContainerClick3 = useCallback(() => {
    // Please sync "KPI graph page-util" to the project
  }, []);

  const onMetricBoxContainerClick4 = useCallback(() => {
    // Please sync "KPI graph page-bdu" to the project
  }, []);

  return (
    <div className={[styles.kpiBox, className].join(" ")}>
      <div className={styles.metricBox} onClick={onMetricBoxContainerClick}>
        <div className={styles.metricBackground} />
        <b className={styles.unitAvailability}>Unit availability</b>
        <b className={styles.metricValue}>95%</b>
      </div>
      <div className={styles.metricBox1} onClick={onMetricBoxContainerClick1}>
        <div className={styles.metricBoxChild} />
        <b className={styles.unitAvailability1}>Unit MTBF</b>
        <b className={styles.b}>14,6 days</b>
      </div>
      <div className={styles.metricBox2} onClick={onMetricBoxContainerClick2}>
        <div className={styles.metricBoxItem} />
        <b className={styles.unitAvailability2}>Unit performance</b>
        <b className={styles.b1}>98%</b>
      </div>
      <div className={styles.metricBox3} onClick={onMetricBoxContainerClick3}>
        <div className={styles.metricBoxInner} />
        <b className={styles.unitAvailability3}>Unit utilization</b>
        <b className={styles.b2}>99%</b>
      </div>
      <div className={styles.metricBox4} onClick={onMetricBoxContainerClick4}>
        <div className={styles.rectangleDiv} />
        <b className={styles.unitAvailability4}>BDU availability</b>
        <b className={styles.b3}>97%</b>
      </div>
      <div className={styles.metricNavigation}>
        <div className={styles.doubleArrow}>
          <div className={styles.singleArrowright}>
            <img
              className={styles.singleArrowrightChild}
              loading="lazy"
              alt=""
              src="/vector-20.svg"
            />
            <img
              className={styles.singleArrowrightItem}
              loading="lazy"
              alt=""
              src="/vector-20.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiBox;
