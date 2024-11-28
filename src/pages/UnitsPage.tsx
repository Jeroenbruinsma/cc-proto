import { FunctionComponent, useEffect, useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../config";
import axios from "axios";
import { columnType } from "../types/table";
import { useTranslation } from "react-i18next";
import Table from "../components/Table/Table";
import TableRow, { onRowClickConfig } from "../components/Table/TableRow";
import {onRowClick} from "../components/Table/TableRow";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { unit } from "../types/unit";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import InfoBox from "../components/InfoBox/InfoBox";
import DataQualityCell from "../components/Table/DataQualityCell";
import { emptyDash } from "../helpers";


const UnitsPage: FunctionComponent = () => {
  const navigate = useNavigate()
  const params = useParams()
  const {t} = useTranslation()
  const [units, set_units] = useState<undefined | unit[] >(undefined)
  const getUnitsFromSite = async (sitename:string) => {
    try{
      const url = `${backendUrl}/units/${encodeURIComponent(sitename)}`
      const res = await axios.get(url)
      
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
  useEffect(()=> {
    if(params?.id){
      getUnitsFromSite(params?.id)
    }
  }, [params?.id])
  
  const columns: columnType[] = [
    { colName: t("table.columnNames.serialNo"), dataKey: "asset_SerialNumber",  parsers: [emptyDash] },
    { colName: t("table.columnNames.equipmentName"), dataKey: "asset_Name"},
    { colName: t("table.columnNames.equipmentType"), dataKey: "cc__status" },
    { colName: t("table.columnNames.status"), dataKey: "cc__status"},
    { colName: t("table.columnNames.dataValidation"), dataKey: "cc__data_validation_passed" , cellElement: DataQualityCell }
  ]

  const onRowClick:onRowClickConfig = {
    onClick: ({dataKey,rowData}:onRowClick): void => {
      if(!rowData?.cc__data_validation_passed){
        return navigate(`/validationdetails/${encodeURIComponent(rowData?.["asset_Id"])}?reason=navigation`)
      }
      navigate(`/unit/${encodeURIComponent(dataKey)}`)
    },    
    dataKey: "asset_SerialNumber",
  }
  return (
    <>
      <TopHeader showImage={true} />
      <br/><br/>
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            {/* @ts-ignore */}
            <SubsectionHeader title={ `${params?.id} - ${t("siteUnits")}`} center/>
            <InfoBox type={"sitesPageTesting"}/>
            { units ? 
            <Table tableRowElement={TableRow} tableColumns={columns} tableData={units} onRowClick={onRowClick}/> :
            <LoadingIndicator/> }
        </div>
      </div>
    </>
  );
};

export default UnitsPage;
