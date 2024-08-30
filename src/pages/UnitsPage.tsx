import { FunctionComponent, useEffect, useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../config";
import axios from "axios";
import { columnType } from "../types/table";
import { useTranslation } from "react-i18next";
import Table from "../components/Table/Table";
import TableRow from "../components/Table/TableRow";
import {onRowClick} from "../components/Table/TableRow";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { unit } from "../types/unit";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";


const UnitsPage: FunctionComponent = () => {
  const navigate = useNavigate()
  const params = useParams()
  const {t} = useTranslation()
  const [units, set_units] = useState<undefined | unit[] >(undefined)
  const getUnitsFromSite = async (sitename:string) => {
    try{
      const url = `${backendUrl}/units/${sitename}`
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
    { colName: t("table.columnNames.serialNo"), dataKey: "SerialNumber" },
    { colName: t("table.columnNames.equipmentName"), dataKey: "Name"},
    { colName: t("table.columnNames.equipmentType"), dataKey: "cc__status" },
    { colName: t("table.columnNames.status"), dataKey: "cc__status"},
  ]

  const onRowClick:onRowClick = {
    onClick: (e:any) => navigate(`/unit/${encodeURIComponent(e)}`) ,
    dataKey: "SerialNumber",
  }
  return (
    <>
      <TopHeader showImage={true} />
      <h2>Please use the links below to navigate to the Turku units</h2>
      <ul>
          <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0001')}`)}>1902121-14165-0/0001</li>
          <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0002')}`)}>1902121-14165-0/0002</li>
          <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0003')}`)}>1902121-14165-0/0003</li>
          <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0004')}`)}>1902121-14165-0/0004</li>
          <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0005')}`)}>1902121-14165-0/0005</li>
          <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0006')}`)}>1902121-14165-0/0006</li>
      </ul>
      <br/><br/><br/>
      <h2>The section below is currently being tested</h2>
      <br/><br/>
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            {/* @ts-ignore */}
            <SubsectionHeader title={ `${params?.id} - ${t("siteUnits")}`} center/>
            { units ? 
            <Table tableRowElement={TableRow} tableColumns={columns} tableData={units} onRowClick={onRowClick}/> :
            <LoadingIndicator/> }
        </div>
      </div>
    </>
  );
};

export default UnitsPage;
