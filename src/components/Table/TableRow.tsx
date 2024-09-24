import { FunctionComponent } from "react";
import styles from "./Table.module.css";
import { columnType, dataKeyType } from "../../types/table";
import React from "react";
import TableCellStandard from "./TableCellStandard";
import { useTranslation } from "react-i18next";


export interface onRowClick{
  columns: columnType[]
  dataKey: dataKeyType | ""
  rowData: rowDataType
}

export type rowColorParserFunctionType = (rowData : rowDataType)=>  string | undefined //should be color! 

export type rowDataType = any 

export type TableRowType = {
  rowData: rowDataType
  columns: columnType[]
  onRowClick: onRowClickConfig
  rowColorParser?: rowColorParserFunctionType
};

export  interface onRowClickConfig{
  onClick: ({}:onRowClick) => void
  dataKey: dataKeyType
}

const TableRow: FunctionComponent<TableRowType> = ({
    rowData,
    columns,
    onRowClick,
    rowColorParser
}) => {
  
  const {t} = useTranslation()
  const highlite = rowColorParser ? rowColorParser(rowData) : ""
  return (
    <>
      <tr className={[styles.tableRow, styles[highlite ? highlite : ""]].join(" ")} 
          onClick={ () => onRowClick?.onClick( { dataKey: rowData?.[onRowClick.dataKey], columns, rowData})}>
        {columns.map((c,i) => {
          // parsers below is weird, only the first parser is applied
          const value = c?.parsers ? c?.parsers?.[0](rowData?.[c?.dataKey], t) : rowData?.[c.dataKey]
          if(c?.cellElement){
            return <td key={i}>{React.createElement(c?.cellElement, {dataKey: c?.dataKey, value, rowData })}</td>
          }
          return <td key={i}>{React.createElement(TableCellStandard, {dataKey: c?.dataKey, value, rowData })}</td>
          } 
          )}
      </tr>
    </>
  );
};

export default TableRow;
