import ImageContainer from "../components/ImageContainer/ImageContainer";
import LoginFormContainer from "../components/LoginFormContainer/LoginFormContainer";

export default function Login() {
  return (
    <div style={{display:"flex", alignItems: "center"}}>  
    <ImageContainer/>
        <LoginFormContainer/>
    <ImageContainer/>
    </div>
  )
}
