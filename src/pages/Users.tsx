import { FunctionComponent, useEffect, useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import Table from "../components/Table/Table";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useTranslation } from "react-i18next";
import TableRow, { onRowClickConfig } from "../components/Table/TableRow";
import {onRowClick} from "../components/Table/TableRow"
import { columnType } from "../types/table";
import { user } from "../types/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import * as Sentry from "@sentry/react";


const UsersPage: FunctionComponent = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [sites, set_sites] = useState<undefined | user[] >(undefined)
  const { get } = useAuth()
  const getCustomers = async () => {
    try{
      const url = `/users`
      //@ts-ignore
      const res = await get(url)
      if(res?.data){
        set_sites(res?.data)
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
    getCustomers()
  }, [])

  const columns: columnType[] = [
   { colName: t("table.columnNames.username"), dataKey: "Username"},
   { colName: t("table.columnNames.country"), dataKey: "Country"},
   { colName: t("table.columnNames.salesCenter"), dataKey: "SalesCenter__c"},
   { colName: t("table.columnNames.timezone"), dataKey: "TimeZoneSidKey"},
  ]


  const onRowClick:onRowClickConfig = {
    onClick: ({dataKey}:onRowClick): void => { 
      navigate(`/user/${encodeURIComponent(dataKey)}`)
    },    
    dataKey: "Id",
  }
  return (
    <>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            {/* @ts-ignore */}
            <SubsectionHeader title={t("usersOverview")} center/>
            <Table tableRowElement={TableRow} tableColumns={columns} tableData={sites} onRowClick={onRowClick}/>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
