import { FunctionComponent } from "react";
import styles from "./LocationInfoSection.module.css";

export type LocationInfoSectionType = {
  className?: string;
};

const LocationInfoSection: FunctionComponent<LocationInfoSectionType> = ({
  className = "",
}) => {
  return (
    <section className={[styles.locationInfo, className].join(" ")}>
      <div className={styles.subsectionHeader}>
        <div className={styles.titleplussince}>
          <b className={styles.kpiStatistics}>Service Center info</b>
        </div>
        <div className={styles.lineframe}>
          <div className={styles.lineframeChild} />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <b className={styles.cavotecNorway}>
            <span>Cavotec</span>
            <span className={styles.span}>{` `}</span>
            <span>Norway</span>
          </b>
          <b className={styles.serviceCenterManagerContainer}>
            <span>Service center manager</span>
            <span className={styles.rjanIngebrigtsen}>
              : Ørjan Ingebrigtsen
            </span>
          </b>
          <div className={styles.gevinglia1127517Container}>
            <p className={styles.gevinglia112}>Gevinglia 112</p>
            <p className={styles.hell}>{`7517 Hell `}</p>
            <p className={styles.norway}>Norway</p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.image32Wrapper}>
            <img className={styles.image32Icon} alt="" src="/image-32@2x.png" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationInfoSection;
