import { FunctionComponent } from "react";
import styles from "./Table.module.css";
import React from "react";
import { customer, site } from "../../types/sites";
import { columnType, keyValue } from "../../types/table";
import {
  TableRowType,
  onRowClickConfig,
  rowColorParserFunctionType,
} from "./TableRow";
import { alarm } from "../../types/equipment";
import { unit } from "../../types/unit";
import { validation, validationObject } from "../../types/validations";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { serviceNeedsType } from "../../types/serviceNeeds";
import { severityType } from "../../types/alarms";
import { user } from "../../types/user";
import { useTranslation } from "react-i18next";
import { rowItemsNeededForShowMoreButton } from "../../config";
import Filter from "../TableFilter/filter.svg";

export type TableType = {
  tableRowElement: React.ComponentType<TableRowType>;
  tableColumns: columnType[];
  tableData:
    | site[]
    | alarm[]
    | unit[]
    | customer[]
    | validation[]
    | validationObject[]
    | severityType[]
    | serviceNeedsType[]
    | user[]
    | keyValue[]
    | undefined;
  onRowClick: onRowClickConfig;
  rowColorParser?: rowColorParserFunctionType;
  showMoreOnClick?: () => void;
  limit?: number;
  // filter?: tableFilter
};
export const noOnRowClick: onRowClickConfig = {
  onClick: (_: any) => undefined,
  //@ts-ignore
  dataKey: "",
};

const Table: FunctionComponent<TableType> = ({
  tableRowElement,
  tableColumns,
  tableData,
  onRowClick,
  rowColorParser,
  showMoreOnClick,
  limit,
}) => {
  if (!tableData) return <LoadingIndicator />;
  const displayRows = limit ? tableData.slice(0, limit) : tableData;
  const { t } = useTranslation();

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            {tableColumns.map((c, i) => {
              if (c?.filter) {
                return (
                  <th
                    key={i}
                    scope="col"
                    className={styles.tableHeader}
                  >
                    {c?.headerIcon?.icon ?
                       <>
                        <span   className={styles.headerItem}
                                onClick={c?.headerIcon?.onClick}>{c?.headerIcon?.icon}</span>
                        {c.colName}
                        <span   className={styles.headerItem}
                                onClick={() => c?.filter?.set_showFilterDropdown( !c?.filter?.showFilterDropdown )}>
                          {/* @ts-ignore */}
                          <Filter fill="gray" width="15px" height="15px" />
                        </span >
                       </> : 
                       <>
                        {c.colName}
                        <span className={styles.headerItem}
                              onClick={() => c?.filter?.set_showFilterDropdown( !c?.filter?.showFilterDropdown )}>
                          {/* @ts-ignore */}
                          <Filter fill="gray" width="15px" height="15px" />
                        </span >
                      </>
                    }
                  </th>
                );
              }
              if (c?.headerIcon) {
                return (
                  <th
                    key={i}
                    scope="col"
                    className={styles.tableHeader}
                    onClick={c?.headerIcon?.onClick}
                  >
                    {c.colName} {c?.headerIcon?.icon}
                  </th>
                );
              }
              return (
                <th key={i} scope="col" className={styles.tableHeader}>
                  {c.colName}
                </th>
              );
            })}
          </tr>

          {tableColumns.map((c, i) => {
            if (c?.filter) {
              return (
                <>
                <th key={i} className={styles.tableFilterRow}>
                  <div
                    key={i}
                    className={styles.periodDropdownParent}
                    style={{ backgroundColor: "red" }}
                  >
                    <div
                      className={styles.sinceDropdown}
                      style={{ backgroundColor: "yellow" }}
                    >
                      <div
                        className={styles.months}
                        style={{ backgroundColor: "red" }}
                      ></div>
                    </div>
                    {c?.filter?.showFilterDropdown ? (
                      <div className={styles.periodDropdown}>
                        <ul>
                          {c?.filter?.filterOptions
                            ? c?.filter?.filterOptions?.map((pt, i) => (
                                <li
                                  key={i}
                                  onClick={() =>
                                    c?.filter?.set_filterOptions(i, c?.filter?.filterOptions)
                                  }
                                >
                                  <input
                                    type="checkbox"
                                    id={`checkbox-${i}`}
                                    checked={
                                      !c?.filter?.filterOptions?.[i]?.applied
                                    }
                                    readOnly
                                  />
                                  <label htmlFor={`checkbox-${i}`}>
                                    {pt?.filterText}
                                  </label>
                                </li>
                              ))
                            : null}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                  </th>
                </>
              );
            } else {
              return (
                <th key={i} scope="col" className={styles.tableFilter}/>
              );
            }
          })}
          {/* </tr> */}
        </thead>
        <tbody className={styles.tableBody}>
          {!tableData ? (
            <LoadingIndicator />
          ) : (
            displayRows?.map((s, i) =>
              React.createElement(tableRowElement, {
                key: i,
                rowData: s,
                columns: tableColumns,
                onRowClick: onRowClick,
                rowColorParser: rowColorParser,
              })
            )
          )}
        </tbody>
      </table>
      {showMoreOnClick &&
      tableData?.length > rowItemsNeededForShowMoreButton ? (
        <div
          className={[styles.showMoreHolder].join(" ")}
          onClick={showMoreOnClick}
        >
          <p className={styles.showMoreText}>
            {limit
              ? `${t("basics.show")} ${
                  tableData?.length - displayRows.length
                } ${t("basics.more")}`
              : t("basics.showMore")}
          </p>
          <img
            className={styles.showMoreArrow}
            loading="lazy"
            alt=""
            src="/vector-18.svg"
          />
        </div>
      ) : null}
    </>
  );
};

export default Table;
