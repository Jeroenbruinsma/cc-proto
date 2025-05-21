import "./global.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Sites from "./pages/Sites.tsx";
import UnitDetailsPage from "./pages/UnitDetailsPage.tsx";
import UnitKPIDetailsPage from "./pages/UnitKpiDetailsPage.tsx";
import './i18n/config';
import UnitsPage from "./pages/UnitsPage.tsx";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/react";
import PlatformMessage from "./components/PlatformMessage/PlatformMessage.tsx";
import { useTranslation } from "react-i18next";
import { api_ip, backendUrl } from "./config.ts";
import NotFound from "./pages/NotFound.tsx";
import UsersPage from "./pages/Users.tsx";
import CustomersDetailPage from "./pages/CustomersDetailPage.tsx";
import ValidationsDetailsPage from "./pages/ValidationsDetailsPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import ValidationsTypePage from "./pages/ValidationsTypePage.tsx";
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundry.tsx";
import NomenclaturePage from "./pages/NomenclaturePage.tsx";
import UsersDetailsPage from "./pages/UsersDetailsPage.tsx";
import DemoLinksPage from "./pages/DemolinksPage.tsx";
import UnitsAlarmsPage from "./pages/UnitAlarmsPage.tsx";
import UnitServiceNeedPage from "./pages/UnitServiceNeedPage.tsx";
import AuthProvider from "./AuthProvider.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

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
      Sentry.captureException(err)
    }
  }
  useEffect(()=>{
    checkKivConnection()
  },[])
  return (
    <>
    <ErrorBoundary>
    
      <AuthProvider>
    {!connectionToKiv ? <PlatformMessage msg={t("error.platform.backendConnection")}/> : null}
    {backendUrl != api_ip ? <PlatformMessage msg={t("error.platform.alternativeBackend")}/> : null}
        <Routes>
          <Route path="/admin" element={<ProtectedRoute><AdminPage/></ProtectedRoute>} />
          <Route path="/demolinks" element={<ProtectedRoute><DemoLinksPage/></ProtectedRoute>} />
          <Route path="/nomenclature/:type" element={<ProtectedRoute><NomenclaturePage/></ProtectedRoute>} />
          <Route path="/validations" element={<ProtectedRoute><ValidationsTypePage/></ProtectedRoute>} />
          <Route path="/validationdetails/:id" element={<ProtectedRoute><ValidationsDetailsPage/></ProtectedRoute>} />
          <Route path="/sites/:id" element={<ProtectedRoute><UnitsPage/></ProtectedRoute>} />
          <Route path="/sites" element={<ProtectedRoute><Sites/></ProtectedRoute>} />
          <Route path="/customers/:id" element={<ProtectedRoute><CustomersDetailPage/></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><UsersPage/></ProtectedRoute>} />
          <Route path="/user/:id" element={<ProtectedRoute><UsersDetailsPage/></ProtectedRoute>} />
          <Route path="/unit/:id" element={<ProtectedRoute><UnitDetailsPage/></ProtectedRoute>} />
          <Route path="/unit/:id/historicalAlarms" element={<ProtectedRoute><UnitsAlarmsPage/></ProtectedRoute>} />
          <Route path="/unit/:id/serviceneeds" element={<ProtectedRoute><UnitServiceNeedPage/></ProtectedRoute>} />
          <Route path="/unit/:id/kpi/:kpiid" element={<ProtectedRoute><UnitKPIDetailsPage/></ProtectedRoute>} />
          
          {/* Unauthenticated routees */}
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Login/>} />
          <Route path="*" element={<NotFound/>}/>
      </Routes>
      </AuthProvider>
    </ErrorBoundary>
    </>
  );
}

export default App;
