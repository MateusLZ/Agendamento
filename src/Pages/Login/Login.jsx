import React, { useState, useContext } from "react";
import axios from "axios";
import './Style.css';
import InputCustomizado from "../../components/Input/index";
import ButtonCustomizado from "../../components/Button/index";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Provider";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({ email: "", password: "", userName: "" });
    const [isLoginForm, setIsLoginForm] = useState(true); 
    const navigate = useNavigate();
    const { login, register } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            let success = false;

            if (isLoginForm) {
                success = await login(credentials);
            } else {
                // Para cadastrar, enviar apenas email e senha
                const userData = { login: credentials.login, userName:credentials.userName, password: credentials.password};
                success = await register(userData);
                success = await login(credentials);

            }
  
            // Lidar com a resposta do backend
            if (success) {
                navigate("/loading");
            } else {
                // Login ou registro falhou
                alert("Operação inválida. Por favor, tente novamente.");
            }
        } catch (err) {
            console.error("Algo deu errado:", err);
            alert("Algo deu errado. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    }

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm); // Alternar entre os formulários de login e cadastro
    }

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h1>{isLoginForm ? 'Faça o seu login' : 'Cadastre-se'}</h1>
                {isLoginForm ? (
                    <>
                        <InputCustomizado
                            name="login"
                            placeholder="Digite o seu email"
                            onChange={handleChange}
                            type="email"
                            required
                        />
                        <InputCustomizado
                            name="password"
                            placeholder="Digite a sua senha"
                            onChange={handleChange}
                            type="password"
                            required
                        />
                    </>
                ) : (
                    <>
                        <InputCustomizado
                            name="login"
                            placeholder="Digite o seu email"
                            onChange={handleChange}
                            type="emai"
                            required
                        />
                        <InputCustomizado
                            name="userName"
                            placeholder="Digite o seu nome de usuario"
                            onChange={handleChange}
                            type="emai"
                            required
                        />
                        <InputCustomizado
                            name="password"
                            placeholder="Digite a sua senha"
                            onChange={handleChange}
                            type="password"
                            required
                        />
                    </>
                )}
                {/* Condicionalmente renderizar o botão com base no estado */}
                <ButtonCustomizado
                    type='submit'
                    text={isLoginForm ? 'Entrar' : 'Cadastrar'}
                    disabled={loading} // Desabilitar o botão enquanto estiver carregando
                />
                <div>
                    <p>{isLoginForm ? 'Não possui conta?' : 'Já possui uma conta?'}</p>
                    {/* Alterar o texto do link com base no estado e adicionar evento onClick */}
                    <a href="#" onClick={toggleForm}>{isLoginForm ? 'Cadastrar' : 'Fazer login'}</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
