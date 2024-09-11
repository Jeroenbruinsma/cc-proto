export interface validation{
    id: string
    object_validation_result: boolean
    sfdcObjectType: string
    validations: validationObject[]
}

export interface validationObject{
    sfdcObjectType: sfdcObjectType
    description: string
    object_validation_result: boolean
    sfdc_tag: string
    sfdc_value: string
    validation_result: ccService
}
export type cc_service_type = "cc_analytics" | "cc_insights"
export type sfdcObjectType = "Asset" | "Account"

export interface ccService{
    cc_analytics?: boolean
    cc_insights?: boolean
}