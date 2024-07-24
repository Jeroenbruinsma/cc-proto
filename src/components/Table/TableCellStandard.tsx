import { capitalizeFirstLetter } from "../../helpers";
import styles from "./Table.module.css";
import { cellType } from "../../types/table";

export default function TableCellStandard({dataKey,autocapitalize }:cellType) {
  return (
    <td className={styles.tableData}>{ 
        autocapitalize ? capitalizeFirstLetter(dataKey ) : dataKey
        }</td>
  )
}
