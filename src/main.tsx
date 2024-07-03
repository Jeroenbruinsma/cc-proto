import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Sites from './pages/Sites.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Sites}/>
        {/* <Route path="/sites/:id" Component={App}/> */}
        <Route path="/unit/:id" Component={App}/>

        <Route path="/login" Component={Login}/>
      </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)



    