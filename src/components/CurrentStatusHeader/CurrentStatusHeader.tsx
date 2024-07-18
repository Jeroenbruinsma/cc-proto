import { FunctionComponent } from "react";
import SubsectionHeader from "../SubsectionHeader/SubsectionHeader";
import StatusIndicator from "../StatusIndicator/StatusIndicator";
import styles from "./CurrentStatusHeader.module.css";
import { capitalizeFirstLetter } from "../../helpers";
import moment from 'moment-timezone'
import { equipmentDataType, stateType } from "../../types/equipment";


export type CurrentStatusHeaderType = {
  className?: string;
  equipmentName: string
  metaData: equipmentDataType | undefined
  stateInfo: stateType | undefined
};

const CurrentStatusHeader: FunctionComponent<CurrentStatusHeaderType> = ({
  className = "",
  equipmentName,
  metaData,
  stateInfo
}) => {

const parseDate = (state: stateType)=> {
  if(!state?.time) return ""
  if(!state?.state_start) return ""
  
  const start = moment(state.state_start)
  const end = moment(state?.time)
  return `Since ${moment.duration(end.diff(start)).humanize()}`
}

if(!metaData || !stateInfo) return "loading"
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
          <StatusIndicator text={stateInfo?.state_str || "" } subtext={parseDate(stateInfo)}/>
          {/* <StatusIndicator text="Scheduled Maintenace" subtext="Due for inspection"/> */}
        </div>
        <div className={styles.metadatainfoboxParent}>
          <div className={styles.metadatainfobox}>
            <div className={styles.serialNr234324322}>
              Serial nr: {metaData?.SerialNumber}</div>
            <div className={styles.manufacturedYr2001}>
              Installation yr: {metaData?.YearOfInstallation__c}
            </div>
            <div className={styles.slaActive}> SLA Active : {capitalizeFirstLetter(metaData?.ServiceAgreement__c)}</div>
            <div className={styles.slaActive}>Customer: {metaData?.["Account.Name"]}</div>
            <div className={styles.slaActive}>Country: {metaData?.EndUserCountry__c}</div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentStatusHeader;
