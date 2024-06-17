import React, { useEffect, useState,useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserProvider, UserContext } from "../../Context/Provider"
import { Spinner } from 'react-bootstrap'
import './Style.css'



const LoadingScreen = () => {
    const { token, setToken, userIsAdmin, userName, logout,userRole } = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false) 
            switch (userRole) {
                case "ADMIN":
                    navigate("/agenda") 
                    break
                case "FUNCIONARIO":
                    navigate("/agenda") 
                    break
                default:
                    navigate("/home") 
                    break
            }
        }, 2000) 
        
        return () => clearTimeout(timer)
    }, [navigate])

    return (
        <div>
            {loading ? (
                <div className="carregamento">
                     <Spinner animation="border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </Spinner>
                        </div>
            ) : null}
        </div>
    )
}

export default LoadingScreen
