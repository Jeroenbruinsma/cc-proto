import { FunctionComponent } from "react";
import styles from "./DownloadsSection.module.css";

export type DownloadsSectionType = {
  className?: string;
};

const DownloadsSection: FunctionComponent<DownloadsSectionType> = ({
  className = "",
}) => {
  return (
    <section className={[styles.downloads, className].join(" ")}>
      <div className={styles.downloadsContent}>
        <div className={styles.subsectionHeader}>
          <div className={styles.titleplussince}>
            <b className={styles.kpiStatistics}>Downloads</b>
          </div>
          <div className={styles.lineframe}>
            <div className={styles.lineframeChild} />
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <b className={styles.serviceManuals}>{`Service manuals `}</b>
            <a
              className={styles.serviceCenterManager}
              href="https://cavonet.cavotec.com/.profile/ingebrigtsen"
              target="_blank"
            />
            <b className={styles.serviceManualV01023bContainer}>
              <ul className={styles.serviceManualV01023bRepai}>
                <li className={styles.serviceManualV01023b}>
                  Service manual V01.02.3B
                </li>
                <li className={styles.repairManualV01043f}>
                  Repair manual V01.04.3F
                </li>
              </ul>
            </b>
          </div>
          <div className={styles.middle}>
            <b className={styles.serviceReports}>{`Service Reports `}</b>
            <a
              className={styles.serviceCenterManager1}
              href="https://cavonet.cavotec.com/.profile/ingebrigtsen"
              target="_blank"
            />
            <b className={styles.serviceReportFebContainer}>
              <ul className={styles.serviceReportFeb2024Servic}>
                <li className={styles.serviceReportFeb}>
                  Service report Feb 2024
                </li>
                <li className={styles.serviceReportMay}>
                  Service report May 2023
                </li>
                <li className={styles.serviceReportOkt}>
                  Service report Okt 2022
                </li>
              </ul>
            </b>
          </div>
          <div className={styles.right}>
            <b className={styles.dataExportCsv}>Data export (csv)</b>
            <a
              className={styles.serviceCenterManager2}
              href="https://cavonet.cavotec.com/.profile/ingebrigtsen"
              target="_blank"
            />
            <b className={styles.alarmListServiceContainer}>
              <ul className={styles.alarmListServiceNeeds}>
                <li className={styles.alarmList}>Alarm list</li>
                <li className={styles.serviceNeeds}>{`Service needs `}</li>
              </ul>
            </b>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
