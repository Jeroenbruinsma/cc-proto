import { createContext, useContext, useState } from "react";
import * as Sentry from "@sentry/react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { backendUrl } from "./config";

type availableGetEndpoints =
  | "health"
  | `${"/equipment/serial-to-state?serial="}${"" | `${string}`}`
  | `${"/equipment/serial-to-status?serial="}${"" | `${string}`}`
  | `${"/equipment/serial-to-alarm?serial="}${"" | `${string}`}`
  | `${"/equipment/serial-to-kpi?serial="}${"" | `${string}`}`
  | `${"/equipment/meta?serial="}${"" | `${string}`}`
  | `${"/validator/details"}${"" | `/${string}`}`
  | `${"/units"}${"" | `/${string}`}`
  | `${"/sites"}${"" | `/${string}`}`;
type availablePostEndpoints = "login";

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContext = createContext<{
  token: string | undefined;
  onLogin: (t: string) => void;
  onLogout: () => void;
  get: (a: availableGetEndpoints) => Promise<AxiosResponse>;
  post: (a: availablePostEndpoints, data?: any, config?: any) => Promise<AxiosResponse>;
}>({
  token: undefined,
  onLogin: () => {},
  onLogout: () => {},
  get: async () =>
    ({
      data: {},
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    } as AxiosResponse), // Mock AxiosResponse
  post: async () =>
    ({
      data: {},
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    } as AxiosResponse), // Mock AxiosResponse
});
type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | undefined>(localStorage.getItem("token") || undefined);

  const apiClient = axios.create({
    baseURL: backendUrl || "",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${token}`,
    },
  });
  const _get = async (endpoint: availableGetEndpoints) => {
    if(!token){
      throw new Error("Token is not set. Please log in.");
    }
    try {
      const response = await apiClient.get(endpoint);
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.error("Token expired or unauthorized. Redirecting to login...");
        handleSessionTimeout(); // Clear token and redirect to login
      } else {
        Sentry.captureException(error);
        console.error("An error occurred while making a GET request:", error);
      }
      throw error; // Re-throw the error for further handling if needed
    }
  };

  const _post = async (
    endpoint: availablePostEndpoints,
    data = {},
    config = {}
  ) => {
    if(!token){
      throw new Error("Token is not set. Please log in.");
    }
    try {
      const response = await apiClient.post(endpoint, data, config);
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.error("Token expired or unauthorized. Redirecting to login...");
        handleSessionTimeout(); // Clear token and redirect to login
      } else {
        console.error("An error occurred while making a POST request:", error);
        Sentry.captureException(error);
      }
      throw error; // Re-throw the error for further handling if needed
    }
  };

  const handleLogin = async (token: any) => {
    localStorage.setItem("token", token);
    setToken(token);
    navigate("/sites");
  };

  const handleLogout = () => {
    console.log("handleLogout");
    setToken("");
    localStorage.removeItem("token");
  };

  const handleSessionTimeout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login?sessionExpired=true");
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    get: _get,
    post: _post,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
