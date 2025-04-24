import { FunctionComponent } from "react";
import styles from "./SubsectionHeader.module.css";
import Toggle from "react-toggle";
import ExportIcon from "./IconExport.svg";
import CalendarIcon from "./IconCalendar.svg";
import { Link } from "react-router-dom";

export type SubsectionHeaderType = {
  className?: string;
  title: string;
  center?: boolean;
  since?: boolean;
  selectedOption?: number;
  set_selectedOption?: (x: number) => void;
  set_showOptionDropdown?: (x: boolean) => void;
  showOptionDropdown?: boolean;
  set_showOptionToggle?: (x: boolean) => void;
  optionToggleName?: string;
  set_toggleChecked?: (x: boolean) => void;
  toggleChecked?: boolean;
  dropdownOptions?: string[];
  button?: () => void;
  buttonText?: string;
  onClick?: () => void;
  exportData?: string | undefined;
  setRange?: boolean;
};

const SubsectionHeader: FunctionComponent<SubsectionHeaderType> = ({
  className = "",
  title,
  center = false,
  showOptionDropdown,
  set_selectedOption,
  selectedOption,
  set_showOptionDropdown,
  dropdownOptions,
  optionToggleName,
  set_toggleChecked,
  toggleChecked,
  button,
  buttonText,
  onClick,
  exportData,
  setRange,
}) => {
  // const [selectedPeriod, set_selectedPeriod] =  useState(0)
  // const [showPeriodDropdown, set_showPeriodDropdown] =  useState(false)
  // const {t} = useTranslation()
  // const periodOptions = ["7D","30D","12M"] // make api call?
  // const periodText = periodOptions.map(o => t(`kpi.period.${o}`))
  const handleOptionClick = (i: number) => {
    set_selectedOption && set_selectedOption(i);
    set_showOptionDropdown && set_showOptionDropdown(false);
  };
  return (
    <div className={[styles.subsectionHeader, className].join(" ")}>
      <div className={styles.titleplussince}>
        <b
          style={{ textAlign: center ? "center" : "left" }}
          className={[styles.sh, onClick ? styles.shName : null].join(" ")}
          onClick={onClick}
        >
          {title}
        </b>
        {set_showOptionDropdown ? (
          <div className={styles.periodDropdownParent}>
            <div
              className={styles.sinceDropdown}
              onClick={() =>
                set_showOptionDropdown &&
                set_showOptionDropdown(!showOptionDropdown)
              }
            >
              <div className={styles.sinceDropdownInner}>
                <CalendarIcon />
              </div>
              <div className={styles.months}>
                <p>{dropdownOptions && dropdownOptions[selectedOption || 0]}</p>
              </div>
            </div>
            {showOptionDropdown ? (
              <div className={styles.periodDropdown}>
                <ul>
                  {dropdownOptions?.map((pt, i) => (
                    <li key={i} onClick={() => handleOptionClick(i)}>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}

        {optionToggleName ? (
          <div className={styles.toggleHolder}>
            <Toggle
              icons={false}
              onChange={() =>
                set_toggleChecked && set_toggleChecked(!toggleChecked)
              }
              checked={toggleChecked}
            />
            <span className={styles.toggleTextHolder}>
              <p className={styles.toggleText}>{optionToggleName}</p>
            </span>
          </div>
        ) : null}
        {button ? (
          <span className={styles.btnTextHolder} onClick={button}>
            <p className={styles.btnText}>{buttonText}</p>
          </span>
        ) : null}
        {exportData ? (
          <>
            <Link to={exportData} download target="_self">
              <span className={styles.btnTextHolder}>
                <ExportIcon />
              </span>
            </Link>
          </>
        ) : null}
        {setRange ? (
          <span className={styles.btnTextHolder} onClick={button}>
            <CalendarIcon />
          </span>
        ) : null}
      </div>
      <div className={styles.lineframe}>
        <div className={styles.lineframeChild} />
      </div>
    </div>
  );
};

export default SubsectionHeader;
