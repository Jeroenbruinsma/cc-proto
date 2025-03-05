import { useNavigate } from "react-router-dom"
import styles from "./InPageNav.module.css";


const InPageNav = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.back} onClick={() => navigate(-1)}>
        <img
          className={styles.singleArrowLeft}
          loading="lazy"
          alt=""
          src="/arrow-left-55.svg"
        />
        <p className={styles.backText} >Back</p>
        </div>
  )
}

export default InPageNav