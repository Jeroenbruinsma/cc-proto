import LoginFormContainer from "../components/LoginFormContainer/LoginFormContainer";
import background from "../assets/background.png";
import { useSearchParams } from "react-router-dom";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  return (
    <div style={{ display: "flex", alignItems: "center",  justifyContent: "center", height: "100vh"}}>
      <img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        loading="lazy"
        alt=""
        src={background}
      />
      <LoginFormContainer sessionExpired={ searchParams.get("sessionExpired") === "true"? true : false}/>
    </div>
  );
}
