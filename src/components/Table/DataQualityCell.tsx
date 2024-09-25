import { dataKeyType } from "../../types/table";
import IndicatorBoll from "../StatusIndicator/indicatorbolljumbo.svg";
import ExclamationMark from "./exclamationMark.svg";

interface dataQualityCellprops{
  dataKey: dataKeyType
  value: boolean 
}

const DataQualityCell= ({
  dataKey,
  value,
}:dataQualityCellprops) => {
    if (dataKey !== "cc__data_validation_passed") return <p>ux error</p>;
    //@ts-ignore
    if (value === true) return <IndicatorBoll fill="green" width="20px" />;
    if (value === false)
        return (
            <div style={{ display: "flex" }}>
                {/* 
                //@ts-ignore */}
                <ExclamationMark fill="red" width="20px" />
                <a style={{ margin: "10px", textDecorationLine: "underline", cursor: "pointer"}}> View details</a>
            </div>
    );
  return <p>-</p>;
};

export default DataQualityCell;
