import { FunctionComponent } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import { useTranslation } from "react-i18next";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useNavigate } from "react-router-dom";

const DemoLinksPage: FunctionComponent = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (<>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        <div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
          <SubsectionHeader title={t("demoPage")} center/>
          <ul>
            {/* <li onClick={()=> navigate("/customers")}>List of customers [Customer overview]</li> */}
            <li onClick={()=> navigate("/validations")}>Validation of sfdc objects</li>
          </ul>

          <h3>Quick links Turku:</h3>
          <ul>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0001')}`)}><b>Unit 1</b> (1902121-14165-0/0001)</li>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0002')}`)}><b>Unit 2</b> (1902121-14165-0/0002)</li>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0003')}`)}><b>Unit 3</b> (1902121-14165-0/0003)</li>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0004')}`)}><b>Unit 4</b> (1902121-14165-0/0004)</li>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0005')}`)}><b>Unit 5</b> (1902121-14165-0/0005)</li>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1902121-14165-0/0006')}`)}><b>Unit 6</b> (1902121-14165-0/0006)</li>
          </ul>
          <h3>Quick links Helsinki:</h3>
          <ul>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1903115-10514-0/0001')}`)}><b>Unit 1</b> (1903115-10514-0/0001)</li>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1903115-10514-0/0002')}`)}><b>Unit 2</b> (1903115-10514-0/0002)</li>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1903115-10514-0/0003')}`)}><b>Unit 3</b> (1903115-10514-0/0003)</li>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1903115-10514-0/0004')}`)}><b>Unit 4</b> (1903115-10514-0/0004)</li>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1903115-10514-0/0005')}`)}><b>Unit 5</b> (1903115-10514-0/0005)</li>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('1903115-10514-0/0006')}`)}><b>Unit 6</b> (1903115-10514-0/0006)</li>
          </ul>
          <h3>Quick links Kapelskar:</h3>
          <ul>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('2102580-16692-0001')}`)}><b>Power Unit 1 (MU01/MU02)</b> (2102580-16692-0001)</li>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('2102580-16692-0002')}`)}><b>Power Unit 2 (MU03/MU04)</b> (2102580-16692-0002)</li>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('2102580-16692-0003')}`)}><b>Power Unit 3 (MU05/MU06)</b> (2102580-16692-0003)</li>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('2102580-16692-0004')}`)}><b>Power Unit 4 (MU07/MU08)</b> (2102580-16692-0004)</li>
            <li onClick={ ()=> navigate(`/unit/${encodeURIComponent('2102580-16692-0005')}`)}><b>Power Unit 5 (MU09/MU10)</b> (2102580-16692-0005)</li>
          </ul>
          <br/><br/><br/>
        </div>
      </div>
  </>
  )
}

export default DemoLinksPage;