import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Table.module.css";

export type TableType = {
  className?: string;
};


const Table: FunctionComponent<TableType> = ({ className = "" }) => {
  const navigate = useNavigate();
  return (
    <footer
      className={[styles.table, className].join(" ")}
      onClick={() => navigate("/unit/123")}
    >
      <div className={styles.subsectionHeader}>
        <div className={styles.titleplussince}>
          <b className={styles.kpiStatistics}>Site overview</b>
        </div>
        <div className={styles.titleSeparator}>
          <div className={styles.titleSeparatorChild} />
        </div>
      </div>

      <div className={styles.tableheader}>

        <div className={styles.headercell1}>
          <div className={styles.headertextWrapper}>
            <b className={styles.headertext}>Site name</b>
          </div>
        </div>
       
        <div className={styles.headercell2}>
          <div className={styles.headertextContainer}>
            <b className={styles.headertext1}>Operator</b>
          </div>
        </div> 
                    <div className={styles.headercell3}>
                    <div className={styles.headertextFrame}>
                        <b className={styles.headertext2}>HeaderText</b>
                    </div>
                    </div> 
        <div className={styles.headercell4}>
          <div className={styles.frameDiv}>
            <b className={styles.headertext3}>SLA Status</b>
          </div>
        </div>
        <div className={styles.headercell5}>
          <div className={styles.headertextWrapper1}>
            <b className={styles.headertext4}>Data consent</b>
          </div>
        </div>
        <div className={styles.headercell6}>
          <div className={styles.headertextWrapper2}>
            <b className={styles.headertext5}>Site health</b>
          </div>
        </div> 
      </div>
      <img
        className={styles.tableChild}
        loading="lazy"
        alt=""
        src="/line-14.svg"
      />
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
      <div className={styles.tablerow1}>
        <div className={styles.tablecell11}>
          <div className={styles.celltextWrapper3}>
            <div className={styles.celltext5}>Narvik</div>
          </div>
        </div>
        <div className={styles.tablecell21}>
          <div className={styles.celltextWrapper4}>
            <div className={styles.celltext6}>LKAB</div>
          </div>
        </div>
        <div className={styles.tablecell31}>
          <div className={styles.celltextWrapper5}>
            <div className={styles.celltext7}>Active</div>
          </div>
        </div>
        <div className={styles.tablecell41}>
          <div className={styles.celltextWrapper6}>
            <div className={styles.celltext8}>Yes</div>
          </div>
        </div>
        <div className={styles.tablecell52}>
          <div className={styles.indicatortextContainer}>
            <div className={styles.indicatortext1}>
              <img
                className={styles.indicatorbollsmallIcon1}
                loading="lazy"
                alt=""
                src="/indicatorbollsmall-1.svg"
              />
              <div className={styles.average}>Average</div>
            </div>
          </div>
        </div>
        <div className={styles.tablecell53}>
          <div className={styles.celltextWrapper7}>
            <div className={styles.celltext9}>CellText_6</div>
          </div>
        </div>
      </div>
      <div className={styles.tablerow2}>
        <div className={styles.tablecell12}>
          <div className={styles.celltextWrapper8}>
            <div className={styles.celltext10}>Helsinki LJ7</div>
          </div>
        </div>
        <div className={styles.tablecell22}>
          <div className={styles.celltextWrapper9}>
            <div className={styles.celltext11}>Gov</div>
          </div>
        </div>
        <div className={styles.tablecell32}>
          <div className={styles.celltextWrapper10}>
            <div className={styles.celltext12}>Active</div>
          </div>
        </div>
        <div className={styles.tablecell42}>
          <div className={styles.celltextWrapper11}>
            <div className={styles.celltext13}>Yes</div>
          </div>
        </div>
        <div className={styles.tablecell54}>
          <div className={styles.indicatortextFrame}>
            <div className={styles.indicatortext2}>
              <img
                className={styles.indicatorbollsmallIcon2}
                loading="lazy"
                alt=""
                src="/indicatorbollsmall.svg"
              />
              <div className={styles.functional}>Good</div>
            </div>
          </div>
        </div>
        <div className={styles.tablecell55}>
          <div className={styles.celltextWrapper12}>
            <div className={styles.celltext14}>CellText_6</div>
          </div>
        </div>
      </div>
      <div className={styles.tablerow3}>
        <div className={styles.tablecell13}>
          <div className={styles.celltextWrapper13}>
            <div className={styles.celltext15}>Chess locks</div>
          </div>
        </div>
        <div className={styles.tablecell23}>
          <div className={styles.celltextWrapper14}>
            <div className={styles.celltext16}>Wightlink</div>
          </div>
        </div>
        <div className={styles.tablecell33}>
          <div className={styles.celltextWrapper15}>
            <div className={styles.celltext17}>Due for Renewal</div>
          </div>
        </div>
        <div className={styles.tablecell43}>
          <div className={styles.celltextWrapper16}>
            <div className={styles.celltext18}>Yes</div>
          </div>
        </div>
        <div className={styles.tablecell56}>
          <div className={styles.indicatortextWrapper1}>
            <div className={styles.indicatortext3}>
              <img
                className={styles.indicatorbollsmallIcon3}
                alt=""
                src="/indicatorbollsmall-3.svg"
              />
              <div className={styles.functional1}>Average</div>
            </div>
          </div>
        </div>
        <div className={styles.tablecell57}>
          <div className={styles.celltextWrapper17}>
            <div className={styles.celltext19}>CellText_6</div>
          </div>
        </div>
      </div>
      <div className={styles.tablerow4}>
        <div className={styles.tablecell14}>
          <div className={styles.celltextWrapper18}>
            <div className={styles.celltext20}>Texel port</div>
          </div>
        </div>
        <div className={styles.tablecell24}>
          <div className={styles.celltextWrapper19}>
            <div className={styles.celltext21}>XX Ferries</div>
          </div>
        </div>
        <div className={styles.tablecell34}>
          <div className={styles.celltextWrapper20}>
            <div className={styles.celltext22}>Inactive</div>
          </div>
        </div>
        <div className={styles.tablecell44}>
          <div className={styles.celltextWrapper21}>
            <div className={styles.celltext23}>No</div>
          </div>
        </div>
        <div className={styles.tablecell58}>
          <div className={styles.indicatortextWrapper2}>
            <div className={styles.indicatortext4}>
              <img
                className={styles.indicatorbollsmallIcon4}
                loading="lazy"
                alt=""
                src="/indicatorbollsmall-4.svg"
              />
              <div className={styles.offline}>Offline</div>
            </div>
          </div>
        </div>
        <div className={styles.tablecell59}>
          <div className={styles.celltextWrapper22}>
            <div className={styles.celltext24}>CellText_6</div>
          </div>
        </div>
      </div>
      <div className={styles.tablerow5}>
        <div className={styles.tablecell15}>
          <div className={styles.celltextWrapper23}>
            <div className={styles.celltext25}>Leivag</div>
          </div>
        </div>
        <div className={styles.tablecell25}>
          <div className={styles.celltextWrapper24}>
            <div className={styles.celltext26}>Fjord1</div>
          </div>
        </div>
        <div className={styles.tablecell35}>
          <div className={styles.celltextWrapper25}>
            <div className={styles.celltext27}>Active</div>
          </div>
        </div>
        <div className={styles.tablecell45}>
          <div className={styles.celltextWrapper26}>
            <div className={styles.celltext28}>Yes</div>
          </div>
        </div>
        <div className={styles.tablecell510}>
          <div className={styles.indicatortextWrapper3}>
            <div className={styles.indicatortext5}>
              <img
                className={styles.indicatorbollsmallIcon5}
                loading="lazy"
                alt=""
                src="/indicatorbollsmall-5.svg"
              />
              <div className={styles.poor}>Poor</div>
            </div>
          </div>
        </div>
        <div className={styles.tablecell511}>
          <div className={styles.celltextWrapper27}>
            <div className={styles.celltext29}>CellText_6</div>
          </div>
        </div>
      </div>
      <div className={styles.show5MoreParent}>
        <b className={styles.show5More}>Show more</b>
        <img className={styles.frameChild} alt="" src="/vector-18.svg" />
      </div>
    </footer>
  );
};

export default Table;
