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
        <Route path="/" Component={App}/>
        <Route path="/sites" Component={Sites}/>
        <Route path="/login" Component={Login}/>
      </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)



    