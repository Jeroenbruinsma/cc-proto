import { capitalizeFirstLetter } from "../../helpers";
import styles from "./Table.module.css";
import { cellType } from "../../types/table";

export default function TableCellStandard({value,autocapitalize}:cellType) {
  return (
    <td className={styles.tableData}>{ 
        autocapitalize === false ? value : capitalizeFirstLetter(value )
        }</td>
  )
}
