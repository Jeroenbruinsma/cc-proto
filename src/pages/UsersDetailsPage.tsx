import { FunctionComponent, useEffect, useState } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import Table, { noOnRowClick } from "../components/Table/Table";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useTranslation } from "react-i18next";
import TableRow from "../components/Table/TableRow";
import { useParams } from "react-router-dom";
import { columnType, keyValue } from "../types/table";
import { user } from "../types/user";
import { useAuth } from "../AuthProvider";


const UsersDetailsPage: FunctionComponent = () => {
  const { t } = useTranslation()
  const params = useParams()
  
  const [user, set_user] = useState<undefined | user >(undefined)
  const {get} =  useAuth()
  const getUser = async (id: string) => {
    try{
      // @ts-ignore
      const res = await get(`/users/${id}`)
      if(res?.data ){
        set_user(res?.data)
      }else{
        set_user(undefined)
      }
    }
    catch(err){
      console.log("err",err)
    }
  }
  useEffect(()=> {
    if(params?.id){
      getUser(params?.id)
    }else{
      set_user(undefined)
    }
    
  }, [params?.id])

  const columns: columnType[] = [
    { colName: t("table.columnNames.username"), dataKey: "key"},
    { colName: t("table.columnNames.country"), dataKey: "value"},
  ]
  const onbToTableData = (obj : any): keyValue[] => {
    if (!obj) return []
    return Object.keys(obj).map(key => {return { key: key, value: obj[key] }})
  }
  return (
    <>
        <TopHeader showImage={true} />
        <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
            <div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
              <SubsectionHeader title={t("userDetailsPage")} center/>
                <Table tableRowElement={TableRow} tableColumns={columns} tableData={onbToTableData(user)} onRowClick={noOnRowClick}/>
        </div>
      </div>
    </>
  );
};

export default UsersDetailsPage;
