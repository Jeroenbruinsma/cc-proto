import { FunctionComponent, useEffect, useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import Table from "../components/Table/Table";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useTranslation } from "react-i18next";
import TableRow from "../components/Table/TableRow";
import { site } from "../types/sites";
import axios from "axios";
import { backendUrl } from "../config";


const SitesPage: FunctionComponent = () => {
  const { t } = useTranslation()

  const [sites, set_sites] = useState<undefined | site[] >(undefined)
  const getSites = async () => {
    try{
      const url = `${backendUrl}/sites`
      const res = await axios.get(url)
      if(res?.data){
        set_sites(res?.data.map( (d:any) => { return {...d, cc_dataConsent: "Yes", cc_siteHealth: "-" }}))
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
    { colName: "Site name", dataKey: "SiteLocation__c", autocapitalize: true},
    { colName: "Operator", dataKey: "Account.Name"},
    { colName: "SLA status", dataKey: "ServiceAgreement__c", autocapitalize: true},
    { colName: "Data consent", dataKey: "cc_dataConsent", autocapitalize: true},
    { colName: "Site health", dataKey: "cc_siteHealth"}
  ]

  return (
    <>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            {/* @ts-ignore */}
            <SubsectionHeader title={t("siteOverview")} center/>
            <Table tableRowElement={TableRow} tableColumns={columns} tableData={sites}/>
        </div>
      </div>
    </>
  );
};

export default SitesPage;
