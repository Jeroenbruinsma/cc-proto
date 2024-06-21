import { FunctionComponent } from "react";
import styles from "./DoubleArrow.module.css";

export type DoubleArrowType = {
  className?: string;
};

const DoubleArrow: FunctionComponent<DoubleArrowType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.doubleArrow, className].join(" ")}>
      <div className={styles.singleArrowright}>
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
      </div>
    </div>
  );
};

export default DoubleArrow;
