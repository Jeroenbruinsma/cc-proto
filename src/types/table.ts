import { TFunction } from "i18next"
import { alarm } from "./equipment"
import { customer, site } from "./sites"
import { unit } from "./unit"
import { validation, validationObject } from "./validations"
import { alarmSeverityType } from "./alarms"
import { rowDataType } from "../components/Table/TableRow"
import { serviceNeedsType } from "./serviceNeeds"

export type dataKeyType = keyof alarm | keyof site | keyof unit | keyof customer | keyof validation | keyof validationObject | keyof alarmSeverityType | keyof serviceNeedsType

export interface columnType{ 
    colName: string 
    cellElement?: any //React.FC<cellType>; 
    parsers?: cellDataParserFunctions[]
    dataKey:  dataKeyType
    autocapitalize?: boolean
    headerIcon?: headerIconType
  }

export interface headerIconType {
  onClick: () => void
  icon: JSX.Element
}
  export interface cellType{
    dataKey: dataKeyType
    value?: any
    rowData?: rowDataType
    autocapitalize?: boolean
}

export type cellDataParserFunctions = (input: any, t:TFunction) => string;