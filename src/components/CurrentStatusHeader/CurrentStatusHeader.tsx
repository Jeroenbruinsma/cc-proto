import { FunctionComponent } from "react";
import SubsectionHeader from "../SubsectionHeader/SubsectionHeader";
import StatusIndicator from "../StatusIndicator/StatusIndicator";
import styles from "./CurrentStatusHeader.module.css";
import { capitalizeFirstLetter, dayMonthTime, onlyYear, parseWarranty, yesOrNo } from "../../helpers";
import moment from 'moment-timezone'
import { colorCodingMappingType, equipmentDataType, stateColormapping, stateType } from "../../types/equipment";
import { useTranslation } from "react-i18next";
import { coreSystemType } from "../../types/sites";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";


export type CurrentStatusHeaderType = {
  className?: string;
  equipmentName: string
  metaData: equipmentDataType | undefined
  stateInfo: stateType | undefined
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
  stateInfo,
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

  const colors:colorCodingMappingType[] = [ 
    {colorName: "indicatorGreen", colorHex: "#22B14C"},
    {colorName: "indicatorBlue", colorHex: "#3F48CC"},
    {colorName: "indicatorGray", colorHex: "#7F7F7F"},
    {colorName: "indicatorYellow", colorHex: "#FFC90E"},
    {colorName: "indicatorGold", colorHex: "#FFA500"},
    {colorName: "indicatorRed", colorHex: "#FF0000"}
  ]
  
   const stateColorMapping : stateColormapping[]= [
    {stateNumber: 2, stateName: "Idle", stateColor: "indicatorRed", equipmentType: "AutomatedMooring"},
    {stateNumber: 3, stateName: "Arming", stateColor: "indicatorYellow", equipmentType: "AutomatedMooring"},
    {stateNumber: 4, stateName: "Ready To Moor", stateColor: "indicatorBlue", equipmentType: "AutomatedMooring"},
    {stateNumber: 5, stateName: "Mooring", stateColor: "indicatorYellow", equipmentType: "AutomatedMooring"},
    {stateNumber: 6, stateName: "Moored", stateColor: "indicatorGreen", equipmentType: "AutomatedMooring"},
    {stateNumber: 7, stateName: "Detaching", stateColor: "indicatorYellow", equipmentType: "AutomatedMooring"},
    {stateNumber: 10, stateName: "Parking", stateColor: "indicatorYellow", equipmentType: "AutomatedMooring"},
    {stateNumber: 11, stateName: "Parked", stateColor: "indicatorGray", equipmentType: "AutomatedMooring"},
    
    {stateNumber: 0, stateName: "Parked-Offline", stateColor: "indicatorGray", equipmentType: "ShorePower"},
    {stateNumber: 1, stateName: "PARKED WITH BATTERY CHARGING", stateColor: "indicatorYellow", equipmentType: "ShorePower"},
    {stateNumber: 2, stateName: "TROLLEY MOVING / HV CABLE HANDLING (DISCONNECTED)", stateColor: "indicatorGold", equipmentType: "ShorePower"},
    {stateNumber: 3, stateName: "HV CABLE CONNECTED (WITH PILOTS OPEN)", stateColor: "indicatorRed", equipmentType: "ShorePower"},
    {stateNumber: 4, stateName: "HV CABLE CONNECTED (WITH PILOTS CLOSED) ", stateColor: "indicatorRed", equipmentType: "ShorePower"},

    {stateNumber: 9999, stateName: "Not onboarded", stateColor: "indicatorGray", equipmentType: "ShorePower"},
    {stateNumber: 9999, stateName: "Not onboarded", stateColor: "indicatorGray", equipmentType: "AutomatedMooring"}
   ]
  

  const stateToColor = (state:number | undefined, eqp: coreSystemType | undefined ) : string => {
    console.log(":eqp", state ,eqp)
    if(!state && !eqp) return colors.filter(c => c.colorName === "indicatorRed")?.[0]?.colorHex 
    const color = stateColorMapping.filter(cm => state === cm.stateNumber  && eqp === cm.equipmentType)
    return colors.filter(c => c.colorName === color?.[0]?.stateColor)?.[0]?.colorHex ||
    colors.filter(c => c.colorName === "indicatorRed")?.[0]?.colorHex 
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
          { !stateInfo ? <LoadingIndicator/> : 
              <StatusIndicator  text={stateInfo?.state_str || "-" } 
                                subText={parseDate(stateInfo)} 
                                subSubText={`(${dayMonthTime(stateInfo?.local_site_time,t)} ${t("table.columnNames.siteLocalTime")})`} 
                                indicatorBollColor={stateToColor(stateInfo?.state, metaData?.asset_CoreSystem__c)}/>
          }
            {/* <StatusIndicator text="Scheduled Maintenace" subtext="Due for inspection"/> */}
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
