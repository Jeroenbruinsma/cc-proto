import { useTranslation } from "react-i18next"
import QM from "./x.svg";
import { useState } from "react";

interface InfoBoxProps{
    type: "validationNavigation" | "sitesPageTesting" | "assetNotValidated" | "accountNotValidated"
}

export default function InfoBox({ type }:InfoBoxProps
) {
    const [hide, set_hide] = useState(false) 
    const {t} =  useTranslation()
    let warning =  undefined
    let explanation = undefined
    let resolution = undefined
    let backgroundColor= '#f58989'
    if(type === "validationNavigation" ){
      warning = t("validations.warning")
      explanation = t("validations.explanation") 
      resolution = t("validations.resolution")
    }
    if(type === "sitesPageTesting"){
        warning = t("testingSitesPage.warning")
        explanation = t("testingSitesPage.explanation") 
        backgroundColor = "#f5bf89"
    }
    if(type === "assetNotValidated"){
        warning = t("assetValidation.warning")
        explanation = t("assetValidation.explanation") 
        backgroundColor = "#f5bf89"
    }
    if(type === "accountNotValidated"){
        warning = t("accountValidation.warning")
        explanation = t("accountValidation.explanation") 
        backgroundColor = "#f5bf89"
    }
  if(hide) return <></>  
  return (
    <div style={{width: "100%", backgroundColor , display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", borderRadius:"15px", 
    margin: "10px 0px 10px 0px", padding: "10px 10px"}}>
      <div style={{display: "flex", alignItems: "flex-end", flexDirection: "column",     width: "100%"}}>
         {/* 
        //@ts-ignore */}
          <QM fill="black" width="25px" onClick={()=> set_hide(true)} />
        </div>
        <h2 style={{ margin: "0px 0px 0px 0px"}} >{warning}</h2>
        {explanation ? <h4 style={{textAlign: "center"}}>{explanation}</h4> : null }
        {resolution ? <p style={{textAlign: "center"}}>{resolution}</p> : null}
    </div>
  )
}
