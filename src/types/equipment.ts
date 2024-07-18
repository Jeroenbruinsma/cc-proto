
export interface equipmentDataType { 
    CoreSystem__c: string
    SiteLocation__c: string
    YearOfInstallation__c: number
    WarrantyEndingDate__c: string
    ServiceAgreement__c: string
    EndUserCountry__c: string
    SerialNumber: string
    PartNumber__c: string
    Name: string
    "Account.Name": string
    WarrantyStartingDate__c: string
    EndDateOfServiceAgreement__c: string
  }
  export interface statesResponseType{
    succes: boolean
    unlocode: string
    states: stateType[]
  }
  export interface stateType{
      berth: boolean,
      unit: number | null,
      category: number,
      state: number,
      state_str: string,
      time: Date
      state_start?: Date
  }