import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Table.module.css";
import { columnType } from "../../types/table";
import React from "react";
import TableCellStandard from "./TableCellStandard";

export type TableRowType = {
  rowData: any
  columns: columnType[]
};

const TableRow: FunctionComponent<TableRowType> = ({
    rowData,
    columns    
}) => {
    const navigate = useNavigate();
  return (
    <>
      <tr className={styles.tableRow} onClick={() => navigate("/sites/turku")}>
        {columns.map((c,i) => {
          if(c?.cellElement){
            return <td>{React.createElement(c?.cellElement, {c: c})}</td>
          }
          return <td>{React.createElement(TableCellStandard, {dataKey: rowData?.[c.dataKey]})}</td>
          } 
          )}
      </tr>
    </>
  );
};

export default TableRow;
