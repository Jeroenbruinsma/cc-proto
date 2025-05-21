import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter as Router } from 'react-router-dom'
import * as Sentry from "@sentry/react";
import { api_ip } from './config.ts'

export const backendUrl = localStorage.getItem('backend') ? localStorage.getItem('backend') : api_ip
if(backendUrl === api_ip){
  console.log("using sentry for issue tracking")
  Sentry.init({
    dsn: "https://93bebd9741ee7333a15c088e37b7278d@o4509010321342464.ingest.de.sentry.io/4509359825944656",
    sendDefaultPii: true
  });
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App/>
  </Router>
  </React.StrictMode>,
)



    