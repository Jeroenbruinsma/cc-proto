import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Table.module.css";
import axios from "axios";
import { site } from "../../types/sites";
import React from "react";

export type TableType = {
  className?: string;
  TableRowElement: any
};


const Table: FunctionComponent<TableType> = ({ className = "", TableRowElement}) => {
  const [sites, set_sites] = useState<undefined | site[] >(undefined)
  const getSites = async () => {
    try{
      const url = `http://127.0.0.1:5000/sites`
      const res = await axios.get(url)
      if(res?.data){
        set_sites(res?.data)
      }else{
        set_sites(undefined)
      }
    }
    catch(err){
      console.log("err",err)
    }
  }
  useEffect(()=> {
    getSites()
  }, [])


  const columns = [
    "Site name",
    "Operator",
    "SLA status",
    "Data consent",
    "Site health"]

return ( <>
    <table className={styles.table}>
     <thead className={styles.tableHead}>
      <tr className={styles.tableRow}>
        {columns.map((c, i) => <th key={i} scope="col" className={styles.tableHeader}>{c}</th>) }
      </tr>
    </thead>
    <tbody className={styles.tableBody}>
      {sites?.map((s) => React.createElement(TableRowElement, {siteName: s?.SiteLocation__c, operator: s["Account.Name"], SLA:"Active", DC:"Yes", siteHealth:"-"}) )}
      </tbody>
      </table>
      
      </>
    );
};

export default Table;
