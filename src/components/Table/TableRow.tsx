import { FunctionComponent } from "react";
// import { useNavigate } from "react-router-dom";
import styles from "./Table.module.css";

export type TableType = {
  className?: string;
  siteName: string;
  operator: string;
  SLA: string;
  DC: string;
  siteHealth: string;
};

const TableRow: FunctionComponent<TableType> = ({
  className = "",
  siteName,
  operator,
  SLA,
  DC,
  siteHealth,
}) => {
  //   const navigate = useNavigate();
  return (
    <>
      <tr className={styles.tableRow}>
        <th className={styles.tableData}>{siteName}</th>
        <td className={styles.tableData}>{operator}</td>
        <td className={styles.tableData}>{SLA}</td>
        <td className={styles.tableData}>{DC}</td>
        <td className={styles.tableData}>{siteHealth}</td>
      </tr>
    </>
  );
};


export default TableRow;
