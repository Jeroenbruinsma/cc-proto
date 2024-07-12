import "./global.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Sites from "./pages/Sites.tsx";
import UnitDetailsPage from "./pages/UnitDetailsPage.tsx";
import './i18n/config';

function App() {
  return (
    <>
    
      <Routes>
        <Route path="/sites" Component={Sites} />
        <Route path="/sites/:id" Component={Sites} />
        <Route path="/unit/:id" Component={UnitDetailsPage} />
        <Route path="/login" Component={Login} />
        <Route path="/" Component={Login} />
      </Routes>
    </>
  );
}

export default App;
