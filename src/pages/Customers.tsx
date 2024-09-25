import { FunctionComponent, useEffect, useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import Table from "../components/Table/Table";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useTranslation } from "react-i18next";
import TableRow, { onRowClickConfig } from "../components/Table/TableRow";
import { customer } from "../types/sites";
import axios from "axios";
import { backendUrl } from "../config";
import {onRowClick} from "../components/Table/TableRow"
import { useNavigate } from "react-router-dom";
import { columnType } from "../types/table";
import { yesOrNo } from "../helpers";
import DataQualityCell from "../components/Table/DataQualityCell";


const CustomersPage: FunctionComponent = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [sites, set_sites] = useState<undefined | customer[] >(undefined)
  const getCustomers = async () => {
    try{
      const url = `${backendUrl}/customers`
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
    getCustomers()
  }, [])

  const columns: columnType[] = [
    { colName: t("table.columnNames.operator"), dataKey: "Account.Name"},
    { colName: t("table.columnNames.dataConsent"), dataKey: "cc__dataConsent", autocapitalize: true, parsers: [yesOrNo]},
    { colName: t("table.columnNames.unitCount"), dataKey: "cc__unit_count"},
    { colName: t("table.columnNames.dataValidation"), dataKey: "cc__data_validation_passed" , cellElement: DataQualityCell }
  ]


  
  const onRowClick:onRowClickConfig = {
    onClick: ({dataKey}:onRowClick): void => {
      navigate(`/customers/${encodeURIComponent(dataKey)}`)
    },    
    dataKey: "Account.Id",
  }

  return (
    <>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            {/* @ts-ignore */}
            <SubsectionHeader title={t("customersOverview")} center/>
            <Table tableRowElement={TableRow} tableColumns={columns} tableData={sites} onRowClick={onRowClick}/>
        </div>
      </div>
    </>
  );
};

export default CustomersPage;
