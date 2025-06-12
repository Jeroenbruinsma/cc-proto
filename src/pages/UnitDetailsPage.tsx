import TopHeader from "../components/TopHeader/TopHeader";
import CurrentStatusHeader from "../components/CurrentStatusHeader/CurrentStatusHeader";
import { useNavigate, useParams } from "react-router-dom";
import { createElement, useEffect, useState } from "react";
import { alarm, equipmentDataType, functionalStatusType, stateType } from "../types/equipment";
import { rowItemsNeededForShowMoreButton } from "../config";
import KpiBox from "../components/KpiBox/KpiBox";
import MetricBox from "../components/MetricBox/MetricBox";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import Table from "../components/Table/Table";
import { useTranslation } from "react-i18next";
import TableRow, { onRowClickConfig } from "../components/Table/TableRow";
import { columnType, filterOption } from "../types/table";
import { alarmPrioParser, dayMonthTimeYear, durationParser } from "../helpers";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
// import InfoBox from '../components/InfoBox/InfoBox'
import QM from "..//components/AlarmExplanation/questionMark.svg";
import { serviceNeedsType } from "../types/serviceNeeds";
import { useAuth } from "../AuthProvider";
import * as Sentry from "@sentry/react";
import { alarmColorParser } from "../components/AlarmExplanation/alarms";

interface hacked_kpi extends kpi {
  kpi_secondResult?: number;
  kpi_secondUnit?: string;
}

