import './global.css'

import './App.css'
import TopHeader from './components/TopHeader/TopHeader'
import CurrentStatusHeader from './components/CurrentStatusHeader/CurrentStatusHeader'
import KpiBox from './components/KpiBox/KpiBox'
import MetricBox from './components/MetricBox/MetricBox'

function App() {

  return (
    <>
      <TopHeader/>
      <CurrentStatusHeader equipmentName='Hatvik_B1_1A_Fjord1'/>
      
      <KpiBox>
        <MetricBox metricValue='95%' unitAvailability='Unit availability' className=""/>
        <MetricBox metricValue='14,6 days' unitAvailability='Unit MTBF' className=""/>
        <MetricBox metricValue='98%' unitAvailability='Unit performance' className=""/>
        <MetricBox metricValue='99%' unitAvailability='Unit utilization' className=""/>
        <MetricBox metricValue='97%' unitAvailability='BDU availability' className=""/>
      </KpiBox>
       
    </>
  )
}

export default App
