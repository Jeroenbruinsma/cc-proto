import { FunctionComponent, useEffect, useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import Table from "../components/Table/Table";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useTranslation } from "react-i18next";
import TableRow from "../components/Table/TableRow";
import { site } from "../types/sites";
import axios from "axios";


const SitesPage: FunctionComponent = () => {
  const { t } = useTranslation()

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

  return (
    <>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            {/* @ts-ignore */}
            <SubsectionHeader title={t("siteOverview")} center/>
            <Table TableRowElement={TableRow} tableColumns={columns} tableData={sites}/>
        </div>
      </div>
    </>
  );
};

export default SitesPage;
