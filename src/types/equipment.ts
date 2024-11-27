import { coreSystemType } from "./sites";

export interface equipmentDataType {
  asset_CoreSystem__c: coreSystemType;
  asset_SiteLocation__c: string;
  asset_YearOfInstallation__c: number;
  asset_WarrantyEndingDate__c: string;
  asset_ServiceAgreement__c: string;
  asset_EndUserCountry__c: string;
  asset_SerialNumber: string;
  asset_PartNumber__c: string;
  asset_Name: string;
  account_Name: string;
  asset_WarrantyStartingDate__c: string;
  asset_EndDateOfServiceAgreement__c: string;
  cc__WarrantyStatus: warranttStatus
  cc__dataConsent: boolean
  cc__data_validation_unit_passed?: boolean
  cc__data_validation_account_passed?: boolean
}

export type warranttStatus = "warranty_active" | "warranty_expired"
export interface statesResponseType {
  succes: boolean;
  unlocode: string;
  states: stateType[];
}
export interface stateType {
  berth: boolean;
  unit: number | null;
  category: number;
  state: number;
  state_str: string;
  time: Date;
  state_start?: Date;
}
export interface alarm {
  uuid: string;
  berth: boolean;
  unit: boolean;
  category: number;
  priority: number;
  detail: string;
  created: Date;
  acknowledged: null | Date;
  cleared: null | Date;
  duration: number
}

export type colorCodingType = "indicatorGreen" | "indicatorBlue" | "indicatorGray" | "indicatorYellow" | "indicatorRed"

export type colorCodingMappingType = {colorName: colorCodingType, colorHex: string}

export type stateColormapping = {stateNumber: number, stateName: string, stateColor: colorCodingMappingType['colorName'], equipmentType: coreSystemType}
