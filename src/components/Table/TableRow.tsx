import { FunctionComponent } from "react";
import styles from "./Table.module.css";
import { columnType } from "../../types/table";
import React from "react";
import TableCellStandard from "./TableCellStandard";
import { useTranslation } from "react-i18next";


export interface onRowClick{
  onClick: React.MouseEventHandler //TODO missing something?
  dataKey: string
}

export type TableRowType = {
  rowData: any
  columns: columnType[]
  onRowClick?: onRowClick
};

const TableRow: FunctionComponent<TableRowType> = ({
    rowData,
    columns,
    onRowClick
}) => {
  const {t} = useTranslation()
  return (
    <>
      <tr className={styles.tableRow} onClick={ () => onRowClick?.onClick(  rowData?.[onRowClick.dataKey])}>
        {columns.map((c,i) => {
          // parsers below is weird, only the first parser is applied
          const value = c?.parsers ? c?.parsers?.[0](rowData?.[c?.dataKey], t) : rowData?.[c.dataKey]
          if(c?.cellElement){
            return <td key={i}>{React.createElement(c?.cellElement, {c: c})}</td>
          }
          return <td key={i}>{React.createElement(TableCellStandard, {dataKey: value})}</td>
          } 
          )}
      </tr>
    </>
  );
};

export default TableRow;
