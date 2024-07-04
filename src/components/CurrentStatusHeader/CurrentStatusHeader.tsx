import { FunctionComponent } from "react";
import SubsectionHeader from "../SubsectionHeader/SubsectionHeader";
import StatusIndicator from "../StatusIndicator/StatusIndicator";
import styles from "./CurrentStatusHeader.module.css";

export type CurrentStatusHeaderType = {
  className?: string;
  equipmentName: string
};

const CurrentStatusHeader: FunctionComponent<CurrentStatusHeaderType> = ({
  className = "",
  equipmentName
}) => {
  return (
    <section className={[styles.currentstatusheader, className].join(" ")}>
      <div className={styles.statusContent}>
        <div className={styles.statusContentInner}>
          <div className={styles.mmu02Wrapper}>
            <h1 className={styles.mmu02}>{equipmentName}</h1>
          </div>
        </div>
        <div className={styles.lastUpdated05006Jun202Wrapper}>
          <div className={styles.lastUpdated0500}>
            Last updated: 05:00, 6 Jun 2024
          </div>
        </div>
      </div>
      <SubsectionHeader title="Current status" />
      <div className={styles.currentinfo}>
        <div className={styles.duoindicator}>
          <StatusIndicator />
          <div className={styles.statusindicator}>
            <img
              className={styles.indicatorbolljumboIcon}
              alt=""
              src="/indicatorbolljumbo.svg"
            />
            <div className={styles.textframe}>
              <h3 className={styles.charging}>Scheduled Maintenace</h3>
              <div className={styles.parkedSince48}>Due for inspection</div>
            </div>
          </div>
        </div>
        <div className={styles.metadatainfoboxParent}>
          <div className={styles.metadatainfobox}>
            <div className={styles.serialNr234324322}>Serial nr: 234324321</div>
            <div className={styles.type400e}>Type: 400E</div>
            <div className={styles.manufacturedYr2001}>
              Manufactured yr: 2001
            </div>
            <div className={styles.commissionedYr2001}>
              Commissioned yr: 2001
            </div>
            <div className={styles.slaActive}>SLA Active : Yes</div>
            <div className={styles.slActiveSince}>SL Active since: 2002</div>
            <div className={styles.dataConsentYes}>Data consent: Yes</div>
          </div>
          <div className={styles.comm}>
            <div className={styles.serialNr}>Commissioned yr:</div>
            <div className={styles.serialNumber}>2002</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentStatusHeader;
