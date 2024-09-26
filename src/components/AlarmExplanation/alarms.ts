export const alarmOptions = ["diagnostic", "low", "medium", "high", "urgent", "critical"]
export const alarmExplanation = alarmOptions.map(alarm => { return ({"cc__severity": alarm, "cc__severityDescriptionTranslationKey": `alarms.descriptions.${alarm}`}) } )
export const serviceNeedsOptions = ["breakdown", "urgent", "scheduled"]
export const serviceNeedExplanation = serviceNeedsOptions.map(sn => { return ({"cc__severity": sn, "cc__severityDescriptionTranslationKey": `serviceNeeds.descriptions.${sn}`}) } )