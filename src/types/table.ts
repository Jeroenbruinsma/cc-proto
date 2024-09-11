import { TFunction } from "i18next"
import { alarm } from "./equipment"
import { customer, site } from "./sites"
import { unit } from "./unit"
import { validation, validationObject } from "./validations"

export interface columnType extends cellType{
    colName: string 
    cellElement?: React.ComponentType<any>
    parsers?: cellDataParserFunctions[]
  }
  
  export interface cellType{
    dataKey:  keyof alarm | keyof site | keyof unit | keyof customer | keyof validation | keyof validationObject
    autocapitalize?: boolean
}

export type cellDataParserFunctions = (input: any, t:TFunction) => string;