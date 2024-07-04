import ImageContainer from "../components/ImageContainer/ImageContainer";
import LoginFormContainer from "../components/LoginFormContainer/LoginFormContainer";
import left from "../assets/login_side_left.png";
import right from "../assets/login_side_right.png";

export default function Login() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ImageContainer image={left} />
      <LoginFormContainer />
      <ImageContainer image={right} />
    </div>
  );
}
