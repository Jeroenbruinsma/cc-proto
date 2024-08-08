import { FunctionComponent } from "react";
import SubsectionHeader from "../SubsectionHeader/SubsectionHeader";
import StatusIndicator from "../StatusIndicator/StatusIndicator";
import styles from "./CurrentStatusHeader.module.css";
import { capitalizeFirstLetter, onlyYear, parseWarranty, yesOrNo } from "../../helpers";
import moment from 'moment-timezone'
import { colorCodingMappingType, equipmentDataType, stateColormapping, stateType } from "../../types/equipment";
import { useTranslation } from "react-i18next";
import { coreSystemType } from "../../types/sites";


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
  const {t} = useTranslation()

  const parseDate = (state: stateType)=> {
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
    
    {stateNumber: 0, stateName: "Idle", stateColor: "indicatorGray", equipmentType: "ShorePower"},
    {stateNumber: 0, stateName: "Preposition", stateColor: "indicatorYellow", equipmentType: "ShorePower"},
    {stateNumber: 0, stateName: "Connected", stateColor: "indicatorBlue", equipmentType: "ShorePower"},
    {stateNumber: 0, stateName: "Charging", stateColor: "indicatorGreen", equipmentType: "ShorePower"},
    {stateNumber: 0, stateName: "Alarm", stateColor: "indicatorRed", equipmentType: "ShorePower"},
    {stateNumber: 0, stateName: "Fault", stateColor: "indicatorRed", equipmentType: "ShorePower"}
   ]
  

  const stateToColor = (state:number, eqp: coreSystemType) : string => {
    const color = stateColorMapping.filter(cm => state === cm.stateNumber  && eqp === cm.equipmentType)
    return colors.filter(c => c.colorName === color?.[0]?.stateColor)?.[0]?.colorHex ||
    colors.filter(c => c.colorName === "indicatorRed")?.[0]?.colorHex 
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
            <StatusIndicator text={stateInfo?.state_str || "" } subtext={parseDate(stateInfo)} indicatorBollColor={stateToColor(stateInfo?.state, metaData?.CoreSystem__c)}/>
            {/* <StatusIndicator text="Scheduled Maintenace" subtext="Due for inspection"/> */}
          </div>
          <div className={styles.metadatainfoboxParent}>
            <div className={styles.metadatainfobox}>
              <div className={styles.metaDataInfo}>Serial nr: {metaData?.SerialNumber || "-"}</div>
              <div className={styles.metaDataInfo}>Installation yr: {metaData?.YearOfInstallation__c || "-"}</div>
              <div className={styles.metaDataInfo}>SLA Active: {capitalizeFirstLetter(metaData?.ServiceAgreement__c || "-")}</div>
              <div className={styles.metaDataInfo}>SLA end date: {capitalizeFirstLetter(metaData?.EndDateOfServiceAgreement__c || "-")}</div>
              <div className={styles.metaDataInfo}>Data consent: {capitalizeFirstLetter( yesOrNo(metaData?.cc__dataConsent, t) || "-")}</div>
              {/* Make sure we use the translation from table.columnNames.operator! to match sites overview */}
              <div className={styles.metaDataInfo}>Customer: {metaData?.["Account.Name"] || "-"}</div>
              <div className={styles.metaDataInfo}>Country: {capitalizeFirstLetter(metaData?.EndUserCountry__c || "-")}</div>
              <div className={styles.metaDataInfo}>Warranty: { metaData?.cc__WarrantyStatus ? parseWarranty(metaData?.cc__WarrantyStatus, t) : "-"}</div>
              <div className={styles.metaDataInfo}>Commissioned : {onlyYear(metaData?.WarrantyStartingDate__c || "-")}</div>
              <div className={styles.metaDataInfo}>Site Location : {metaData?.SiteLocation__c || "-"}</div>

            </div>
          </div>
        </div>
      </section>
    );
  };

export default CurrentStatusHeader;
