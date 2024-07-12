import { FunctionComponent } from "react";
import SubsectionHeader from "../SubsectionHeader/SubsectionHeader";
import StatusIndicator from "../StatusIndicator/StatusIndicator";
import styles from "./CurrentStatusHeader.module.css";
import { equipmentDataType } from "../../pages/UnitDetailsPage";
import { capitalizeFirstLetter } from "../../helpers";

export type CurrentStatusHeaderType = {
  className?: string;
  equipmentName: string
  data: equipmentDataType | undefined
};

const CurrentStatusHeader: FunctionComponent<CurrentStatusHeaderType> = ({
  className = "",
  equipmentName,
  data
}) => {

if(!data) return "loading"
  return (
    <section className={[styles.currentstatusheader, className].join(" ")}>
      <div className={styles.statusContent}>
        <div className={styles.statusContentInner}>
          <div className={styles.mmu02Wrapper}>
            <h1 className={styles.mmu02}>{equipmentName}</h1>
          </div>
        </div>
      </div>
      <SubsectionHeader title="Current status" />
      <div className={styles.currentinfo}>
        <div className={styles.duoindicator}>
          <StatusIndicator />
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
            <div className={styles.serialNr234324322}>
              Serial nr: {data?.SerialNumber}</div>
            <div className={styles.manufacturedYr2001}>
              Installation yr: {data?.YearOfInstallation__c}
            </div>
            <div className={styles.slaActive}>
              SLA Active : {capitalizeFirstLetter(data?.ServiceAgreement__c)}</div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentStatusHeader;
