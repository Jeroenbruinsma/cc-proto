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
            <h3>Quick links sites:</h3>
          <ul>
            <li onClick={()=> navigate("/validationdetails/0011v00001kmAhUAAU")}>Fjord1 AS</li>
            <li onClick={()=> navigate("/validationdetails/0011v00003AZ7EQAA1")}>Boreal Sjø AS</li>
            <li onClick={()=> navigate("/validationdetails/0011v00001oX1p0AAC")}>	Port of Turku Ltd.</li>
            </ul>
            <h3>Quick links Assets:</h3>
            <p>Some units appear multiple times in SFDC, let me know when the links need to be updated</p>
            <ul>
            <li onClick={()=> navigate("/validationdetails/02i1v00000YaqDGAAZ")}>Edoya (Ramp)</li>
            <li onClick={()=> navigate("/validationdetails/02i1v00000YaqDzAAJ")}>Halsa (Ramp)</li>
            <li onClick={()=> navigate("/validationdetails/02i1v00000YaqE9AAJ")}>Kanestraum (Ramp)</li>
            <li onClick={()=> navigate("/validationdetails/02i1v00000YamMuAAJ")}>Kinsarvik (Tower)</li>
            <li onClick={()=> navigate("/validationdetails/02i1v00000YamMVAAZ")}>Kvanndal (Tower)</li>
            <li onClick={()=> navigate("/validationdetails/02i1v00000YaqDpAAJ")}>Kvanne (Ramp)</li>
            <li onClick={()=> navigate("/validationdetails/02i1v00000ZkPTTAA3")}>Matre (Tower)</li>
            <li onClick={()=> navigate("/validationdetails/02i1v00000YaqDuAAJ")}>Rykkjem (Ramp)</li>
            <li onClick={()=> navigate("/validationdetails/02i1v00000Yapi8AAB")}>Sandvika (Ramp)</li>
            <li onClick={()=> navigate("/validationdetails/02i1v00000fpCL9AAM")}>Skanevik (Tower)</li>
            <li onClick={()=> navigate("/validationdetails/02i1v00000ZlIijAAF")}>Utaker (Tower)</li>
            <li onClick={()=> navigate("/validationdetails/02i1v00000YamMfAAJ")}>Utne (Tower)</li> 
          </ul>
        </div>
      </div>
  </>
  )
}

export default ValidationsTypePage;