function UnitDetailsPage() {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const [metaData, set_metaData] = useState<equipmentDataType | undefined>(
    undefined
  );
  const [operationalStateData, set_operationalStateData] = useState<stateType | undefined>(undefined);
  const [functionalStateData, set_functionalStateData] = useState<functionalStatusType | undefined>(undefined);
  const [alarmData, set_AlarmData] = useState<alarm[] | undefined>(undefined);
  const [berthAlarmData, set_berthAlarmData] = useState<alarm[] | undefined>(
    undefined
  );
  const [kpiData, set_kpiData] = useState<hacked_kpi[] | undefined>(undefined);

  const [selectedOption, set_selectedOption] = useState(1);
  const periodOptions = ["1D", "7D", "30D", "1Y"]; // make api call?
  const dropdownOptions = periodOptions.map((o) => t(`kpi.period.${o}`));
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
  const getOperationalState = async (eqpmentId: string) => {
    try {
      const res = await get(`/equipment/serial-to-state?serial=${eqpmentId}`);
      if (res?.data?.states?.length > 0) {
        set_operationalStateData(res?.data?.states[0]);
      } else {
        set_operationalStateData(undefined);
      }
    } catch (err) {
      Sentry.captureException(err)
      console.log("err", err);
    }
  };
  const getFunctionalState = async (eqpmentId: string) => {
    try {
      const res = await get(`/equipment/serial-to-status?serial=${eqpmentId}`);
      if (res?.data) {
        set_functionalStateData(res?.data?.data);
      } else {
        set_functionalStateData(undefined);
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

  const hack_double_kpi_box = (kpis: kpi[]): hacked_kpi[] => {
    const data = kpis.filter(
      (k) =>
        k?.kpi_name != "kpi_unit_in_use" &&
        k?.kpi_name != "kpi_unit_utilisation"
    );
    const unitUtil = kpis.filter(
      (k) => k?.kpi_name === "kpi_unit_utilisation"
    )[0];
    const unitInUse = kpis.filter((k) => k?.kpi_name === "kpi_unit_in_use")[0];
    // We need both unitUtil and UnitInUse for a double box
    if (!unitUtil || !unitInUse) return kpis;
    const doublebox = {
      ...unitUtil,
      kpi_secondResult: unitInUse?.kpi_result,
      kpi_secondUnit: unitInUse?.kpi_unit,
    };
    return [...data, doublebox];
  };

  const getKpiData = async (eqpmentId: string) => {
    try {
      const res = await get(`/equipment/serial-to-kpi?serial=${eqpmentId}&period=${periodOptions[selectedOption]}`);

      if (res?.data?.length > 0) {
        //Hack to remove miscalculated kpi's
        // set_kpiData(res?.data)
        set_kpiData(hack_double_kpi_box(res?.data));
      } else {
        set_kpiData([]);
      }
    } catch (err) {
      Sentry.captureException(err)
      console.log("err", err);
      set_kpiData(undefined);
    }
  };
  useEffect(() => {
    if (params.id) {
      getMetaData(params.id);
      getOperationalState(params.id);
      getFunctionalState(params.id);
      getAlarmData(params.id);
      getBerthAlarmData(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      getKpiData(params.id);
    }
  }, [params.id, selectedOption]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (params.id) {
        getOperationalState(params.id);
        getFunctionalState(params.id);
        getAlarmData(params.id);
        getBerthAlarmData(params.id);
      }
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [params.id]);

  const dummyServiceNeed: serviceNeedsType = {
    serviceNeedId: "-",
    serviceNeedName: "-",
    date: "-",
    serviceNeedStatus: "-",
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
  const serviceNeedsColumns: columnType[] = [
    {
      colName: t("table.columnNames.serviceNeedId"),
      dataKey: "serviceNeedId",
      autocapitalize: true,
    },
    {
      colName: t("table.columnNames.serviceNeedName"),
      dataKey: "serviceNeedName",
      headerIcon: {
        onClick: () => navigate("/nomenclature/serviceneeds"),
        icon: createElement(QM, {
          fill: "gray",
          width: "20px",
          style: { marginLeft: "10px" },
        }),
      },
    },
    { colName: t("table.columnNames.date_localSite"), dataKey: "date" },
    {
      colName: t("table.columnNames.serviceNeedStatus"),
      dataKey: "serviceNeedStatus",
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

          <SubsectionHeader title={t("serviceNeedsList")} onClick={ () => navigate(`/unit/${encodeURIComponent(params?.id || "" )}/serviceneeds`)}/>
          {!dummyServiceNeed ? (
            <LoadingIndicator />
          ) : (
            <Table
              tableRowElement={TableRow}
              tableColumns={serviceNeedsColumns}
              tableData={[dummyServiceNeed]}
              onRowClick={onRowClick}
              showMoreOnClick={ () =>navigate(`/unit/${encodeURIComponent(params?.id || "" )}/serviceneeds`)}
              limit={rowItemsNeededForShowMoreButton} 
            />
          )}
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
              showMoreOnClick={() =>
                navigate(
                  `/unit/${encodeURIComponent(
                    params?.id || ""
                  )}/activeAlarms`
                )
              }
              limit={rowItemsNeededForShowMoreButton} 
              rowColorParser={alarmColorParser}
            />
          )}
          <SubsectionHeader
            title={t("KPIStatistics")}
            since
            set_selectedOption={set_selectedOption}
            selectedOption={selectedOption}
            dropdownOptions={dropdownOptions}
            middleText={kpiData?.[0]?.calculated_since_site_local ? `updated since ${dayMonthTimeYear(kpiData?.[0]?.calculated_since_site_local, t)} until ${dayMonthTimeYear(kpiData?.[0]?.calculated_till_site_local, t)} site local time` : undefined}
          />
          <KpiBox>
            { !kpiData ? <LoadingIndicator/> :
               kpiData?.length === 0 ? <div style={{
                width: "90%",
                display: "flex",
                alignItems: "left",
                justifyContent: "center",
                flexDirection: "column",
                margin: "20px"
              }}><p>{t("kpi.emptyResult")}</p ></div> :
              kpiData?.map((kpi, i) => (
              <MetricBox
                key={i}
                metricValue={`${
                  kpi?.kpi_result || kpi?.kpi_result === 0
                    ? kpi?.kpi_result
                    : t("basics.dash")
                } ${t(`kpi.${kpi?.kpi_unit}`)}`}
                metricName={`${t(`kpi.${kpi.kpi_name}`)}`}
                secondMetricValue={
                  kpi?.kpi_secondResult || kpi?.kpi_secondResult === 0
                    ? `${kpi?.kpi_secondResult} ${t(
                        `kpi.${kpi?.kpi_secondUnit}`
                      )}`
                    : undefined
                }
                className=""
                onMetricBoxContainerClick={() => navigate(`/unit/${encodeURIComponent(params?.id || "" )}/kpi/${kpi.kpi_name}`)}
              />
            ))}
          </KpiBox>
        </div>
      </div>
    </>
  );
}

export default UnitDetailsPage;
