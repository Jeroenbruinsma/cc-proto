import { FunctionComponent } from "react";
import styles from "./Table.module.css";
import React from "react";
import { site } from "../../types/sites";

export type TableType = {
  TableRowElement: any
  tableColumns: string[]
  tableData: site[] | undefined
};


const Table: FunctionComponent<TableType> = ({ TableRowElement,tableColumns,tableData }) => {
return ( <>
    <table className={styles.table}>
     <thead className={styles.tableHead}>
      <tr className={styles.tableRow}>
        {tableColumns.map((c, i) => <th key={i} scope="col" className={styles.tableHeader}>{c}</th>) }
      </tr>
    </thead>
    <tbody className={styles.tableBody}>
      {tableData?.map((s) => React.createElement(TableRowElement, {siteName: s?.SiteLocation__c, operator: s["Account.Name"], SLA:"Active", DC:"Yes", siteHealth:"-"}) )}
      </tbody>
      </table>
      </>
    );
};

export default Table;
