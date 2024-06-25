import React, { createContext, useEffect, useState } from "react"
import axios from "axios"


const UserContext = createContext() 

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [userIsAdmin, setUserIsAdmin] = useState(false)
  const [userName, setUserName] = useState("") 
  const [userEmail, setEmailUser] = useState("")
  const [userRole, setRoleUser] = useState("")
  const [userId, setUserId] = useState("") 
  const [userPhone, setUserPhone] = useState("") 
  const [userDataLoaded, setUserDataLoaded] = useState(false) 
  const [isActive, setIsActive] = useState(false)
  const [registerError, setRegisterError] = useState("")
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}


useEffect(() => {
  const handleStorageChange = (event) => {
    if (event.key === 'token') {
      setToken(event.newValue);
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);



  const logout = async () => {
    try {
      await axios.post("https://backendagendamento.onrender.com/auth/logout",null, config)
        localStorage.removeItem("token")
        setToken(null)
        setUserIsAdmin(false)
        setUserName("")
        setUserDataLoaded(false)
        setIsActive(false)
    } catch (error) {
        console.error("Erro ao fazer logout:", error)
    }
}

  const login = async (credentials) => {
    try {
      const response = await axios.post("https://backendagendamento.onrender.com/auth/login", credentials)
      if (response.data.token) {
        const token = response.data.token
        localStorage.setItem("token", token)
        setToken(token)
        setRoleUser(response.data.role)
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error("Algo deu errado:", error)
      return false
    }
  }

  const register = async (userData) => {
     try {
      const response = await axios.post("https://backendagendamento.onrender.com/auth/registrar", userData)
      if (response.status === 200) {
        return true
      } else { 
        return false
      }
    } catch (error) {
      const erroMsg = error.response.data
        console.error( erroMsg)
        setRegisterError(erroMsg)
        return false
    }
  }
 
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("https://backendagendamento.onrender.com/admin/userData", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const {userId, userName, name, isAdmin, is_active,phone } = response.data 
        setUserId(userId)
        setEmailUser(name)
        setUserName(userName)
        setUserIsAdmin(isAdmin)
        setUserPhone(phone)
        setUserDataLoaded(response.data) 
        setRoleUser(response.data.Role)
        setIsActive(is_active)
      } catch (error) {
        console.error("Erro ao recuperar dados do usuário:", error)
        setIsActive(false)
        setUserDataLoaded(false)
      }
    }
    if (token) {
      fetchUserData()
    }
  }, [token])
  


  const contextValue = {
    token,
    setToken,
    userRole,
    userIsAdmin,
    userEmail,
    userId,
    registerError,
    userName,
    logout,
    login,
    register,
    userDataLoaded,
    userPhone,
    isActive,
    setUserName,
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }
