import TopHeader from '../components/TopHeader/TopHeader'
import CurrentStatusHeader from '../components/CurrentStatusHeader/CurrentStatusHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { createElement, useEffect, useState } from 'react'
import { alarm, equipmentDataType, stateType } from '../types/equipment'
import { backendUrl } from '../config'
import SubsectionHeader from '../components/SubsectionHeader/SubsectionHeader'
import Table from '../components/Table/Table'
import { useTranslation } from 'react-i18next'
import TableRow, { onRowClickConfig } from '../components/Table/TableRow'
import { columnType } from '../types/table'
import { alarmPrioParser, durationParser } from '../helpers'
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'
// import InfoBox from '../components/InfoBox/InfoBox'
import QM from "..//components/AlarmExplanation/questionMark.svg";
import InPageNav from '../components/InpageNav/InPageNav'
import { useAuth } from '../AuthProvider'


function UnitsAlarmsPage() {
  const {t} = useTranslation()
  const params = useParams()
  const navigate = useNavigate()
  const [metaData, set_metaData ] = useState<equipmentDataType| undefined >(undefined)
  const [stateData ] = useState<stateType| undefined >(undefined)
  const [alarmData, set_AlarmData ] = useState<alarm[]| undefined >(undefined)
  const [downloadToken, set_downloadToken] = useState<undefined | string>(undefined);
  const {get} = useAuth()
  const [offset] = useState(0)
  const [limit] = useState(100)


  const getMetaData = async (eqpmentId:string) => {
    try{
      const res = await get( `/equipment/meta?serial=${eqpmentId}`)
      set_metaData(res?.data?.data)
    }
    catch(err){
      console.log("err",err)
    }
  }
 
  const getAlarmData = async (eqpmentId:string) => {
    try{
      const res = await get(`/equipment/serial-to-alarm?serial=${eqpmentId}&historical=True&berthserial=${eqpmentId.split("/")[0]}/0&offset=${offset}&limit=${limit}`)
      if(res?.data?.downloadToken){
        set_downloadToken(res?.data?.downloadToken)
      }
      if(res?.data?.data?.length > 0){
        set_AlarmData(res?.data?.data)
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
      getAlarmData(params.id)
    }
  },[params.id,])

    useEffect(() => {
      const intervalId = setInterval(() => {
        if(params.id ) {
          getAlarmData(params.id)
        }
      }, 60000);
  
      return () => {
        clearInterval(intervalId);
      };
    }, [params.id]);



  const alarmColumns:columnType[] = [
      { colName: t("table.columnNames.dateTime_local"), dataKey: "created_local_site_time", autocapitalize: true },
      { colName: t("table.columnNames.alarm"), dataKey: "detail"},
      { colName: t("table.columnNames.priority"), dataKey: "priority" , parsers: [ alarmPrioParser], headerIcon: {onClick: ()=> navigate("/nomenclature/alarms"), icon: createElement(QM, {fill:"gray", width: "20px", style: {marginLeft: "10px"} })} },
      { colName: t("table.columnNames.duration"), dataKey: "duration", parsers: [ durationParser]   }
    ]

    const onRowClick:onRowClickConfig = {
      onClick: (e:any) => console.log("Click not supported, alarm UUID:",e ),
      dataKey: "uuid",
    }


  const alarmList =  alarmData
  return (  
    <>
      <TopHeader/>
      <CurrentStatusHeader small equipmentName={`${metaData?.asset_Name || "-"} `} metaData={metaData} stateInfo={stateData}/>
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
          <InPageNav/>
          {/* { metaData?.cc__data_validation_unit_passed || metaData == undefined ? null:  <InfoBox type="assetNotValidated" /> }
          { metaData?.cc__data_validation_unit_passed || metaData == undefined ? null:  <InfoBox type="accountNotValidated" /> } */}
           
            <SubsectionHeader title={`${t("historicalAlarmList")}`} 
              // button={() => navigate(`/unit/${encodeURIComponent(params?.id)}/historicalAlarms`)}
              // buttonText={t("historicalAlarmsButton")}
              exportData={downloadToken ? `${backendUrl}/download?token=${downloadToken}` : undefined} //serial=${params?.id}${params?.id ? `&berthserial=${params?.id.split("/")[0]}` : ""}/0&historical=True&export=True`}
              />
            { !alarmData ? <LoadingIndicator/> : 
            <Table tableRowElement={TableRow} tableColumns={alarmColumns} tableData={alarmList} onRowClick={onRowClick}/>
          }
        </div>
    </div>
       
    </>
  )
}

export default UnitsAlarmsPage
