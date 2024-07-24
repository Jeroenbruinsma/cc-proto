export interface columnType extends cellType{
    colName: string 
    cellElement?: React.ComponentType<any>
  }
  
  export interface cellType{
    dataKey: string
    autocapitalize?: boolean
}