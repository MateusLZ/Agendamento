import Botao from "../Botao/Botao";
import { FaRegUserCircle } from "react-icons/fa";
import { UserContext } from "../../Context/Provider";
import React, { useContext } from "react";
import logoSalao from "../../images/iconSalao.png"
import { useNavigate } from "react-router-dom";

import "./Style.css"

function Navegacao() {
    const {setUserName, userName,userEmail, userIsAdmin,logout } = useContext(UserContext);
    const navigate = useNavigate();


    const handleLogout = () => {
      logout();
      navigate("/");
  };
 
    const handleNavigateToHome = () => {
        navigate("/home");
    };

    const handleNavigateToAgendamentos = () => {
        navigate("/agenda"); // Substitua com a rota dos agendamentos
    };

    const handleNavigateToPerfil = () => {
        navigate("/perfil"); // Substitua com a rota do perfil
    };

    const handleNavigateToServicos = () => {
        navigate("/servicos"); // Substitua com a rota dos serviços
    };

    const handleNavigateToFuncionarios = () => {
        navigate("/funcionarios"); // Substitua com a rota dos funcionários
    };
    return (
        <div className="menu-rota">
            
            <div className="name-salao">
                <img className="logo-salao" src={logoSalao} alt="" />
                <h1 className="title-salao">Cabelo <br/>& Art</h1>
            </div>
            <nav className="navegacao">
                <ul className="header-menu">
                    <Botao  text='Início' icon={"home"} onClick={handleNavigateToHome} />
                    <Botao text='Agendamentos' icon={"calendar"} onClick={handleNavigateToAgendamentos} />
                    <Botao text='Perfil' icon={'user'} onClick={handleNavigateToPerfil} />
                    <Botao text='Serviços' icon={'briefcase'} onClick={handleNavigateToServicos} />
                    {userIsAdmin && <Botao text='Funcionarios' icon={'users'} onClick={handleNavigateToFuncionarios} />}
                </ul>
            </nav>
            <div className="user-info">
                <div className="user-profile">
                <div className="foto-perfil">
                    <FaRegUserCircle size={44} />
                </div>
                <div className="nome-user">
                    <p>{userName}</p>
                    {userIsAdmin && <p>Administrador</p>}
                </div>
                </div>

            </div>

            {/* <div className="logout"> 
                <Botao text='Sair' icon={'exit'} onClick={handleLogout} />
            </div> */}
        </div>
    )
}

export default Navegacao;
