import "./global.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Sites from "./pages/Sites.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sites" Component={Sites} />
        <Route path="/sites/:id" Component={Sites} />
        <Route path="/unit/:id" Component={App} />
        <Route path="/login" Component={Login} />
        <Route path="/" Component={Login} />
      </Routes>
    </>
  );
}

export default App;
