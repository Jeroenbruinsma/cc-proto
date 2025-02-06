import { FunctionComponent } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import { useTranslation } from "react-i18next";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useNavigate } from "react-router-dom";
import { api_ip, api_ip_dev, api_ip_prod, backendUrl } from "../config";

const AdminPage: FunctionComponent = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setBackend = (url: string) => {
    localStorage.setItem('backend', url)
    window.location.reload();
  }
  return (<>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        <div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
          <SubsectionHeader title={t("adminPage")} center/>
          <ul>
            {/* <li onClick={()=> navigate("/customers")}>List of customers [Customer overview]</li> */}
            <li onClick={()=> navigate("/validations")}>Validation of sfdc objects</li>
          </ul>

          <h3>Backend to use:</h3>
          <p><b>Backend currently used</b>: {backendUrl}</p>
          <div style={{display: "flex", justifyContent: "space-between", maxWidth: "500px"}}>
              <button onClick={() => setBackend(api_ip)}>Reset backend</button>
              <button onClick={() => setBackend(api_ip_prod)}>Set prod</button>
              <button onClick={() => setBackend(api_ip_dev)}>Set dev</button>
              <button onClick={() => setBackend("http://127.0.0.1:5000/v0")}>Set localhost</button>
          </div>
        </div>
      </div>
  </>
  )
}

export default AdminPage;