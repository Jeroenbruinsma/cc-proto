import { FunctionComponent } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import { useTranslation } from "react-i18next";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useNavigate } from "react-router-dom";

const ValidationsTypePage: FunctionComponent = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (<>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        <div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
          {/* @ts-ignore */}
          <SubsectionHeader title={t("sfdcObjectNavigationPage")} center/>
            <h3>In testing phase:</h3>
          <ul>
            <li onClick={()=> navigate("/validations/account")}>Validation of Accounts</li>
            <li onClick={()=> navigate("/validations/asset")}>Validation of Assets</li>
          </ul>
            <h3>Future:</h3>
          <ul>
            <li onClick={()=> navigate("/validations/workorder")}>Validation of WorkOrders TODO</li>
            <li onClick={()=> navigate("/validations/case")}>Validation of Cases TODO</li>
          </ul>
        </div>
      </div>
  </>
  )
}

export default ValidationsTypePage;