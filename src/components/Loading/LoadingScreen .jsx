import React, { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserProvider, UserContext } from "../../Context/Provider";
import { Spinner } from 'react-bootstrap';
import './Style.css';



const LoadingScreen = () => {
    const { token, setToken, userIsAdmin, userName, logout } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Simulando um tempo de carregamento com setTimeout
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Quando o tempo acabar, altere o estado de carregamento para falso
            navigate("/home"); // Redirecione para a tela home
        }, 2000); // Tempo de carregamento simulado (em milissegundos)
        
        // Limpe o timer quando o componente for desmontado
        return () => clearTimeout(timer);
    }, [navigate]);

    // Renderizar a tela de carregamento enquanto o estado de carregamento for verdadeiro
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
    );
};



export default LoadingScreen;
