import { alarm, alarmColorCoding } from "../../types/equipment"

export const alarmOptions = ["diagnostic", "low", "medium", "high", "critical"]
export const alarmExplanation = alarmOptions.map( (alarm, i) => 
                                                  { return ({ "priority": i,
                                                              "cc__severity": alarm, 
                                                              "cc__severityDescriptionTranslationKey": `alarms.descriptions.${alarm}`}) } )
export const serviceNeedsOptions = ["breakdown", "urgent", "scheduled"]
export const serviceNeedExplanation = serviceNeedsOptions.map(sn => { return ({"cc__severity": sn, "cc__severityDescriptionTranslationKey": `serviceNeeds.descriptions.${sn}`}) } )


export const alarmColorParser = (row: alarm): alarmColorCoding | undefined => {
    if (row?.priority === 0) {
        return "gray";
    }
    if (row?.priority === 1) {
      return "magenta";
    } else if (row?.priority === 2) {
      return "yellow";
    } else if (row?.priority === 3) {
      return "orange";
    } else if (row?.priority === 4) {
      return "red";
    }
    return undefined;
  }
