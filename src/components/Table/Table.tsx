import { FunctionComponent } from "react";
import styles from "./Table.module.css";
import React from "react";
import { site } from "../../types/sites";
import { columnType } from "../../types/table";
import { TableRowType } from "./TableRow";

export type TableType = {
  tableRowElement: React.ComponentType<TableRowType>
  tableColumns: columnType[]
  tableData: site[] | undefined
};


const Table: FunctionComponent<TableType> = ({ tableRowElement,tableColumns,tableData }) => {
return ( <>
    <table className={styles.table}>
     <thead className={styles.tableHead}>
      <tr className={styles.tableRow}>
        {tableColumns.map((c, i) => <th key={i} scope="col" className={styles.tableHeader}>{c.colName}</th>) }
      </tr>
    </thead>
    <tbody className={styles.tableBody}>
      {tableData?.map((s) => React.createElement(tableRowElement, {rowData: s, columns: tableColumns}))}
      </tbody>
      </table>
      </>
    );
};

export default Table;
