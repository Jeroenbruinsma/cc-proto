import { TFunction } from "i18next"
import { alarm } from "./equipment"
import { customer, site } from "./sites"
import { unit } from "./unit"

export interface columnType extends cellType{
    colName: string 
    cellElement?: React.ComponentType<any>
    parsers?: cellDataParserFunctions[]
  }
  
  export interface cellType{
    dataKey:  keyof alarm | keyof site | keyof unit | keyof customer
    autocapitalize?: boolean
}

export type cellDataParserFunctions = (input: any, t:TFunction) => string;