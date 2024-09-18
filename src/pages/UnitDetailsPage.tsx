import TopHeader from '../components/TopHeader/TopHeader'
import CurrentStatusHeader from '../components/CurrentStatusHeader/CurrentStatusHeader'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { alarm, equipmentDataType, stateType } from '../types/equipment'
import { backendUrl } from '../config'
// import KpiBox from '../components/KpiBox/KpiBox'
// import MetricBox from '../components/MetricBox/MetricBox'
import SubsectionHeader from '../components/SubsectionHeader/SubsectionHeader'
import Table from '../components/Table/Table'
import { useTranslation } from 'react-i18next'
import TableRow, { onRowClick } from '../components/Table/TableRow'
import { columnType } from '../types/table'
import { alarmPrioParser, durationParser } from '../helpers'
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'
import AlarmExplanation from '../components/AlarmExplanation/AlarmExplanation'


function UnitDetailsPage() {
  const {t} = useTranslation()
  const params = useParams()
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
      console.log("res data", res?.data)

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

  const columns:columnType[] = [
      { colName: t("table.columnNames.dateTime"), dataKey: "created", autocapitalize: true},
      { colName: t("table.columnNames.alarm"), dataKey: "detail"},
      { colName: t("table.columnNames.priority"), dataKey: "priority" , parsers: [ alarmPrioParser] },
      { colName: t("table.columnNames.duration"), dataKey: "duration", parsers: [ durationParser]   }
    ]

    const onRowClick:onRowClick = {
      onClick: (e:any) => console.log("Click not supported, alarm UUID:",e ),
      dataKey: "uuid",

    }
  return (  
    <>
      <TopHeader/>
      <CurrentStatusHeader equipmentName={`${metaData?.Name || "-"} `} metaData={metaData} stateInfo={stateData}/>
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            {/* @ts-ignore */}
            <SubsectionHeader title={t("activeAlarmList")} />
            { !alarmData ? <LoadingIndicator/> : 
            <Table tableRowElement={TableRow} tableColumns={columns} tableData={alarmData} onRowClick={onRowClick}/>
          }
         {alarmData ? <AlarmExplanation/>: null}
        </div>
    </div>
      {/* <KpiBox>
        <MetricBox metricValue='95%' unitAvailability='Unit availability' className=""/>
        <MetricBox metricValue='14,6 days' unitAvailability='Unit MTBF' className=""/>
        <MetricBox metricValue='98%' unitAvailability='Unit performance' className=""/>
        <MetricBox metricValue='99%' unitAvailability='Unit utilization' className=""/>
        <MetricBox metricValue='97%' unitAvailability='BDU availability' className=""/>
      </KpiBox> */}
       
    </>
  )
}

export default UnitDetailsPage
