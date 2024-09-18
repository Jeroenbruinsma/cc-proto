import { TFunction } from "i18next";
import moment from "moment";
import { cellDataParserFunctions } from "./types/table";
import { warranttStatus } from "./types/equipment";

export const capitalizeFirstLetter = (text: string): string | undefined => {
  if (!text) return undefined;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const capitalizeFirstLetterParser = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const onlyYear = (input: string): string => {
  if (!input) return "";
  const d = new Date(input)
  if( isNaN(d.getFullYear() )) return "-"
  return `${d.getFullYear()}`
};

export const jsonSerializer = (anything: any): string =>{
  return JSON.stringify(anything)
}

export const yesOrNo = (input: boolean, t: TFunction) => {
  if(input === true) return t("basics.yes")
  if(input === false) return t("basics.no")
  return "-"  //default for unknown 
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
  
