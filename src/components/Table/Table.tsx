import { FunctionComponent } from "react";
import styles from "./Table.module.css";
import React from "react";
import { site } from "../../types/sites";
import { columnType } from "../../types/table";
import { TableRowType, onRowClick } from "./TableRow";
import { alarm } from "../../types/equipment";
import { unit } from "../../types/unit";

export type TableType = {
  tableRowElement: React.ComponentType<TableRowType>
  tableColumns: columnType[]
  tableData: site[] | alarm[] | unit[] | undefined
  onRowClick?: onRowClick
};


const Table: FunctionComponent<TableType> = ({ tableRowElement,tableColumns,tableData, onRowClick}) => {
return ( <>
    <table className={styles.table}>
     <thead className={styles.tableHead}>
      <tr className={styles.tableRow}>
        {tableColumns.map((c, i) => <th key={i} scope="col" className={styles.tableHeader}>{c.colName}</th>) }
      </tr>
    </thead>
    <tbody className={styles.tableBody}>
      {tableData?.map((s,i) => React.createElement(tableRowElement, {key:i, rowData: s, columns: tableColumns, onRowClick:onRowClick}))}
      </tbody>
      </table>
      </>
    );
};

export default Table;
