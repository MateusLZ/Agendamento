import React, { createContext, useEffect, useState } from "react";
import axios from "axios";


const UserContext = createContext(); 

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [userName, setUserName] = useState(""); 
  const [userEmail, setEmailUser] = useState(""); 
  const [userDataLoaded, setUserDataLoaded] = useState(false); 
  console.log(userName)

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserIsAdmin(false);
    setUserName("");
    setUserDataLoaded(false)
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

        const { userName, name, isAdmin } = response.data; 
        setEmailUser(name);
        setUserName(userName);
        setUserIsAdmin(isAdmin);
        setUserDataLoaded(true); // Definir que os dados do usuário foram carregados com sucesso
      } catch (error) {
        console.error("Erro ao recuperar dados do usuário:", error);
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
    userIsAdmin,
    userEmail,
    userName,
    logout,
    login,
    register,
    userDataLoaded,
    
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext }; // Exporte o Provider e o Context
