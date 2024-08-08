export interface site{
    "SiteLocation__c": string
    "Account.Name": string
    "ServiceAgreement__c": string
    "CoreSystem__c": coreSystemType
    cc__dataConsent: string
    cc__siteHealth: string
}

export type coreSystemType = 'AutomatedMooring' | 'ShorePower' 