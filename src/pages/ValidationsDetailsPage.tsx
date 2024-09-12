import { FunctionComponent, useEffect, useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import Table from "../components/Table/Table";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useTranslation } from "react-i18next";
import TableRow from "../components/Table/TableRow";
import axios from "axios";
import { backendUrl } from "../config";
import {onRowClick} from "../components/Table/TableRow"
import { useParams } from "react-router-dom";
import { columnType } from "../types/table";
import { yesOrNo } from "../helpers";
import { validation } from "../types/validations";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";


const ValidationsDetailsPage: FunctionComponent = () => {
  const { t } = useTranslation()
  const params = useParams()

  const [validationObject, set_validationObject] = useState<undefined | validation >(undefined)
  const getCustomers = async (type: string) => {
    try{
      const url = `${backendUrl}/validator/details/${type}`
      const res = await axios.get(url)
      if(res?.data ){
        set_validationObject(res?.data)
      }else{
        set_validationObject(undefined)
      }
    }
    catch(err){
      console.log("err",err)
    }
  }
  useEffect(()=> {
    if(params?.id){
      getCustomers(params?.id)
    }else{
      set_validationObject(undefined)
    }
    
  }, [params?.id])

  const yesOrNoOfAllKeys = (b: any) => {
    return <ul>{Object.keys(b).map(u => <li>{`${u}: ${yesOrNo( b?.[u],t)} ` }</li>)}</ul>
  }

  const columns: columnType[] = [
    { colName: "Object id", dataKey: "sfdc_tag"},
    { colName: "Object value", dataKey: "sfdc_value"},
    { colName: "Validation Result", dataKey: "object_validation_result", parsers: [yesOrNo]},
    //@ts-ignore  cannot return a list into a td
    { colName: "Validation Result", dataKey: "validation_result", parsers: [yesOrNoOfAllKeys]},
  ]

  const onRowClick:onRowClick = {
    onClick: (_:any) => undefined, //navigate(`/validationdetails/${e}`) ,
    dataKey: "Id",
  }
  
  return (
    <>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            <SubsectionHeader title={t("validationsPage")} center/>
            {validationObject? <h3>Object Id {params?.id}</h3> : null }
            {validationObject? <h3>Object type: {validationObject?.sfdcObjectType}</h3> : null }
            {validationObject? <h3>Object passes all validations: {yesOrNo(validationObject?.object_validation_result,t )}</h3>: null }
            { !validationObject?.validations ? <LoadingIndicator/> : 
              <Table tableRowElement={TableRow} tableColumns={columns} tableData={validationObject?.validations} onRowClick={onRowClick}/>
            }
        </div>
      </div>
    </>
  );
};

export default ValidationsDetailsPage;
