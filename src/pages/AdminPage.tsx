import { FunctionComponent } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import { useTranslation } from "react-i18next";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useNavigate } from "react-router-dom";

const AdminPage: FunctionComponent = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (<>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        <div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
          <SubsectionHeader title={t("adminPage")} center/>
          <ul>
            <li onClick={()=> navigate("/customers")}>List of customers [Customer overview TTTT]</li>
            <li onClick={()=> navigate("/validations")}>Validation of sfdc objects</li>
          </ul>
        </div>
      </div>
  </>
  )
}

export default AdminPage;