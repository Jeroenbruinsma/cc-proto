import { FunctionComponent, useCallback, useState } from "react";
import styles from "./KpiBox.module.css";
// import DoubleArrow from "../DoubleArrow/DoubleArrow";
import { Children } from 'react';

export type KpiBoxType = {
  className?: string;
  children: any
};

const KpiBox: FunctionComponent<KpiBoxType> = ({ className = "", children }) => {
  const [page , set_page] = useState(0)
  const pageUp  = useCallback(()=>{
    set_page(Math.min( page + defaultKpiBoxCount, children.length - defaultKpiBoxCount -1 ))
  },[children, page])
  
  const pageDown  = useCallback(()=>{
    set_page(Math.max( page -defaultKpiBoxCount -1, defaultKpiBoxCount))
  },[children, page])
  
  const defaultKpiBoxCount = 5
  
  const displayChildren =  Children.toArray(children).filter(( _:any ,i: number) => i < defaultKpiBoxCount)
  return (
    <div className={[styles.kpiBox, className].join(" ")}>
      <div className={styles.metricNavigation}>
        <div className={styles.doubleArrow}>
          <div className={styles.singleArrowright} onClick={ pageDown}>
            {/* <DoubleArrow direction="left" visible={page !== defaultKpiBoxCount}/> */}
          </div>
        </div>
      </div>
      {displayChildren}
     
      <div className={styles.metricNavigation}>
        <div className={styles.doubleArrow}>
          <div className={styles.singleArrowright} onClick={ pageUp}>
            {/* <DoubleArrow direction="right" visible={page !== children.length -1 - defaultKpiBoxCount}/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiBox;
