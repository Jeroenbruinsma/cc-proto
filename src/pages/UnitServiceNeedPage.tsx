import TopHeader from '../components/TopHeader/TopHeader'
import CurrentStatusHeader from '../components/CurrentStatusHeader/CurrentStatusHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { createElement, useEffect, useState } from 'react'
import { equipmentDataType, stateType } from '../types/equipment'
import SubsectionHeader from '../components/SubsectionHeader/SubsectionHeader'
import Table from '../components/Table/Table'
import { useTranslation } from 'react-i18next'
import TableRow, { onRowClickConfig } from '../components/Table/TableRow'
import { columnType } from '../types/table'
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'
import QM from "..//components/AlarmExplanation/questionMark.svg";
import InPageNav from '../components/InpageNav/InPageNav'
import { serviceNeedsType } from '../types/serviceNeeds'
import { useAuth } from '../AuthProvider'


function UnitServiceNeedPage() {
  const {t} = useTranslation()
  const params = useParams()
  const navigate = useNavigate()
  const [metaData, set_metaData ] = useState<equipmentDataType| undefined >(undefined)
  const [stateData ] = useState<stateType| undefined >(undefined)
  const [serviceNeedData, set_serviceNeedData ] = useState<serviceNeedsType[]| undefined >(undefined)
  const { get } = useAuth()

  const getMetaData = async (eqpmentId:string) => {
    try{
      const res = await get(`/equipment/meta?serial=${eqpmentId}`)
      set_metaData(res?.data?.data)
    }
    catch(err){
      console.log("err",err)
    }
  }
 
  const getServiceNeeds = async (eqpmentId:string) => {
    // try{
    //   const url = `${backendUrl}/equipment/serial-to-alarm?serial=${eqpmentId}&historical=True`
    //   const res = await axios.get(url)

    //   if(res?.data?.data?.length > 0){
    //     set_AlarmData(res?.data?.data)
    //   }else{
    //     set_AlarmData([])
    //   }
    // }
    // catch(err){
    //   console.log("err",err)
    //   set_AlarmData(undefined)
    // }
    console.log("dummy data here for", eqpmentId)
      const dummyServiceNeed: serviceNeedsType = {
        serviceNeedId: "-",
        serviceNeedName: "-",
        date: "-",
        serviceNeedStatus: "-",
      };
    set_serviceNeedData([dummyServiceNeed])
  }



  useEffect(()=>{
    if(params.id ) {
      getMetaData(params.id)
      getServiceNeeds(params.id)
    }
  },[params.id,])

    useEffect(() => {
      const intervalId = setInterval(() => {
        if(params.id ) {
          getServiceNeeds(params.id)
        }
      }, 60000);
  
      return () => {
        clearInterval(intervalId);
      };
    }, [params.id]);



    const serviceNeedsColumns: columnType[] = [
      {
        colName: t("table.columnNames.serviceNeedId"),
        dataKey: "serviceNeedId",
        autocapitalize: true,
      },
      {
        colName: t("table.columnNames.serviceNeedName"),
        dataKey: "serviceNeedName",
        headerIcon: {
          onClick: () => navigate("/nomenclature/serviceneeds"),
          icon: createElement(QM, {
            fill: "gray",
            width: "20px",
            style: { marginLeft: "10px" },
          }),
        },
      },
      { colName: t("table.columnNames.date_localSite"), dataKey: "date" },
      {
        colName: t("table.columnNames.serviceNeedStatus"),
        dataKey: "serviceNeedStatus",
      },
    ];

    const onRowClick:onRowClickConfig = {
      onClick: (e:any) => console.log("Click not supported, alarm UUID:",e ),
      dataKey: "uuid",

    }


  return (  
    <>
      <TopHeader/>
      <CurrentStatusHeader small equipmentName={`${metaData?.asset_Name || "-"} `} metaData={metaData} stateInfo={stateData}/>
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
          <InPageNav/>
           
            <SubsectionHeader title={`${t("serviceNeedList")}`}/>
            { !serviceNeedData ? <LoadingIndicator/> : 
            <Table tableRowElement={TableRow} tableColumns={serviceNeedsColumns} tableData={serviceNeedData} onRowClick={onRowClick}/>
          }
        </div>
    </div>
       
    </>
  )
}

export default UnitServiceNeedPage
