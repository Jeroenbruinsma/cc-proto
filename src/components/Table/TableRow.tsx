import { FunctionComponent } from "react";
// import { useNavigate } from "react-router-dom";
import styles from "./TableRow.module.css";

export type TableType = {
  className?: string;
};


const TableRow: FunctionComponent<TableType> = ({ className = "" }) => {
//   const navigate = useNavigate();
  return (
     
      <div className={styles.tablerow0}>
        <div className={styles.tablecell1}>
          <div className={styles.celltextWrapper}>
            <div className={styles.celltext}>Hatvik</div>
          </div>
        </div>
        <div className={styles.tablecell2}>
          <div className={styles.celltextContainer}>
            <div className={styles.celltext1}>Fjord1</div>
          </div>
        </div>
        <div className={styles.tablecell3}>
          <div className={styles.celltextFrame}>
            <div className={styles.celltext2}>Active</div>
          </div>
        </div>
        <div className={styles.tablecell4}>
          <div className={styles.celltextWrapper1}>
            <div className={styles.celltext3}>Yes</div>
          </div>
        </div>
        <div className={styles.tablecell5}>
          <div className={styles.indicatortextWrapper}>
            <div className={styles.indicatortext}>
              <img
                className={styles.indicatorbollsmallIcon}
                loading="lazy"
                alt=""
                src="/indicatorbollsmall.svg"
              />
              <div className={styles.good}>Good</div>
            </div>
          </div>
        </div>
        <div className={styles.tablecell51}>
          <div className={styles.celltextWrapper2}>
            <div className={styles.celltext4}>CellText_6</div>
          </div>
        </div>
      </div>
     
  );
};

export default TableRow;
