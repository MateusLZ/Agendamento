import React, { createContext, useEffect, useState } from "react";
import axios from "axios";


const UserContext = createContext(); 

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [userName, setUserName] = useState(""); 
  const [userEmail, setEmailUser] = useState("");
  const [userRole, setRoleUser] = useState("");
  const [userId, setUserId] = useState(""); 
  const [userDataLoaded, setUserDataLoaded] = useState(false); 
  const [isActive, setIsActive] = useState(false);

  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

  const logout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout",null, config)
        localStorage.removeItem("token");
        setToken(null);
        setUserIsAdmin(false);
        setUserName("");
        setUserDataLoaded(false);
        setIsActive(false);
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
    }
};

  const login = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", credentials);
      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setToken(token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Algo deu errado:", error);
      return false;
    }
  };

  const register = async (userData) => {
     try {
      const response = await axios.post("http://localhost:8080/auth/registrar", userData);
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error.response.data);
      return false;
    }
  };
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("http://localhost:8080/admin/userData", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const {userId, userName, name, isAdmin, is_active   } = response.data; 
        console.log(response.data)
        setUserId(userId);
        setEmailUser(name);
        setUserName(userName);
        setUserIsAdmin(isAdmin);
        setUserDataLoaded(response.data); 
        setRoleUser(response.data.Role)
        setIsActive(is_active);
      } catch (error) {
        console.error("Erro ao recuperar dados do usuário:", error);
        setIsActive(false);
        setUserDataLoaded(false); // Definir que os dados do usuário não foram carregados devido a um erro
      }
    }
    if (token) {
      fetchUserData();
    }
  }, [token]);
  


  const contextValue = {
    token,
    setToken,
    userRole,
    userIsAdmin,
    userEmail,
    userId,
    userName,
    logout,
    login,
    register,
    userDataLoaded,
    isActive,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext }; // Exporte o Provider e o Context
