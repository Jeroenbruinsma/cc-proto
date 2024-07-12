import TopHeader from '../components/TopHeader/TopHeader'
import CurrentStatusHeader from '../components/CurrentStatusHeader/CurrentStatusHeader'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import KpiBox from '../components/KpiBox/KpiBox'
// import MetricBox from '../components/MetricBox/MetricBox'

export interface equipmentDataType { 
  CoreSystem__c: string
  SiteLocation__c: string
  YearOfInstallation__c: number,
  WarrantyEndingDate__c: string
  ServiceAgreement__c: string,
  SerialNumber: string
  PartNumber__c: string
  Name: string
}


function UnitDetailsPage() {
  const params = useParams()
  const [data, set_data ] = useState<equipmentDataType| undefined >(undefined)
  const getData = async (eqpmentId:string) => {
    try{

      const res = await axios.get(`http://127.0.0.1:5000/equipment-meta?serial=${eqpmentId}`)
      console.log("data", res.data)
      set_data(res?.data)
    }
    catch(err){
      console.log("err",err)
    }
  }
  useEffect(()=>{
    if(params.id ) getData(params.id)
  },[params.id])
  return (
    <>
      <TopHeader/>
      <CurrentStatusHeader equipmentName='Hatvik_B1_1A_Fjord1' data={data}/>
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
