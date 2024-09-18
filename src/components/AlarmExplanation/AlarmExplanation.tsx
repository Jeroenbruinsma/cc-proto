import { useNavigate } from "react-router-dom";
import styles from "./AlarmExplanation.module.css";
import QM from "./questionMark.svg";
import { alarmExplanation } from "./alarms";

interface alarmExplanationProps{
  listView?: boolean
}

export default function AlarmExplanation({listView}:alarmExplanationProps) {
    const navigate = useNavigate()
  return (
    <div className={styles.alarmsExplanation}>
      {listView? alarmExplanation
        .reverse()
        ?.map((at) => (
          <div className={styles.alarm}>
            <p className={styles.alarmText} onClick={()=>navigate(`/nomenclature/alarms?alarmSeverity=${at?.cc__alarmSeverity}`)}>{at?.cc__alarmSeverity}</p>
            {/* 
            //@ts-ignore */}
            <QM fill="gray" width="15px" />
          </div>
        )) :
        
        <div className={styles.alarm}>

        <p className={styles.alarmText} onClick={()=>navigate(`/nomenclature/alarms`)}>Alarm priority explanation</p>
        {/* 
        //@ts-ignore */}
        <QM fill="gray" width="15px" />
        </div>
      }
    </div>
  );
}
