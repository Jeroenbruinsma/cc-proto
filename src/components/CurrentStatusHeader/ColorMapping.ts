import { colorCodingMappingType, functionalStatusTextType, stateColormapping } from "../../types/equipment"
import { coreSystemType } from "../../types/sites"

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
  
   const functionalStateColorMapping = [
      { stateName: "Functional", stateColor: "indicatorGreen" },
      { stateName: "Needs Investigation", stateColor: "indicatorYellow" },
      { stateName: "Needs Repair", stateColor: "indicatorRed" },
      { stateName: "Under Maintenance", stateColor: "indicatorBlue" },
      { stateName: "Scheduled Maintenance by Cavotec", stateColor: "indicatorBlue" },
      { stateName: "Scheduled Maintenance by Customer", stateColor: "indicatorBlue" },
      { stateName: "Offline - not onboarded", stateColor: "indicatorGray" },
      { stateName: "Offline - network failure", stateColor: "indicatorGray" },
      { stateName: "Offline - no data consent", stateColor: "indicatorGray" },
      { stateName: "Offline - no SLA/Warranty/Subscription", stateColor: "indicatorGray" },
   ]


   export const functionalStateToColor = (stateName:functionalStatusTextType | undefined ) : string => {
    if(!stateName) return colors.filter(c => c.colorName === "indicatorRed")?.[0]?.colorHex 
    const color = functionalStateColorMapping.filter(cm => stateName === cm.stateName)
    return colors.filter(c => c.colorName === color?.[0]?.stateColor)?.[0]?.colorHex ||
    colors.filter(c => c.colorName === "indicatorRed")?.[0]?.colorHex 
  }
  export const stateToColor = (state:number | undefined, eqp: coreSystemType | undefined ) : string => {
    if(!state && !eqp) return colors.filter(c => c.colorName === "indicatorRed")?.[0]?.colorHex 
    const color = stateColorMapping.filter(cm => state === cm.stateNumber  && eqp === cm.equipmentType)
    return colors.filter(c => c.colorName === color?.[0]?.stateColor)?.[0]?.colorHex ||
    colors.filter(c => c.colorName === "indicatorRed")?.[0]?.colorHex 
  }