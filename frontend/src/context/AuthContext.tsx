import { createContext, useState, useEffect, Children } from "react";
import { AJAX } from "../utils/getJson";
import { API_URL } from "../config";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

type tokensData = {
  refresh: string;
  access: string;
};

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  let data: tokensData;

  let [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") || "{}")
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens") || "{}")
      : null
  );
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    let fourMinutes = 1000 * 600 * 4;

    let interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authToken, loading]);

  let loginUser = async (e: Event) => {
    try {
      e.preventDefault();
      data = await AJAX(`${API_URL}/users/token/`, true, {
        "email": e.target.email.value,
        "password": e.target.password.value,
      });

      //Save a refresh and access token
      setAuthToken(data);
      console.log(data);
      //Set user data
      setUser(jwtDecode(data.access));
      console.log(jwtDecode(data.access));
      //Save it to localstorage
      localStorage.setItem("authTokens", JSON.stringify(data));

      navigate("/");
    } catch (err) {
      alert("something when wrong");
    }
  };

  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/user/login");
  };

  let updateToken = async () => {
    try {
      console.log("update token");
      data = await AJAX(`${API_URL}/users/token/refresh/`, true, {
        "refresh": authToken.refresh,
      });
      //Save a refresh and access token
      setAuthToken(data);
      //Set user data
      setUser(jwtDecode(data.access));
      //Save it to localstorage
      localStorage.setItem("authTokens", JSON.stringify(data));
    } catch (err) {
      alert("something when wrong");
      logoutUser();
    }
  };

  let contextData = {
    loginUser: loginUser,
    user: user,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
