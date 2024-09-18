export const alarmOptions = ["diagnostic", "low", "medium", "high", "urgent", "critical"]
export const alarmExplanation = alarmOptions.map(alarm => { return ({"cc__alarmSeverity": alarm, "cc__alarmSeverityDescriptionTranslationKey": `alarms.descriptions.${alarm}`}) } )