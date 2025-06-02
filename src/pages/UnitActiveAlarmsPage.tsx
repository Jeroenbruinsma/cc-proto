import TopHeader from "../components/TopHeader/TopHeader";
import CurrentStatusHeader from "../components/CurrentStatusHeader/CurrentStatusHeader";
import { useNavigate, useParams } from "react-router-dom";
import { createElement, useEffect, useState } from "react";
import { alarm, equipmentDataType, stateType } from "../types/equipment";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import Table from "../components/Table/Table";
import { useTranslation } from "react-i18next";
import TableRow, { onRowClickConfig } from "../components/Table/TableRow";
import { columnType, filterOption } from "../types/table";
import { alarmPrioParser, durationParser } from "../helpers";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
// import InfoBox from '../components/InfoBox/InfoBox'
import QM from "..//components/AlarmExplanation/questionMark.svg";
import { useAuth } from "../AuthProvider";
import * as Sentry from "@sentry/react";
import { alarmColorParser } from "../components/AlarmExplanation/alarms";
import InPageNav from "../components/InpageNav/InPageNav";


function UnitActiveAlarmsPage() {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const [metaData, set_metaData] = useState<equipmentDataType | undefined>(
    undefined
  );
  const [stateData, set_stateData] = useState<stateType | undefined>(undefined);
  const [alarmData, set_AlarmData] = useState<alarm[] | undefined>(undefined);
  const [berthAlarmData, set_berthAlarmData] = useState<alarm[] | undefined>(
    undefined
  );

  const [showBerthAlarms, set_showBerthAlarms] = useState(false);

  const [filterOptions, set_filterOptions] = useState<filterOption[]>([]);
  const [showFilterDropdown, set_showFilterDropdown] = useState<boolean>(false);
  const {get} = useAuth();

  const getMetaData = async (eqpmentId: string) => {
    try {
      const res = await get(`/equipment/meta?serial=${eqpmentId}`);
      set_metaData(res?.data?.data);
    } catch (err) {
      Sentry.captureException(err)
      console.log("err", err);
    }
  };
  const getLastState = async (eqpmentId: string) => {
    try {
      const res = await get(`/equipment/serial-to-state?serial=${eqpmentId}`);
      if (res?.data?.states?.length > 0) {
        set_stateData(res?.data?.states[0]);
      } else {
        set_stateData(undefined);
      }
    } catch (err) {
      Sentry.captureException(err)
      console.log("err", err);
    }
  };

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
          `/equipment/serial-to-alarm?serial=${eqpmentId}${filterQuery ? `&filter=${filterQuery}` : ""}`
        );
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
  const getBerthAlarmData = async (eqpmentId: string,
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
      const res = await get(`/equipment/serial-to-alarm?serial=${`${
        eqpmentId.split("/")[0]}/0`}${filterQuery ? `&filter=${filterQuery}` : ""}`);

      if (res?.data?.data?.length > 0) {
        set_berthAlarmData(res?.data?.data);
      } else {
        set_berthAlarmData([]);
      }
    } catch (err) {
      Sentry.captureException(err)
      console.log("err", err);
      set_berthAlarmData(undefined);
    }
  };


  useEffect(() => {
    if (params.id) {
      getMetaData(params.id);
      getLastState(params.id);
      getAlarmData(params.id);
      getBerthAlarmData(params.id);
    }
  }, [params.id]);


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (params.id) {
        getLastState(params.id);
        getAlarmData(params.id);
        getBerthAlarmData(params.id);
      }
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [params.id]);


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
      getBerthAlarmData(params.id, b);
    }
    set_showFilterDropdown(false);
  };
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

  const concat = (...arrays: any) => [].concat(...arrays.filter(Array.isArray));
  const alarmList = showBerthAlarms
    ? concat(berthAlarmData, alarmData)
    : alarmData;

  return (
    <>
      <TopHeader />
      <CurrentStatusHeader
        small
        equipmentName={`${metaData?.asset_Name || "-"} `}
        metaData={metaData}
        stateInfo={stateData}
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
            title={`${t("activeAlarmList")}`}
            optionToggleName={`${t("activeAlarmBerthToggle")}`}
            toggleChecked={showBerthAlarms}
            set_toggleChecked={set_showBerthAlarms}
            button={() =>
              navigate(
                `/unit/${encodeURIComponent(params?.id || "")}/historicalAlarms`
              )
            }
            buttonText={t("historicalAlarmsButton")}
            onClick={ () => navigate(`/unit/${encodeURIComponent(params?.id || "" )}/historicalAlarms`)}
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

export default UnitActiveAlarmsPage;
