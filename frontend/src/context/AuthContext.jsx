import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
// import { VERIFY_USER } from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Use auth is invalid call");
  }

  return context;
};

const AuthProvider = ({ children }) => {
    // const [user, setUser] = useState(() => {
    //   const savedUser = localStorage.getItem("loggedinUser");
    //   return savedUser ? JSON.parse(savedUser) : null;
    // });

    const [isLoading, setIsLoading] = useState();

  const login = async (token, userInfo) => {
    localStorage.setItem("userToken", token);
    localStorage.setItem("loggedinUser", JSON.stringify(userInfo));
    // setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
      localStorage.removeItem("loggedinUser");
    localStorage.removeItem("USER");
    localStorage.removeItem("useremail");
    // setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
          // user,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
