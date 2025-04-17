import { FunctionComponent, useEffect, useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import { useNavigate, useParams } from "react-router-dom";
import { columnType } from "../types/table";
import { useTranslation } from "react-i18next";
import Table from "../components/Table/Table";
import TableRow, { onRowClickConfig } from "../components/Table/TableRow";
import {onRowClick} from "../components/Table/TableRow";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { unit } from "../types/unit";
import {customer} from "../types/sites"
import DataQualityCell from "../components/Table/DataQualityCell";
import { useAuth } from "../AuthProvider";

const CustomersDetailPage: FunctionComponent = () => {
  const navigate = useNavigate()
  const params = useParams()
  const {t} = useTranslation()
  const [units, set_units] = useState<undefined | unit[] >(undefined)
  const [customer, set_customer] = useState<undefined | customer >(undefined)
  const {get} = useAuth()
  
  const getUnitsFromSite = async (accountId:string) => {
    try{
      const url = `/customers/units/${accountId}`
      //@ts-ignore
      const res = await get(url)
      if(res?.data){
        set_units(res?.data.map( (d:any) => { return {...d, cc__status: "-" }}))
      }else{
        set_units(undefined)
      }
    }
    catch(err){
      console.log("err",err)
    }
  }
  const getCustomerInfo = async (accountId:string) => {
    try{
      const url = `/customers/${accountId}`
      //@ts-ignore
      const res = await get(url)
      if(res?.data){
       set_customer(res.data)
      }else{
        set_customer(undefined)
      }
    }
    catch(err){
      console.log("err",err)
    }
  }
  useEffect(()=> {
    if(params?.id){
      getUnitsFromSite(params?.id)
      getCustomerInfo(params?.id)
    }
  }, [params?.id])
  
  const columns: columnType[] = [
    { colName: t("table.columnNames.serialNo"), dataKey: "asset_SerialNumber" },
    { colName: t("table.columnNames.equipmentName"), dataKey: "asset_Name"},
    { colName: t("table.columnNames.equipmentType"), dataKey: "cc__status" },
    { colName: t("table.columnNames.status"), dataKey: "cc__status"},
    { colName: t("table.columnNames.dataValidation"), dataKey: "cc__data_validation_passed" , cellElement: DataQualityCell }
  ]

  const onRowClick:onRowClickConfig = {
    onClick: ({dataKey}:onRowClick): void => {
      if(dataKey){
        navigate(`/unit/${encodeURIComponent(dataKey)}`)
      }
    },
    dataKey: "asset_SerialNumber",
  }

  return (
    <>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            <SubsectionHeader title={ `${customer?.["Account.Name"]} - ${t("siteUnits")}`} center/>
            <Table tableRowElement={TableRow} tableColumns={columns} tableData={units} onRowClick={onRowClick}/>
        </div>
      </div>
    </>
  );
};

export default CustomersDetailPage;
