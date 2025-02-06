import "./global.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Sites from "./pages/Sites.tsx";
import UnitDetailsPage from "./pages/UnitDetailsPage.tsx";
import UnitKPIDetailsPage from "./pages/UnitDetailsPage.tsx";
import './i18n/config';
import UnitsPage from "./pages/UnitsPage.tsx";
import axios from "axios";
import { useEffect, useState } from "react";
import PlatformMessage from "./components/PlatformMessage/PlatformMessage.tsx";
import { useTranslation } from "react-i18next";
import { api_ip, backendUrl } from "./config.ts";
import NotFound from "./pages/NotFound.tsx";
import CustomersPage from "./pages/Customers.tsx";
import UsersPage from "./pages/Users.tsx";
import CustomersDetailPage from "./pages/CustomersDetailPage.tsx";
import ValidationsPage from "./pages/ValidationsPage.tsx";
import ValidationsDetailsPage from "./pages/ValidationsDetailsPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import ValidationsTypePage from "./pages/ValidationsTypePage.tsx";
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundry.tsx";
import NomenclaturePage from "./pages/NomenclaturePage.tsx";
import UsersDetailsPage from "./pages/UsersDetailsPage.tsx";
import Testing from "./pages/TestingDetails.tsx";
import DemoLinksPage from "./pages/DemolinksPage.tsx";

function App() {
  
  const [connectionToKiv, set_connectionToKiv ] = useState< Boolean >(false)
  const {t} = useTranslation()
  const checkKivConnection = async () => {
    try{
      const url = `${backendUrl}/health`
      const res = await axios.get(url)
      set_connectionToKiv(res?.data?.success)
    }
    catch(err){
      console.log("err",err)
      set_connectionToKiv(false)
    }
  }
  useEffect(()=>{
    checkKivConnection()
  },[])
  return (
    <>
    <ErrorBoundary>
    {!connectionToKiv ? <PlatformMessage msg={t("error.platform.backendConnection")}/> : null}
    {backendUrl != api_ip ? <PlatformMessage msg={t("error.platform.alternativeBackend")}/> : null}
      <Routes>
        <Route path="/admin" Component={AdminPage} />
        <Route path="/demolinks" Component={DemoLinksPage} />
        <Route path="/nomenclature/:type" Component={NomenclaturePage} />
        <Route path="/validations" Component={ValidationsTypePage} />
        <Route path="/validations/:id" Component={ValidationsPage} />
        <Route path="/validationdetails/:id" Component={ValidationsDetailsPage} />
        <Route path="/sites/:id" Component={UnitsPage} />
        <Route path="/sites" Component={Sites} />
        <Route path="/customers" Component={CustomersPage} />
        <Route path="/customers/:id" Component={CustomersDetailPage} />
        <Route path="/users" Component={UsersPage} />
        <Route path="/user/:id" Component={UsersDetailsPage} />
        <Route path="/unit/:id" Component={UnitDetailsPage} />
        <Route path="/kpi/:id" Component={UnitKPIDetailsPage} />
        <Route path="/testing" Component={Testing} />

        <Route path="/login" Component={Login} />
        <Route path="/" Component={Login} />
        <Route path="*" Component={NotFound}/>
      </Routes>
    </ErrorBoundary>
    </>
  );
}

export default App;
