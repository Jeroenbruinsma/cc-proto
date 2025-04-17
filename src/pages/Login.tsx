import ImageContainer from "../components/ImageContainer/ImageContainer";
import LoginFormContainer from "../components/LoginFormContainer/LoginFormContainer";
import left from "../assets/login_side_left.png";
import right from "../assets/login_side_right.png";
import { useSearchParams } from "react-router-dom";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  console.log("eee",searchParams.get("sessionExpired"))
  return (
    <div style={{ display: "flex", alignItems: "center",  justifyContent: "center", height: "100vh"}}>
      <ImageContainer image={left} />
      <LoginFormContainer sessionExpired={ searchParams.get("sessionExpired") === "true"? true : false}/>
      <ImageContainer image={right} />
    </div>
  );
}
