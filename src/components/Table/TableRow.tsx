import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Table.module.css";
import { capitalizeFirstLetter } from "../../helpers";
import { columnType } from "../../types/table";

export type TableType = {
  className?: string;
  siteName: string;
  operator: string;
  SLA: string;
  DC: string;
  siteHealth: string;
  rowData: any
  columns: columnType[]
};

const TableRow: FunctionComponent<TableType> = ({
    rowData,
    columns
}) => {
    const navigate = useNavigate();
  return (
    <>
      <tr className={styles.tableRow} onClick={() => navigate("/sites/turku")}>
        {columns.map((c,i) => {
            return <td key={i} className={styles.tableData}>{ 
                c?.autocapitalize ? capitalizeFirstLetter( rowData?.[c.dataKey] ) : rowData?.[c.dataKey] 
                }</td>} )}
      </tr>
    </>
  );
};


export default TableRow;
