import TopHeader from '../components/TopHeader/TopHeader'
import CurrentStatusHeader from '../components/CurrentStatusHeader/CurrentStatusHeader'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { equipmentDataType, stateType } from '../types/equipment'
// import KpiBox from '../components/KpiBox/KpiBox'
// import MetricBox from '../components/MetricBox/MetricBox'



function UnitDetailsPage() {
  const params = useParams()
  const [metaData, set_metaData ] = useState<equipmentDataType| undefined >(undefined)
  const [stateData, set_stateData ] = useState<stateType| undefined >(undefined)
  const getMetaData = async (eqpmentId:string) => {
    try{
      const url = `http://127.0.0.1:5000/equipment-meta?serial=${eqpmentId}`
      const res = await axios.get(url)
      set_metaData(res?.data)
    }
    catch(err){
      console.log("err",err)
    }
  }
  const getLastState = async (eqpmentId:string) => {
    try{
      const url = `http://127.0.0.1:5000/serial-to-state?serial=${eqpmentId}`
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
  useEffect(()=>{
    if(params.id ) {
      getMetaData(params.id)
      getLastState(params.id)
    }
  },[params.id])
  console.log("mta", metaData)
  return (
    <>
      <TopHeader/>
      <CurrentStatusHeader equipmentName={`${metaData?.Name}`} metaData={metaData} stateInfo={stateData}/>
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
