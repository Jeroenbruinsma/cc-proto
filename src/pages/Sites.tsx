import { FunctionComponent } from "react";
import TopHeader from "../components/TopHeader/TopHeader";
import Table from "../components/Table/Table";
import SubsectionHeader from "../components/SubsectionHeader/SubsectionHeader";
import { useTranslation } from "react-i18next";


const SitesPage: FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <>
      <TopHeader showImage={true} />
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
        	<div style={{width: "90%", display: "flex", alignItems: "left", justifyContent: "center", flexDirection:"column"}}>
            <SubsectionHeader title={t("siteOverview")} center/>
            <Table/>
        </div>
      </div>
    </>
  );
};

export default SitesPage;
