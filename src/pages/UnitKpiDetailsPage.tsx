import TopHeader from "../components/TopHeader/TopHeader";
import CurrentStatusHeader from "../components/CurrentStatusHeader/CurrentStatusHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { equipmentDataType, stateType } from "../types/equipment";
import KpiBox from "../components/KpiBox/KpiBox";
import MetricBox from "../components/MetricBox/MetricBox";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useTranslation } from "react-i18next";
import { dayMonthTimeYear } from "../helpers";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
// import InfoBox from '../components/InfoBox/InfoBox'
import { useAuth } from "../AuthProvider";
import { LineChart } from '@mui/x-charts/LineChart';
import * as Sentry from "@sentry/react";

interface hacked_kpi extends kpi {
  kpi_secondResult?: number;
  kpi_secondUnit?: string;
}

function UnitKpiDetailsPage() {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const [metaData, set_metaData] = useState<equipmentDataType | undefined>(
    undefined
  );
  const [stateData, set_stateData] = useState<stateType | undefined>(undefined);
  const [kpiData, set_kpiData] = useState<hacked_kpi[] | undefined>(undefined);
  const [historicalKpiData, set_historicalKpiData] = useState<hacked_kpi[] | undefined>(undefined);

  const [selectedOption, set_selectedOption] = useState(1);
  const periodOptions = ["1D", "7D", "30D", "1Y"]; // make api call?
  const dropdownOptions = periodOptions.map((o) => t(`kpi.period.${o}`));
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
  const getHistoricalKpiData = async (eqpmentId: string, kpiType: string) => {
    try {
      const res = await get(`/equipment/serial-to-kpi?serial=${eqpmentId}&period=${periodOptions[selectedOption]}&historical=True&kpi_type=${kpiType}&limit=100`);

      if (res?.data?.length > 0) {
        set_historicalKpiData(res?.data);
      } 
      else {
        set_historicalKpiData(undefined);
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
      getLastState(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id && params?.kpiid) {
      getKpiData(params.id);
      getHistoricalKpiData(params.id, params?.kpiid);
    }
  }, [params, selectedOption]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (params.id) {
        getLastState(params.id);
      }
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [params.id]);

  const formatDate = (dateToFormat: string) => {
    const date = new Date(dateToFormat);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${dayName}, ${day} ${month} ${year}`;
  };


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
        <SubsectionHeader
          title={` ${t("KPIStatistics")} - ${t(`kpi.${params?.kpiid}`)}`}
          since
          set_selectedOption={set_selectedOption}
          selectedOption={selectedOption}
          dropdownOptions={dropdownOptions}
      />
          { historicalKpiData ? 
          <LineChart
            sx={{
                "& .MuiMarkElement-root": {
                    r: 2,
                }
            }}
                yAxis={[
                  {
                    label: `${t(`kpi.${params?.kpiid}`)} [${t(`kpi.${historicalKpiData?.[0]?.kpi_unit}`)}]`
                  }
                ]}
            xAxis={[
              { 
                label: 'Date',
                scaleType: "utc",
                data: historicalKpiData?.map(hd => new Date(hd.calculated_at)),
                valueFormatter: formatDate
              }
              ]}
            series={[
              {
                data: historicalKpiData?.map(hd => hd.kpi_result),
                label: `${t(`kpi.${params?.kpiid}`)} [${t(`kpi.${historicalKpiData?.[0]?.kpi_unit}`)}] ${dropdownOptions[selectedOption]}`,
                color: "#0091D3",
                showMark: true
             },
            ]}
            height={400}
          />
        : <LoadingIndicator/> }
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

export default UnitKpiDetailsPage;
