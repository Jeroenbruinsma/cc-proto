import { FunctionComponent } from "react";
import SubsectionHeader from "../SubsectionHeader/SubsectionHeader";
import StatusIndicator from "../StatusIndicator/StatusIndicator";
import styles from "./CurrentStatusHeader.module.css";
import { capitalizeFirstLetter, dayMonthTime, onlyYear, parseWarranty, yesOrNo } from "../../helpers";
import moment from 'moment-timezone'
import { equipmentDataType, functionalStatusType, stateType } from "../../types/equipment";
import { useTranslation } from "react-i18next";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { functionalStateToColor, stateToColor } from "./ColorMapping";


export type CurrentStatusHeaderType = {
  className?: string;
  equipmentName: string
  metaData: equipmentDataType | undefined
  operationalStateInfo: stateType | undefined
  functionalStateInfo: functionalStatusType | undefined
  small?: boolean
};

interface MetaElementProps {
  topic: string
  value: string | number | undefined

}
const MetaElement : FunctionComponent<MetaElementProps> = ({topic, value}) => {
  return (
    <tr  className={styles.MetaElement} >
      <td style={{width: "150px"}}>{topic}</td>
      <td>:</td>
      <td  style={{width: "200px"}}>{value}</td>
    </tr>
  )
} 

const CurrentStatusHeader: FunctionComponent<CurrentStatusHeaderType> = ({
  className = "",
  equipmentName,
  metaData,
  operationalStateInfo,
  functionalStateInfo,
  small
}) => {
  const {t} = useTranslation()

  const parseDate = (state: stateType | undefined)=> {
    if(!state?.time) return ""
    if(!state?.state_start) return ""
    
    const start = moment(state.state_start)
    const end = moment(state?.time)
    return `Since ${moment.duration(end.diff(start)).humanize()}`
  }

 

    return (
      <section className={[styles.currentstatusheader, className, small ? styles.small : ""].join(" ")}>
        <div className={styles.statusContent}>
          <div className={styles.statusContentInner}>
            <div className={styles.mmu02Wrapper}>
              <h1 className={styles.mmu02}>{equipmentName}</h1>
            </div>
          </div>
        </div>

        {!small ? <SubsectionHeader title="Current status" /> : null}
        {!small  ? <div className={styles.currentinfo}>
          <div className={styles.duoindicator}>
          { !operationalStateInfo ? <LoadingIndicator/> : 
              <StatusIndicator  text={operationalStateInfo?.state_str || "-" } 
                                subText={parseDate(operationalStateInfo)} 
                                subSubText={`(${dayMonthTime(operationalStateInfo?.local_site_time,t)} ${t("table.columnNames.siteLocalTime")})`} 
                                indicatorBollColor={stateToColor(operationalStateInfo?.state, metaData?.asset_CoreSystem__c)}/>
          }
            <StatusIndicator 
                                text={`${t(`functionalStatus.${functionalStateInfo?.func_status_name}`) || "-"}`}
                                subText={" "}
                                indicatorBollColor={functionalStateToColor(functionalStateInfo?.func_status_name)}
                                />
          </div>
          <div className={styles.metadatainfoboxParent}>
            <div className={styles.metadatainfobox}>
            {!metaData ? <LoadingIndicator/> : 
              <table>
                <MetaElement topic={t("table.columnNames.serialNo")} value={metaData?.asset_SerialNumber || "-"} />
                <MetaElement topic={t("table.columnNames.installationYear")} value={metaData?.asset_YearOfInstallation__c || "-"} />
                <MetaElement topic={t("table.columnNames.slaActive")} value={capitalizeFirstLetter(metaData?.asset_ServiceAgreement__c || "-")} />
                {/* <MetaElement topic={t("table.columnNames.slaActiveSince")} value={capitalizeFirstLetter(metaData?.ServiceAgreement__c || "-")} /> */}
                <MetaElement topic={t("table.columnNames.commissionedYear")} value={onlyYear(metaData?.asset_WarrantyStartingDate__c || "-")} />
                <MetaElement topic={t("table.columnNames.dataConsent")} value={capitalizeFirstLetter( metaData?.cc__dataConsent ? yesOrNo(metaData?.cc__dataConsent, t)  || "-" : "-")} />
                <MetaElement topic={t("table.columnNames.warranty")} value={ metaData?.cc__WarrantyStatus ? parseWarranty(metaData?.cc__WarrantyStatus, t) :"-"} />
                <MetaElement topic={t("table.columnNames.siteName")} value={metaData?.asset_SiteLocation__c || "-"} />
                <MetaElement topic={t("table.columnNames.operator")} value={metaData?.["account_Name"] || "-"} />
                <MetaElement topic={t("table.columnNames.country")} value={capitalizeFirstLetter(metaData?.asset_EndUserCountry__c || "-")} />
                <MetaElement topic={t("table.columnNames.berthName")} value={capitalizeFirstLetter(metaData?.asset_Berth || "-")} />
                </table>
              }
            </div>
          </div>
        </div>
        : null }
      </section>
    );
  };

export default CurrentStatusHeader;
