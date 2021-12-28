import axios from "axios";
import { useCookies } from "react-cookie";
import React, { useContext, useState, useEffect } from "react";

const UserInfoContext = React.createContext(null);

function MyApp({ children }) {
  const [userInfo, setUser] = useState({});
  const [isLogin, setLoginStatus] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);
  const defaultLogin = async () => {
    if (cookies.userInfo && cookies.userInfo.user_token) {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_HOST + "/user/checkToken",
          { params: { token: cookies.userInfo.user_token } }
        );
        if (response.status === 200) {
          setUser(cookies.userInfo);
          setTimeout(() => {
            setLoginStatus(true);
          }, 100);
        }
      } catch (err) {
        setLoginStatus(false);
        removeCookie("userInfo");
      }
    }
  };
  useEffect(() => {
    defaultLogin();
  }, []);
  const login = (userInfo) => {
    setUser(userInfo);
    setCookie("userInfo", userInfo);
    setLoginStatus(true);
  };
  const logout = () => {
    setUser({});
    removeCookie("userInfo");
    setLoginStatus(false);
  };
  const value = {
    userInfo,
    isLogin,
    login,
    logout,
  };

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
}
export default MyApp;
export function useUser() {
  return useContext(UserInfoContext);
}
