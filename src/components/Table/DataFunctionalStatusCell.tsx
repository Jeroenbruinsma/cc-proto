import { dataKeyType } from "../../types/table";
import IndicatorBoll from "../StatusIndicator/indicatorbolljumbo.svg";
import { functionalStateToColor } from "../../components/CurrentStatusHeader/ColorMapping";
import { useTranslation } from "react-i18next";

interface dataQualityCellprops{
  dataKey: dataKeyType
  value: boolean 
}

const DataFunctionalStatusCell= ({
  dataKey,
  value,
}:dataQualityCellprops) => {
  const {t} = useTranslation()
    if (dataKey !== "cc__functional_status") return <p>-</p>;
    // @ts-ignore
    const dotColor = functionalStateToColor(value)
     return <div style={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                {/* 
                //@ts-ignore */}
                <IndicatorBoll fill={dotColor} width="20px" />
                <p style={{ margin: "10px"}}> {t(`functionalStatus.${value}`) || "-"}</p>
            </div>
};

export default DataFunctionalStatusCell;


