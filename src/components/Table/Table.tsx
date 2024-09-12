import { FunctionComponent } from "react";
import styles from "./Table.module.css";
import React from "react";
import { customer, site } from "../../types/sites";
import { columnType } from "../../types/table";
import { TableRowType, onRowClick } from "./TableRow";
import { alarm } from "../../types/equipment";
import { unit } from "../../types/unit";
import { validation, validationObject } from "../../types/validations";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

export type TableType = {
  tableRowElement: React.ComponentType<TableRowType>
  tableColumns: columnType[]
  tableData: site[] | alarm[] | unit[] | customer[] | validation[] | validationObject[] | undefined
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
      
      {  !tableData ? <LoadingIndicator/> :  tableData?.map((s,i) => React.createElement(tableRowElement, {key:i, rowData: s, columns: tableColumns, onRowClick:onRowClick}))}
      </tbody>
      </table>
      </>
    );
};

export default Table;
