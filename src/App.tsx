import "./global.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Sites from "./pages/Sites.tsx";
import UnitDetailsPage from "./pages/UnitDetailsPage.tsx";
import './i18n/config';
import UnitsPage from "./pages/UnitsPage.tsx";
import axios from "axios";
import { useEffect, useState } from "react";
import PlatformMessage from "./components/PlatformMessage/PlatformMessage.tsx";
import { useTranslation } from "react-i18next";
import { backendUrl } from "./config.ts";

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
    {!connectionToKiv ? <PlatformMessage msg={t("error.platform.backendConnection")}/> : null}
      <Routes>
        <Route path="/sites/:id" Component={UnitsPage} />
        <Route path="/sites" Component={Sites} />
        <Route path="/unit/:id" Component={UnitDetailsPage} />
        <Route path="/login" Component={Login} />
        <Route path="/" Component={Login} />
      </Routes>
    </>
  );
}

export default App;
