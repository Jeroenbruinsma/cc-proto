import { FunctionComponent} from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import Table, { noOnRowClick } from "../components/Table/Table";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useTranslation } from "react-i18next";
import TableRow from "../components/Table/TableRow";
import { columnType } from "../types/table";
import { alarmExplanation } from "../components/AlarmExplanation/alarms";
import { useSearchParams } from "react-router-dom";
import { capitalizeFirstLetterParser } from "../helpers";

const NomenclaturePage: FunctionComponent = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams();
  const alarmSeverity =  searchParams.get("alarmSeverity")
    
  const translateParser = (txt:any):string =>{
    return t(txt)
  } 

  const rowColorParser = (a:any): "highlite" | undefined => {
    if(a?.cc__alarmSeverity === alarmSeverity){
      return "highlite"
    }
  }
  const columns: columnType[] = [
    { colName: t("table.columnNames.alarmSeverity"), dataKey: "cc__alarmSeverity", parsers:[capitalizeFirstLetterParser]},
    { colName: t("table.columnNames.alarmDescription"), dataKey: "cc__alarmSeverityDescriptionTranslationKey", parsers: [translateParser]}
  ]

  return (
    <>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            {/* @ts-ignore */}
            <SubsectionHeader title={t("nomenclatureOverview")} center/>
            <Table tableRowElement={TableRow} tableColumns={columns} tableData={alarmExplanation} onRowClick={noOnRowClick} rowColorParser={rowColorParser}/>
        </div>
      </div>
    </>
  );
};

export default NomenclaturePage;
