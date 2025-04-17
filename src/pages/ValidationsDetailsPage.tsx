import { FunctionComponent, useEffect, useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import Table, { noOnRowClick } from "../components/Table/Table";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useTranslation } from "react-i18next";
import TableRow from "../components/Table/TableRow";
import { useParams, useSearchParams } from "react-router-dom";
import { columnType } from "../types/table";
import { passedOrFailed, yesOrNo } from "../helpers";
import { validation } from "../types/validations";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import InfoBox from "../components/InfoBox/InfoBox";
import { useAuth } from "../AuthProvider";


const ValidationsDetailsPage: FunctionComponent = () => {
  const { t } = useTranslation()
  const params = useParams()
  const [searchParams] = useSearchParams();
  const navigationReason =  searchParams.get("reason")
  const filter =  searchParams.get("filter")
  const {get} = useAuth()
  
  const [validationObject, set_validationObject] = useState<undefined | validation >(undefined)
  const getCustomers = async (type: string) => {
    try{
      const res = await get(`/validator/details/${type}`)
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

  const columns: columnType[] = [
    { colName: t("table.columnNames.sfdcObjectName"), dataKey: "sfdc_tag"}, //todo add translations, col 0 is not right name! 
    { colName: t("table.columnNames.sfdcObjectValue"), dataKey: "sfdc_value"},
    { colName:  t("table.columnNames.sfdcObjectValidationResult"), dataKey: "object_validation_result", parsers: [passedOrFailed]},
  ]

  const tableData = filter ===  "failed" ? validationObject?.validations?.filter((vo:any) => !vo.object_validation_result) : validationObject?.validations

  return (
    <>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            <SubsectionHeader title={t("validationsPage")} center/>
            {navigationReason === "navigation" ? <InfoBox type="validationNavigation"/> : null}
            {validationObject? <h3 style={{margin: "3px 0px 3px"}}>Object Id {params?.id}</h3> : null }
            {validationObject? <h3 style={{margin: "3px 0px 3px"}}>Object type: {validationObject?.sfdcObjectType}</h3> : null }
            {validationObject? <h3 style={{margin: "3px 0px 3px"}}>Object passes all validations: {yesOrNo(validationObject?.object_validation_result,t )}</h3>: null }
            { !validationObject?.validations ? <LoadingIndicator/> : 
              <Table tableRowElement={TableRow} tableColumns={columns} tableData={tableData} onRowClick={noOnRowClick}/>
            }
        </div>
      </div>
    </>
  );
};

export default ValidationsDetailsPage;
