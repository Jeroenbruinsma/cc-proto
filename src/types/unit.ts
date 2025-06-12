import { functionalStatusTextType } from "./equipment"

export interface unit{
    'account_Id': string 
    'account_Name': string 
    asset_CoreSystem__c: string 
    asset_EndDateOfServiceAgreement__c: string 
    asset_EndUserCountry__c: string 
    asset_Id: string 
    asset_Name: string 
    asset_Berth: string 
    asset_SerialNumber: string 
    asset_ServiceAgreement__c: string 
    asset_SiteLocation__c: string 
    asset_WarrantyEndingDate__c: string 
    asset_WarrantyStartingDate__c: string 
    asset_YearOfInstallation__c: string 
    cc__equipmentType: string
    cc__functional_status: functionalStatusTextType
    cc__data_validation_passed: Boolean
}