import { FunctionComponent} from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import Table, { noOnRowClick } from "../components/Table/Table";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useTranslation } from "react-i18next";
import TableRow from "../components/Table/TableRow";
import { columnType } from "../types/table";
import { alarmColorParser, alarmExplanation, serviceNeedExplanation } from "../components/AlarmExplanation/alarms";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetterParser } from "../helpers";
import { alarmColorCoding } from "../types/equipment";

const NomenclaturePage: FunctionComponent = () => {
  const { t } = useTranslation()
  type paramsType = { type: "alarms" | "serviceneeds" }
  const params = useParams<paramsType>()

  const translateParser = (txt:any):string => t(txt)
  const rowColorParser = (a:any): alarmColorCoding | "highlite" | undefined => alarmColorParser(a) 
  
  
  const columns: columnType[] = [
    { colName: t("table.columnNames.priority"), dataKey: "cc__severity", parsers:[capitalizeFirstLetterParser]},
    { colName: t("table.columnNames.alarmDescription"), dataKey: "cc__severityDescriptionTranslationKey", parsers: [translateParser]}
  ]
  
  const table = params?.type === "alarms" ? alarmExplanation : serviceNeedExplanation
  const title = params?.type === "alarms" ? "nomenclatureOverview" : "serviceNeedOverview"
  return (
    <>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            {/* @ts-ignore */}
            <SubsectionHeader title={t(title)} center/>
            <Table tableRowElement={TableRow} tableColumns={columns} tableData={table} onRowClick={noOnRowClick} rowColorParser={rowColorParser}/>
        </div>
      </div>
    </>
  );
};

export default NomenclaturePage;
