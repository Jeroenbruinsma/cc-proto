import TopHeader from "../components/TopHeader/TopHeader";
import CurrentStatusHeader from "../components/CurrentStatusHeader/CurrentStatusHeader";
import { useNavigate, useParams } from "react-router-dom";
import { createElement, useCallback, useEffect, useRef, useState } from "react";
import { alarm, equipmentDataType, functionalStatusType, stateType } from "../types/equipment";
import { backendUrl } from "../config";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import Table from "../components/Table/Table";
import { useTranslation } from "react-i18next";
import TableRow, { onRowClickConfig } from "../components/Table/TableRow";
import { columnType, filterOption } from "../types/table";
import { alarmPrioParser, durationParser } from "../helpers";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import InPageNav from "../components/InpageNav/InPageNav";
import { useAuth } from "../AuthProvider";
import * as Sentry from "@sentry/react";
import QM from "..//components/AlarmExplanation/questionMark.svg";
import { alarmColorParser } from "../components/AlarmExplanation/alarms";

function UnitHistoricalAlarmsPage() {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const [metaData, set_metaData] = useState<equipmentDataType | undefined>(
    undefined
  );
  const [operationalStateData] = useState<stateType | undefined>(undefined);
  const [functionalStateData] = useState<functionalStatusType | undefined>(undefined);
  const [alarmData, set_AlarmData] = useState<alarm[] | undefined>(undefined);
  const [downloadToken, set_downloadToken] = useState<undefined | string>(
    undefined
  );
  const [showFilterDropdown, set_showFilterDropdown] = useState<boolean>(false);
  const [filterOptions, set_filterOptions] = useState<filterOption[]>([]);
  
  const { get } = useAuth();
  const [offset] = useState(0);
  const [limit] = useState(100)

  const getMetaData = async (eqpmentId: string) => {
    try {
      const res = await get(`/equipment/meta?serial=${eqpmentId}`);
      set_metaData(res?.data?.data);
    } catch (err) {
      Sentry.captureException(err)
      console.log("err", err);
    }
  };

  const setFilter = (a: number): void => {
    const b = filterOptions?.map((f: filterOption, i: number) => {
      if (i === a) {
        return {
          ...f,
          applied: !f.applied,
        };
      }
      return f;
    });
    // if all filters are set, close the filter dropdown
    if(b.filter(f => !f.applied).length === 0){
      return set_showFilterDropdown(false); 
    }

    if (params.id) {
      set_AlarmData(undefined)
      getAlarmData(params.id, b);
    }
    set_showFilterDropdown(false);
  };

  const filterOptionsRef = useRef(filterOptions);


  useEffect(() => {
    filterOptionsRef.current = filterOptions;
  }, [filterOptions]);

  const prepGetAlarmsData = useCallback(() => {
    if (params.id) {
      getAlarmData(params.id, filterOptionsRef.current);
    }
  }, [params.id]);

  const getAlarmData = async (
    eqpmentId: string,
    filterOptions?: filterOption[] | undefined
  ) => {
    try {
      let filterQuery = "";
      if (filterOptions) {
        filterQuery = filterOptions
          ?.filter((f: filterOption) => f.applied)
          ?.map((f: filterOption) => `${f.dataKey}=${f.filterText}`)
          ?.join(";");
      }
      const res = await get(
        `/equipment/serial-to-alarm?serial=${eqpmentId}&historical=True&berthserial=${
          eqpmentId.split("/")[0]
        }/0&offset=${offset}&limit=${limit}${
          filterQuery ? `&filter=${filterQuery}` : ""
        }`
      );
      if (res?.data?.downloadToken) {
        set_downloadToken(res?.data?.downloadToken);
      }
      if (res?.data?.filterOptions?.length > 0) {
        set_filterOptions(res?.data?.filterOptions);
      }
      if (res?.data?.data?.length > 0) {
        set_AlarmData(res?.data?.data);
      } else {
        set_AlarmData([]);
      }
    } catch (err) {
      Sentry.captureException(err)
      console.log("err", err);
      set_AlarmData(undefined);
    }
  };

  useEffect(() => {
    if (params.id) {
      getMetaData(params.id);
      getAlarmData(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (params.id) {
        prepGetAlarmsData();
      }
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, [params.id]);

  const alarmColumns: columnType[] = [
    {
      colName: t("table.columnNames.dateTime_local"),
      dataKey: "created_local_site_time",
      autocapitalize: false,
    },
    { colName: t("table.columnNames.alarm"), dataKey: "detail" },
    {
      colName: t("table.columnNames.priority"),
      dataKey: "priority",
      parsers: [alarmPrioParser],
      filter: {
        filterOptions: filterOptions,
        set_filterOptions: setFilter,
        showFilterDropdown: showFilterDropdown,
        set_showFilterDropdown: set_showFilterDropdown,
      },
      headerIcon: {
              onClick: () => navigate("/nomenclature/alarms"),
              icon: createElement(QM, {
                fill: "gray",
                width: "20px",
              }),
            },
    },
    {
      colName: t("table.columnNames.duration"),
      dataKey: "duration",
      parsers: [durationParser],
    },
  ];

  const onRowClick: onRowClickConfig = {
    onClick: (e: any) => console.log("Click not supported, alarm UUID:", e),
    dataKey: "uuid",
  };

  const alarmList = alarmData;
  return (
    <>
      <TopHeader />
      <CurrentStatusHeader
        small
        equipmentName={`${metaData?.asset_Name || "-"} `}
        metaData={metaData}
        operationalStateInfo={operationalStateData}
        functionalStateInfo={functionalStateData}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "90%",
            display: "flex",
            alignItems: "left",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <InPageNav />

          <SubsectionHeader
            title={`${t("historicalAlarmList")}`}
            exportData={
              downloadToken
                ? `${backendUrl}/download?token=${downloadToken}`
                : undefined
            } //serial=${params?.id}${params?.id ? `&berthserial=${params?.id.split("/")[0]}` : ""}/0&historical=True&export=True`}
          />
          {!alarmData ? (
            <LoadingIndicator />
          ) : (
            <Table
              tableRowElement={TableRow}
              tableColumns={alarmColumns}
              tableData={alarmList}
              onRowClick={onRowClick}
              rowColorParser={alarmColorParser}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default UnitHistoricalAlarmsPage;
