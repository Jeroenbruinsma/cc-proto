import { useTranslation } from "react-i18next"

interface InfoBoxProps{
    type: "validationNavigation" | "sitesPageTesting"
}

export default function InfoBox({ type }:InfoBoxProps
) {
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
  return (
    <div style={{width: "100%", backgroundColor , display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", borderRadius:"15px", margin: "10px 0px 10px 0px"}}>
        <h2 style={{ marginBottom: "0px"}} >{warning}</h2>
        {explanation ? <h4 style={{textAlign: "center"}}>{explanation}</h4> : null }
        {resolution ? <p style={{textAlign: "center"}}>{resolution}</p> : null}
    </div>
  )
}
