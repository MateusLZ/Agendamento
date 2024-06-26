import Botao from "../Botao/Botao"
import { FaRegUserCircle } from "react-icons/fa"
import { UserContext } from "../../Context/Provider"
import React, { useContext, useEffect, useState } from "react"
import logoSalao from "../../images/iconSalao.png"
import { useNavigate } from "react-router-dom"
import { FaChevronDown,FaChevronUp  } from "react-icons/fa6"

import "./Style.css"

function Navegacao() {
    const { userName, userIsAdmin, logout, userRole } = useContext(UserContext)
    const [nomeRole, setNomeRole] = useState("")
    const [mostrarParagrafo, setMostrarParagrafo] = useState(false)
    const [userNameNav, setUserNameNav] = useState(userName)
    const navigate = useNavigate()

    const toggleParagrafo = () => {
        setMostrarParagrafo(!mostrarParagrafo)
    }


    useEffect(() => {
        fetchNameRole()
        
    }, [userRole])

    useEffect(() => {
        setUserNameNav(userName)
    }, [userName])

    const fetchNameRole = () => {
        switch (userRole) {
            case "ADMIN":
                setNomeRole("Administrador")
                break
            case "FUNCIONARIO":
                setNomeRole("Funcionário")
                break
            default:
                setNomeRole("")
                break
        }
    }

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    const handleNavigateToHome = () => {
        navigate("/home")
    }

    const handleNavigateToAgendamentos = () => {
        navigate("/agenda")
    }

    const handleNavigateToPerfil = () => {
        navigate("/perfil")
    }

    const handleNavigateToServicos = () => {
        navigate("/servicos") 
    }

    const handleNavigateToFuncionarios = () => {
        navigate("/funcionarios")
    }

    return (
        <div className="menu-rota">
            <div className="name-salao">
                <img className="logo-salao" src={logoSalao} alt="" />
                <h1 className="title-salao">Cabelo <br/>& Art</h1>
            </div>
            <nav className="navegacao">
                <ul className="header-menu">
                    {(userRole === "USER" && (
                        <Botao text='Início' icon={"home"} onClick={handleNavigateToHome} />
                    ))}
    <Botao text='Agendamentos' icon={"calendar"} onClick={handleNavigateToAgendamentos} />
                    <Botao text='Serviços' icon={'briefcase'} onClick={handleNavigateToServicos} />
                    {userIsAdmin && <Botao text='Funcionários' icon={'users'} onClick={handleNavigateToFuncionarios} />}
<Botao text='Configurações' icon={'config'} onClick={handleNavigateToPerfil} />
                </ul>
            </nav>
            <div className="user-info">
                <div className="user-profile">
                    <div className="foto-perfil">
                        <FaRegUserCircle size={44} />
                    </div>
                    <div className="nome-user">
                        <p>{userNameNav}</p>
                        <p>{nomeRole}</p>
                    </div>
                    <div className="chevron-sair">
                        {mostrarParagrafo ? (
                            <FaChevronUp className="cursor-pointer" onClick={toggleParagrafo} />
                        ) : (
                            <FaChevronDown className="cursor-pointer" onClick={toggleParagrafo} />
                        )}
                        {mostrarParagrafo && (
                            <p className="logout-app cursor-pointer" onClick={handleLogout}>
                                Sair da conta
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Navegacao
