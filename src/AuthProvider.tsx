import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const useAuth = () => {
    return useContext(AuthContext);
  };
  

const AuthContext = createContext<{
    token: string| undefined;
    onLogin: (t: string) => void;
    onLogout: () => void;
  }>({
    token: undefined,
    onLogin: () => {},
    onLogout: () => {},
  });
  
  type AuthProviderProps = {
    children: React.ReactNode;
  };
  
  const AuthProvider = ({ children }: AuthProviderProps) => {
    console.log("AuthProvider render")
    const navigate = useNavigate()
    const [token, setToken] = useState("");
  
    const handleLogin = async (token:any) => {
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/sites")
    };
  
    const handleLogout = () => {
      setToken("");
      localStorage.removeItem("token")
    };
  
    const value = {
      token,
      onLogin: handleLogin,
      onLogout: handleLogout,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };

  export default AuthProvider