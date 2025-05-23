import { TFunction } from "i18next";
import moment from "moment";
import { cellDataParserFunctions } from "./types/table";
import { warranttStatus } from "./types/equipment";

export const capitalizeFirstLetter = (text: string): string | undefined => {
    if (!text) return undefined;
    if (typeof(text) !== "string") return text 
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const capitalizeFirstLetterParser = (text: string): string => {
    if (!text) return "";
    if (typeof(text) !== "string") return text 
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const onlyYear = (input: string): string => {
  if (!input) return "";
  const d = new Date(input)
  if( isNaN(d.getFullYear() )) return "-"
  return `${d.getFullYear()}`
};

function leadingZero(value: number):string{ 
  return (value < 10 ? '0' : '') + value;
}

export const dayMonthTime = (input: Date, t: (a: string) => string ): string => {
  if (!input) return "";
  const d = new Date(input)
  return `${d.getUTCDate()}-${monthToShort(d.getUTCMonth(), t)}, ${d.getUTCHours()}:${leadingZero(d.getUTCMinutes())}`
};
export const dayMonthTimeYear = (input: Date, t: (a: string) => string ): string => {
  if (!input) return "";
  const d = new Date(input)
  return `${d.getUTCDate()}-${monthToShort(d.getUTCMonth(), t)}-${d.getUTCFullYear()}, ${d.getUTCHours()}:${leadingZero(d.getUTCMinutes())}`
};

export const monthToShort = (month: Number, t: (a: string) => string ): string => {
  return t(`basics.shortMonths.${month}`)  
}

export const jsonSerializer = (anything: any): string =>{
  return JSON.stringify(anything)
}

export const yesOrNo = (input: boolean, t: TFunction) => {
  if(input === true) return t("basics.yes")
  if(input === false) return t("basics.no")
  return "-"  //default for unknown 
}
export const passedOrFailed = (input: boolean, t: TFunction) => {
  if(input === true) return t("basics.passed")
  if(input === false) return t("basics.failed")
  return "-"  //default for unknown 
}

export const emptyDash = (text: string, t: any) => {
  if(text === "") return t("basics.dash")
  if(text === "null") return t("basics.dash")
  return text
}

export const emptyDashObject = (text: string, t: any) => {
  if(typeof(text) === "object") return t("basics.dash")
  if(text === "") return t("basics.dash")
  if(text === "null") return t("basics.dash")
  return text
}

export const alarmPrioParser: cellDataParserFunctions = (priority: number, t: TFunction): string => {
  if (priority === 0) return t("alarms.priorities.diagnostic");
  if (priority === 1) return t("alarms.priorities.low");
  if (priority === 2) return t("alarms.priorities.medium");
  if (priority === 3) return t("alarms.priorities.high");
  if (priority === 4) return t("alarms.priorities.critical");
  return "";
};

export const durationParser: cellDataParserFunctions = (input: number): string => {
  return `${moment.duration(input, "seconds").humanize()}`;
};

export const parseWarranty = ( cc__WarrantyStatus: warranttStatus, t: TFunction) => {
    return t(`warranty.${cc__WarrantyStatus}`)
  }
  
