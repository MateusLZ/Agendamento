import React, { useState, useContext, useEffect } from "react"
import './Style.css'
import InputCustomizado from "../../components/Input/index"
import ButtonCustomizado from "../../components/Button/index"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../Context/Provider"
import imgLogin from "../../images/imgLogin.svg"
import logoSalao from "../../images/iconSalao.png"
import Modal from "../../components/Modal"
import { FaTimes } from "react-icons/fa";




const Login = () => {
    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState({ email: "", password: "", userName: "" })
    const [isLoginForm, setIsLoginForm] = useState(true) 
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpenStats, setIsModalOpenStats] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")
    const [statusType, setStatusType] = useState("")
    const { login, register,registerError } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (registerError) {
            setStatusMessage(registerError)
        }
    }, [registerError])


    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            setLoading(true)
            let success = false

            if (isLoginForm) {
                success = await login(credentials)
            } else {
                // Para cadastrar, enviar apenas email e senha
                const userData = { login: credentials.login, userName:credentials.userName, password: credentials.password,role:1}
                success = await register(userData)
                success = await login(credentials)

            }
  
            if (success) {
                navigate("/loading")
            } else {
                setStatusType("error");
                setIsModalOpenStats(true);
                setTimeout(() => {
                    setIsModalOpenStats(false);
                }, 2000);
            }
        } catch (err) {
            console.error("Algo deu errado:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        })
    }

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm) // Alternar entre os formulários de login e cadastro
    }

    return (
        <div className="container-login"> 
        <div className="login-part">
            <form className="form" onSubmit={handleSubmit}>
                <div className="logo-title">
                <img className=" margin-0 logo-salao" src={logoSalao} alt="" />
                <h1 className="title-salao">Cabelo <br/>& Art</h1>
                </div>
                {isLoginForm ?
                <div className="container-title" >
                <p className="title-login">Bem-vindo!</p>
                <p className="subtitle-login">Faça seu login para continuar conectado.</p>
                </div>
             : 
             <div className="container-title">
             <p className="title-login">Crie uma conta</p>
             <p className="subtitle-login">Cadastra-se para agendar seus horários em nosso salão.</p>

             </div>
}
                <div className="container-inpbtn">

                {isLoginForm ? (
                    <>
                    
                    <div className="container-input">

                    <div className="input-div">
                        <p className="subtitle-login">E-mail</p>
                        <InputCustomizado
                            name="login"
                            placeholder="Digite o seu email"
                            onChange={handleChange}
                            type="email"
                            required
                        />
                    </div>

                        <div className="input-div">
                        <p className="subtitle-login">Senha</p>
                            <InputCustomizado
                                name="password"
                                placeholder="Digite a sua senha"
                                onChange={handleChange}
                                type="password"
                                required
                            />
                        </div>      
                        </div>

                    </>
                ) : (
                    <>
                    <div className="container-input">

                        <div className="input-div">
                        <p className="subtitle-login">Nome</p>

                        <InputCustomizado
                            name="userName"
                            placeholder="Digite o seu nome de usuario"
                            onChange={handleChange}
                            type="emai"
                            required
                        />
                        </div>
                        <div className="input-div">
                        <p className="subtitle-login">Email</p>

                        <InputCustomizado
                            name="login"
                            placeholder="Digite o seu email"
                            onChange={handleChange}
                            type="emai"
                            required
                        />
                        </div>
                        <div className="input-div">
                        <p className="subtitle-login">Senha</p>

                        <InputCustomizado
                            name="password"
                            placeholder="Digite a sua senha"
                            onChange={handleChange}
                            type="password"
                            required
                        />
                        </div>
                        </div>
                    </>
                )}
                {/* Condicionalmente renderizar o botão com base no estado */}
                <ButtonCustomizado
                    type='submit'
                    text={isLoginForm ? 'Entrar' : 'Cadastrar'}
                    disabled={loading} // Desabilitar o botão enquanto estiver carregando
                />

                <div>
                {isLoginForm ?
                <div className="container-troca">
                    <p className="subtitle-login">Não possui uma conta?</p>
                    <p className="subtitle-login color-red" onClick={toggleForm}>Cadastre-se</p>
                </div>
                    :
                    <div className="container-troca">

                    <p className="subtitle-login" >Já possui uma conta?</p>
                    <p className="subtitle-login color-red" onClick={toggleForm}>Entrar</p>
                </div>
                }
                </div>
                </div>

            </form>
        </div>

        <div className="picture-part">
            <div className="container-color">
                <img className="img-login" src={imgLogin} alt="" />
            </div>
        </div>
        <Modal isOpen={isModalOpenStats} onClose={() => setIsModalOpenStats(false)} showCloseButton={false}>
                <div className={`container-stats title-modal-stats ${statusType === "success" ? "color-sucesso" : "color-erro"}`}>
                    <p>{statusMessage}</p>
                    {statusType === "success" ? <FaCheck size={20} /> : <FaTimes size={20} />}
                </div>
            </Modal>
        </div>
    )
}

export default Login
