import { useNavigate } from "react-router-dom"
import styles from "./InPageNav.module.css";
import { useTranslation } from "react-i18next";


const InPageNav = () => {
    const navigate = useNavigate()
    const {t} =  useTranslation()

    return (
        <div className={styles.back} onClick={() => navigate(-1)}>
        <img
          className={styles.singleArrowLeft}
          loading="lazy"
          alt=""
          src="/arrow-left-55.svg"
        />
        <p className={styles.backText} >{t("basics.back")}</p>
        </div>
  )
}

export default InPageNav