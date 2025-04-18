import TopHeader from "../components/TopHeader/TopHeader";
import CurrentStatusHeader from "../components/CurrentStatusHeader/CurrentStatusHeader";
import { useNavigate, useParams } from "react-router-dom";
import { createElement, useEffect, useState } from "react";
import { alarm, equipmentDataType, stateType } from "../types/equipment";
import { rowItemsNeededForShowMoreButton } from "../config";
import KpiBox from "../components/KpiBox/KpiBox";
import MetricBox from "../components/MetricBox/MetricBox";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import Table from "../components/Table/Table";
import { useTranslation } from "react-i18next";
import TableRow, { onRowClickConfig } from "../components/Table/TableRow";
import { columnType } from "../types/table";
import { alarmPrioParser, durationParser } from "../helpers";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
// import InfoBox from '../components/InfoBox/InfoBox'
import QM from "..//components/AlarmExplanation/questionMark.svg";
import { serviceNeedsType } from "../types/serviceNeeds";
import { useAuth } from "../AuthProvider";

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
  const [stateData, set_stateData] = useState<stateType | undefined>(undefined);
  const [alarmData, set_AlarmData] = useState<alarm[] | undefined>(undefined);
  const [berthAlarmData, set_berthAlarmData] = useState<alarm[] | undefined>(
    undefined
  );
  const [kpiData, set_kpiData] = useState<hacked_kpi[] | undefined>(undefined);

  const [selectedOption, set_selectedOption] = useState(1);
  const [showOptionDropdown, set_showOptionDropdown] = useState(false);
  const periodOptions = ["1D", "7D", "30D", "1Y"]; // make api call?
  const dropdownOptions = periodOptions.map((o) => t(`kpi.period.${o}`));
  const [showBerthAlarms, set_showBerthAlarms] = useState(true);
  const {get} = useAuth();

  const getMetaData = async (eqpmentId: string) => {
    try {
      const res = await get(`/equipment/meta?serial=${eqpmentId}`);
      set_metaData(res?.data?.data);
    } catch (err) {
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
      console.log("err", err);
    }
  };
  const getAlarmData = async (eqpmentId: string) => {
    try {
      const res = await get(`/equipment/serial-to-alarm?serial=${eqpmentId}`);

      if (res?.data?.data?.length > 0) {
        set_AlarmData(res?.data?.data);
      } else {
        set_AlarmData([]);
      }
    } catch (err) {
      console.log("err", err);
      set_AlarmData(undefined);
    }
  };
  const getBerthAlarmData = async (eqpmentId: string) => {
    try {
      const res = await get(`/equipment/serial-to-alarm?serial=${`${
        eqpmentId.split("/")[0]
      }/0`}`);

      if (res?.data?.data?.length > 0) {
        set_berthAlarmData(res?.data?.data);
      } else {
        set_berthAlarmData([]);
      }
    } catch (err) {
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
      console.log("err", err);
      set_kpiData(undefined);
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
    if (params.id) {
      getKpiData(params.id);
    }
  }, [params.id, selectedOption]);

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

  const dummyServiceNeed: serviceNeedsType = {
    serviceNeedId: "-",
    serviceNeedName: "-",
    date: "-",
    serviceNeedStatus: "-",
  };

  const alarmColumns: columnType[] = [
    {
      colName: t("table.columnNames.dateTime_local"),
      dataKey: "created_local_site_time",
      autocapitalize: true,
    },
    { colName: t("table.columnNames.alarm"), dataKey: "detail" },
    {
      colName: t("table.columnNames.priority"),
      dataKey: "priority",
      parsers: [alarmPrioParser],
      headerIcon: {
        onClick: () => navigate("/nomenclature/alarms"),
        icon: createElement(QM, {
          fill: "gray",
          width: "20px",
          style: { marginLeft: "10px" },
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
                  )}/historicalAlarms`
                )
              }
              limit={rowItemsNeededForShowMoreButton} 
            />
          )}
          <SubsectionHeader
            title={t("KPIStatistics")}
            since
            showOptionDropdown={showOptionDropdown}
            set_selectedOption={set_selectedOption}
            selectedOption={selectedOption}
            set_showOptionDropdown={set_showOptionDropdown}
            dropdownOptions={dropdownOptions}
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
              />
            ))}
          </KpiBox>
        </div>
      </div>
    </>
  );
}

export default UnitDetailsPage;
