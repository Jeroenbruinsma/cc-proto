import { FunctionComponent, useEffect, useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import Table from "../components/Table/Table";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useTranslation } from "react-i18next";
import TableRow, { onRowClickConfig } from "../components/Table/TableRow";
import { site } from "../types/sites";
import {onRowClick} from "../components/Table/TableRow"
import { useNavigate } from "react-router-dom";
import { columnType } from "../types/table";
import { emptyDash, yesOrNo } from "../helpers";
import DataQualityCell from "../components/Table/DataQualityCell";
import { useAuth } from "../AuthProvider";
import * as Sentry from "@sentry/react";


const SitesPage: FunctionComponent = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {get} =  useAuth()

  const [sites, set_sites] = useState<undefined | site[] >(undefined)
  const getSites = async () => {
    try{
      const res = await get("/sites")
      if(res?.data){
        set_sites(res?.data.map( (d:any) => { return {...d, cc__siteHealth: "-" }}))
      }else{
        set_sites(undefined)
      }
    }
    catch(err){
      Sentry.captureException(err)
      console.log("err",err)
    }
  }
  useEffect(()=> {
    getSites()
  }, [])
  const columns: columnType[] = [
    { colName: t("table.columnNames.operator"), dataKey: "account_Name"},
    { colName: t("table.columnNames.siteName"), dataKey: "asset_SiteLocation__c", autocapitalize: true},
    { colName: t("table.columnNames.slaStatus"), dataKey: "asset_ServiceAgreement__c", autocapitalize: true, parsers: [emptyDash]},
    { colName: t("table.columnNames.dataConsent"), dataKey: "cc__dataConsent", autocapitalize: true, parsers: [yesOrNo]},
    { colName: t("table.columnNames.siteHealth"), dataKey: "cc__siteHealth"},
    { colName: t("table.columnNames.dataValidationAccount"), dataKey: "cc__data_validation_passed" , cellElement: DataQualityCell } //; parsers: [yesOrNo]}
  ]

  const onRowClick:onRowClickConfig = {
    onClick: ({dataKey}:onRowClick): void => {
      navigate(`/sites/${encodeURIComponent(dataKey)}`)
    }
  ,
    dataKey: "asset_SiteLocation__c",
  }
  return (
    <>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            {/* @ts-ignore */}
            <SubsectionHeader title={t("accountOverview")} center/>
            <Table tableRowElement={TableRow} tableColumns={columns} tableData={sites} onRowClick={onRowClick}/>
        </div>
      </div>
    </>
  );
};

export default SitesPage;
