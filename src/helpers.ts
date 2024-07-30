import { TFunction } from "i18next";
import moment from "moment";
import { cellDataParserFunctions } from "./types/table";
import { warranttStatus } from "./types/equipment";

export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

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
  
