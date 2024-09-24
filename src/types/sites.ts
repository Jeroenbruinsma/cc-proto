export interface site{
    "SiteLocation__c": string
    "Account.Name": string
    "ServiceAgreement__c": string
    "CoreSystem__c": coreSystemType
    cc__dataConsent: string
    cc__siteHealth: string
    cc__data_validation_passed: Boolean
}
export interface customer{
    "Account.Name": string
    "Account.Id": string
    cc__dataConsent: string
    cc__unit_count: number
}

export type coreSystemType = 'AutomatedMooring' | 'ShorePower' 