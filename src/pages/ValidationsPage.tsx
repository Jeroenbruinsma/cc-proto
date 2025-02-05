import { FunctionComponent, useEffect, useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import Table from "../components/Table/Table";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useTranslation } from "react-i18next";
import TableRow, { onRowClickConfig } from "../components/Table/TableRow";
import axios from "axios";
import { backendUrl } from "../config";
import {onRowClick} from "../components/Table/TableRow"
import { useNavigate, useParams } from "react-router-dom";
import { columnType } from "../types/table";
import { yesOrNo} from "../helpers";
import { validation } from "../types/validations";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import KpiBox from "../components/KpiBox/KpiBox";
import MetricBox from "../components/MetricBox/MetricBox";
import ErrorBoundary from "../components/ErrorBoundry/ErrorBoundry";

interface apiResponse{
  items: validation[]
  item_count: number
  passed: number
}

const ValidationsPage: FunctionComponent = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()


  const [validationInfo, set_validationInfo] = useState<undefined | apiResponse >(undefined)
  const getValidationInfo = async (type: string) => {
    try{
      const url = `${backendUrl}/validator/${type}`
      const res = await axios.get(url)
      if(res?.data){
        set_validationInfo(res?.data)
      }else{
        set_validationInfo(undefined)
      }
    }
    catch(err){
      console.log("err",err)
    }
  }
  useEffect(()=> {
    if(params?.id){
      getValidationInfo(params?.id)
    }else{
      set_validationInfo(undefined)
    }
    
  }, [params?.id])

  const columns: columnType[] = [
    { colName: "OBJECT ID", dataKey: "id"},
    { colName: "sfdcObjectType", dataKey: "sfdcObjectType", autocapitalize: true},
    { colName: "object_validation_result PASSED", dataKey: "object_validation_result",  parsers: [yesOrNo]},
  ]

  const onRowClick:onRowClickConfig = {
    onClick: ({dataKey}:onRowClick): void => {
      navigate(`/validationdetails/${encodeURIComponent(dataKey)}`)
    }, 
    dataKey: "id",
  }

  return (
    <>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            <SubsectionHeader title={t("validationsPage")} center/>
            {!validationInfo ? 
              <LoadingIndicator/> : 
              <Table tableRowElement={TableRow} tableColumns={columns} tableData={validationInfo?.items} onRowClick={onRowClick}/>
            }
            <ErrorBoundary>
            {!validationInfo ? 
              <LoadingIndicator/> :  <KpiBox>
              <MetricBox metricValue={`${validationInfo?.item_count}`} metricName='total item Count' className=""/>
              <MetricBox metricValue={`${validationInfo?.passed}`} metricName='Items passed in current set' className=""/>
            </KpiBox>
             }
            </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default ValidationsPage;
