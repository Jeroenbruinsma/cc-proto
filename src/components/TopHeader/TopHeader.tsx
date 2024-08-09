import { FunctionComponent } from "react";
import styles from "./TopHeader.module.css";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/cavotec-logo-galaxy.svg'

export type TopHeaderType = {
  className?: string;
  showImage?: boolean
};

const TopHeader: FunctionComponent<TopHeaderType> = ({ className = "", showImage = false }) => {
  const navigate = useNavigate()
  return (
    <section className={[styles.topheader, className].join(" ")}>
      <div className={styles.homeiconv2Parent} >
        {/*
        //@ts-ignore */}
        <Logo fill="#D9D9D9" height="4vh" onClick={()=> navigate("/sites")}/>
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
    {showImage? <img
      className={styles.headerImageIcon}
      loading="lazy"
      alt=""
      src="/header-image@2x.png"
    /> : null}
    </section>
  );
};

export default TopHeader;
