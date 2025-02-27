import { FunctionComponent } from "react";
import styles from "./SubsectionHeader.module.css";
import Toggle from 'react-toggle'

export type SubsectionHeaderType = {
  className?: string;
  title: string
  center?: boolean
  since?: boolean
  selectedOption?: number
  set_selectedOption?: (x: number) => void
  set_showOptionDropdown?: (x:boolean) => void
  showOptionDropdown?: boolean
  set_showOptionToggle?: (x:boolean) => void
  optionToggleName?: string
  set_toggleChecked?: (x:boolean) => void
  toggleChecked?: boolean
  dropdownOptions?: string[]
};

const SubsectionHeader: FunctionComponent<SubsectionHeaderType> = ({
  className = "",
  title,
  center =  false,
  showOptionDropdown,
  set_selectedOption,
  selectedOption,
  set_showOptionDropdown,
  dropdownOptions,
  optionToggleName,
  set_toggleChecked,
  toggleChecked
}) => {
  // const [selectedPeriod, set_selectedPeriod] =  useState(0)
  // const [showPeriodDropdown, set_showPeriodDropdown] =  useState(false)
  // const {t} = useTranslation()
  // const periodOptions = ["7D","30D","12M"] // make api call?
  // const periodText = periodOptions.map(o => t(`kpi.period.${o}`))  

  const handleOptionClick = (i:number ) => {
    set_selectedOption && set_selectedOption(i)
    set_showOptionDropdown && set_showOptionDropdown(false)
  }
  return (
    <div className={[styles.subsectionHeader, className].join(" ")}>
      <div className={styles.titleplussince}>
        <b style={{textAlign: center ? "center": "left"}} className={styles.kpiStatistics}>{title}</b>
        { set_showOptionDropdown ? 
        <>
        <div className={styles.sinceDropdown} onClick={() => set_showOptionDropdown && set_showOptionDropdown(!showOptionDropdown)} >
            <div className={styles.sinceDropdownInner}>
              <img
                className={styles.frameChild}
                loading="lazy"
                alt=""
                src="/polygon-11.svg"
              />
            </div>
            {/* <div className={styles.months} onClick={() => set_showOptionDropdown && set_showOptionDropdown(true)}>{dropdownOptions && dropdownOptions[selectedOption || 0]}</div> */}
            <div className={styles.months} >{dropdownOptions && dropdownOptions[selectedOption || 0]}</div>
          </div>
            { showOptionDropdown ?
            <div className={styles.periodDropdown}>
              <ul className={styles.perodDropdownList}>
              {dropdownOptions?.map((pt, i) => <li onClick={()=> handleOptionClick(i)}>{pt}</li>)}
              </ul>
            </div>
            : null
            }
          </>
          : null
          }

          { optionToggleName  ?
            <div className={styles.toggleHolder}>
                <Toggle
                  icons={false}
                  onChange={() => set_toggleChecked && set_toggleChecked(!toggleChecked) } 
                  checked={toggleChecked}  
                />
                <span className={styles.toggleTextHolder}>
                  <p className={styles.toggleText}>{optionToggleName}</p>
                </span>
            </div>
            : null
            }
      </div>
      <div className={styles.lineframe}>
        <div className={styles.lineframeChild} />
      </div>
    </div>
  );
};

export default SubsectionHeader;
