import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Table.module.css";
import TableRow from "./TableRow";
import axios from "axios";
import { site } from "../../types/sites";

export type TableType = {
  className?: string;
};


const Table: FunctionComponent<TableType> = ({ className = "" }) => {
  const navigate = useNavigate();
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

  console.log("site",sites)
  return ( <>
    <table className={styles.table}>
     <thead className={styles.tableHead}>
      <tr className={styles.tableRow}>
        <th scope="col" className={styles.tableHeader}>Site name</th>
        <th scope="col" className={styles.tableHeader}>Operator</th>
        <th scope="col" className={styles.tableHeader}>SLA status</th>
        <th scope="col" className={styles.tableHeader}>Data consent</th>
        <th scope="col" className={styles.tableHeader}>Site health</th>
      </tr>
    </thead>
    <tbody className={styles.tableBody}>
      {sites?.map( (s,i)  => <TableRow key={i} siteName={s?.SiteLocation__c} operator={s["Account.Name"]} SLA="Active" DC="Yes" siteHealth="-"/>
      )}
    </tbody>
  </table>

    </>
  );
};

export default Table;
