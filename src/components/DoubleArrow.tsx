import { FunctionComponent } from "react";
import styles from "./DoubleArrow.module.css";

export type DoubleArrowType = {
  className?: string;
  direction?: "left" | "right"
  visible?: boolean
};

const DoubleArrow: FunctionComponent<DoubleArrowType> = ({
  className = "", direction, visible = true
}) => {
  if(! visible) return <></>
  return (
    <div className={[styles.doubleArrow, className].join(" ")}>
      <div className={styles.singleArrowright}>
       { direction === "right" ? <> <img
              className={styles.singleArrowrightChild}
              loading="lazy"
              alt=""
              src="/vector-20.svg"
            />
            <img
              className={styles.singleArrowrightItem}
              loading="lazy"
              alt=""
              src="/vector-20.svg"
            />
            </> : <>
        <img
          className={styles.singleArrowrightChild}
          loading="lazy"
          alt=""
          src="/vector-201.svg"
        />
        <img
          className={styles.singleArrowrightItem}
          loading="lazy"
          alt=""
          src="/vector-201.svg"
        />
        </> }
      </div>
    </div>
  );
};

export default DoubleArrow;
