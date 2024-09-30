import TopHeader from '../components/TopHeader/TopHeader'
import CurrentStatusHeader from '../components/CurrentStatusHeader/CurrentStatusHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { createElement, useEffect, useState } from 'react'
import axios from 'axios'
import { alarm, equipmentDataType, stateType } from '../types/equipment'
import { backendUrl } from '../config'
import KpiBox from '../components/KpiBox/KpiBox'
import MetricBox from '../components/MetricBox/MetricBox'
import SubsectionHeader from '../components/SubsectionHeader/SubsectionHeader'
import Table from '../components/Table/Table'
import { useTranslation } from 'react-i18next'
import TableRow, { onRowClickConfig } from '../components/Table/TableRow'
import { columnType } from '../types/table'
import { alarmPrioParser, durationParser } from '../helpers'
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'
import InfoBox from '../components/InfoBox/InfoBox'
import QM from "..//components/AlarmExplanation/questionMark.svg";
import { serviceNeedsType } from '../types/serviceNeeds'


function UnitDetailsPage() {
  const {t} = useTranslation()
  const params = useParams()
  const navigate = useNavigate()
  const [metaData, set_metaData ] = useState<equipmentDataType| undefined >(undefined)
  const [stateData, set_stateData ] = useState<stateType| undefined >(undefined)
  const [alarmData, set_AlarmData ] = useState<alarm[]| undefined >(undefined)
  //TODO here ANY!
  const getMetaData = async (eqpmentId:string) => {
    try{
      const url = `${backendUrl}/equipment/meta?serial=${eqpmentId}`
      const res = await axios.get(url)
      set_metaData(res?.data?.data)
    }
    catch(err){
      console.log("err",err)
    }
  }
  const getLastState = async (eqpmentId:string) => {
    try{
      const url = `${backendUrl}/equipment/serial-to-state?serial=${eqpmentId}`
      const res = await axios.get(url)
      if(res?.data?.states?.length > 0){
        set_stateData(res?.data?.states[0])
      }else{
        set_stateData(undefined)
      }
    }
    catch(err){
      console.log("err",err)
    }
  }
  const getAlarmData = async (eqpmentId:string) => {
    try{
      const url = `${backendUrl}/equipment/serial-to-alarm?serial=${eqpmentId}`
      const res = await axios.get(url)

      if(res?.data?.data?.length > 0){
        set_AlarmData(res?.data?.data) //.filter((a:any) => a?.berth === false))
      }else{
        set_AlarmData([])
      }
    }
    catch(err){
      console.log("err",err)
      set_AlarmData(undefined)
    }
  }
  useEffect(()=>{
    if(params.id ) {
      getMetaData(params.id)
      getLastState(params.id)
      getAlarmData(params.id)
    }
  },[params.id])

  const dummyServiceNeed:serviceNeedsType = {
    serviceNeedId: "-",
    serviceNeedName: "-",
    date: "-",
    serviceNeedStatus: "-" 
  }

  const alarmColumns:columnType[] = [
      { colName: t("table.columnNames.dateTime"), dataKey: "created", autocapitalize: true},
      { colName: t("table.columnNames.alarm"), dataKey: "detail"},
      { colName: t("table.columnNames.priority"), dataKey: "priority" , parsers: [ alarmPrioParser], headerIcon: {onClick: ()=> navigate("/nomenclature/alarms"), icon: createElement(QM, {fill:"gray", width: "20px", style: {marginLeft: "10px"} })} },
      { colName: t("table.columnNames.duration"), dataKey: "duration", parsers: [ durationParser]   }
    ]
  const serviceNeedsColumns:columnType[] = [
      { colName: t("table.columnNames.serviceNeedId"), dataKey: "serviceNeedId", autocapitalize: true},
      { colName: t("table.columnNames.serviceNeedName"), dataKey: "serviceNeedName" , headerIcon: {onClick: ()=> navigate("/nomenclature/serviceneeds"), icon: createElement(QM, {fill:"gray", width: "20px", style: {marginLeft: "10px"} })} },
      { colName: t("table.columnNames.date"), dataKey: "date"},
      { colName: t("table.columnNames.serviceNeedStatus"), dataKey: "serviceNeedStatus"   }
    ]

    const onRowClick:onRowClickConfig = {
      onClick: (e:any) => console.log("Click not supported, alarm UUID:",e ),
      dataKey: "uuid",

    }
  return (  
    <>
      <TopHeader/>
      <CurrentStatusHeader equipmentName={`${metaData?.Name || "-"} `} metaData={metaData} stateInfo={stateData}/>
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
          { metaData?.cc__data_validation_unit_passed || metaData == undefined ? null:  <InfoBox type="assetNotValidated" /> }
          { metaData?.cc__data_validation_unit_passed || metaData == undefined ? null:  <InfoBox type="accountNotValidated" /> }
           
            <SubsectionHeader title={t("serviceNeedsList")} />
            { !alarmData ? <LoadingIndicator/> : 
            <Table tableRowElement={TableRow} tableColumns={serviceNeedsColumns} tableData={[dummyServiceNeed]} onRowClick={onRowClick}/>
          }
            <SubsectionHeader title={t("activeAlarmList")} />
            { !alarmData ? <LoadingIndicator/> : 
            <Table tableRowElement={TableRow} tableColumns={alarmColumns} tableData={alarmData} onRowClick={onRowClick}/>
          }
      <KpiBox>
        <MetricBox metricValue='- %' unitAvailability='Unit availability' className=""/>
        <MetricBox metricValue='- days' unitAvailability='Unit MTBF' className=""/>
        <MetricBox metricValue='-%' unitAvailability='Unit performance' className=""/>
        <MetricBox metricValue='-%' unitAvailability='Unit utilization' className=""/>
      </KpiBox>
        </div>
    </div>
       
    </>
  )
}

export default UnitDetailsPage
