import { FunctionComponent, useEffect, useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import Table from "../components/Table/Table";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useTranslation } from "react-i18next";
import TableRow from "../components/Table/TableRow";
import { site } from "../types/sites";
import axios from "axios";
import { backendUrl } from "../config";
import {onRowClick} from "../components/Table/TableRow"
import { useNavigate } from "react-router-dom";
import { columnType } from "../types/table";


const SitesPage: FunctionComponent = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

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

  const columns: columnType[] = [
    { colName: t("table.columnNames.siteName"), dataKey: "SiteLocation__c", autocapitalize: true},
    { colName: t("table.columnNames.operator"), dataKey: "Account.Name"},
    { colName: t("table.columnNames.slaStatus"), dataKey: "ServiceAgreement__c", autocapitalize: true},
    { colName: t("table.columnNames.dataConsent"), dataKey: "cc_dataConsent", autocapitalize: true},
    { colName: t("table.columnNames.siteHealth"), dataKey: "cc_siteHealth"}
  ]

  const onRowClick:onRowClick = {
    onClick: (e:any) => navigate(`/sites/${e}`) ,
    dataKey: "SiteLocation__c",
  }

  return (
    <>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            {/* @ts-ignore */}
            <SubsectionHeader title={t("siteOverview")} center/>
            <Table tableRowElement={TableRow} tableColumns={columns} tableData={sites} onRowClick={onRowClick}/>
        </div>
      </div>
    </>
  );
};

export default SitesPage;
