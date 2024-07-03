import { FunctionComponent } from "react";
import styles from "./TopHeader.module.css";
import { useNavigate } from "react-router-dom";

export type TopHeaderType = {
  className?: string;
};

const TopHeader: FunctionComponent<TopHeaderType> = ({ className = "" }) => {
  const navigate = useNavigate()
  return (
    <section className={[styles.topheader, className].join(" ")}>
      <div className={styles.homeiconv2Parent} >
        <img
          className={styles.homeiconv2}
          loading="lazy"
          alt=""
          src="/homeiconv2@2x.png"
          onClick={()=> navigate("/")}
        />
        <div className={styles.magnifierParent}>
          <img
            className={styles.magnifierIcon}
            loading="lazy"
            alt=""
            src="/magnifier.svg"
          />
          <img
            className={styles.profileicon}
            loading="lazy"
            alt=""
            src="/profileicon.svg"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
      <img
        className={styles.headerImageIcon}
        loading="lazy"
        alt=""
        src="/header-image@2x.png"
      />
    </section>
  );
};

export default TopHeader;
