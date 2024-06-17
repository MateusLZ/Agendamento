import React, { useState, useEffect,useContext } from "react"
import { UserContext } from "../../Context/Provider"
import InputCustomizado from "../../components/Input"
import check from "../../images/Check.svg"
import Modal from "../Modal"
import axios from "axios";
import "./Style.css"
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";


const MinhaConta = () => {
    const { userName,userEmail,userPhone,setToken } = useContext(UserContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpenStats, setIsModalOpenStats] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")
    const [statusType, setStatusType] = useState("")
    const [credentials, setCredentials] = useState({
        userName: userName,
        login: userEmail,
        phone:userPhone,
    });
    const [senha, setSenha] = useState({
        senhaAtual: "",
        novaSenha: "",
      });

      useEffect(() => {
        setCredentials({
            userName: userName,
            login: userEmail,
            phone: userPhone,
        });
    }, [userName, userEmail, userPhone]);

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }
   
    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSenha({ senhaAtual: "", novaSenha: "" });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };
    const handleSenhaChange = (e) => {
        const { name, value } = e.target;
        setSenha({ ...senha, [name]: value });
      };

    const handleSave = async () => {
        const token = localStorage.getItem("token"); 
        try {
            const response = await axios.put("http://localhost:8080/auth/editar", credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                const novoToken = response.data;
                localStorage.setItem("token", novoToken);
                setToken(novoToken)
                setStatusMessage("Dados atualizados com sucesso");
                setStatusType("success");
                setIsModalOpenStats(true);
                setCredentials({
                    userName: "",
                    login: "",
                    phone: "",
                });
                setTimeout(() => {
                    setIsModalOpenStats(false);
                }, 2000);
            } else {
                setStatusMessage("Erro ao atualizar os dados");
                setStatusType("error");
                setIsModalOpenStats(true);
                setTimeout(() => {
                    setIsModalOpenStats(false);
                }, 2000);
            }
        } catch (error) {
            console.error("Erro ao atualizar os dados:", error);
            setStatusMessage("Erro ao atualizar os dados");
            setStatusType("error");
            setIsModalOpenStats(true);
            setTimeout(() => {
                setIsModalOpenStats(false);
            }, 2000);
        }
    };
    const handleChangePassword = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.put(
            "http://localhost:8080/auth/editar/senha",
            senha,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.status === 200) {
            setStatusMessage("Senha alterada com sucesso")
            setStatusType("success")
            handleCloseModal()
            setIsModalOpenStats(true)
            setTimeout(() => {
                setIsModalOpenStats(false)
            }, 2000)
          }
        } catch (error) {
            console.error("Erro ao atualizar a senha:", error)
            handleCloseModal()
            setStatusMessage(error.response.data || "Erro ao atualizar a senha")
            setStatusType("error")
            setIsModalOpenStats(true)
            setTimeout(() => {
                setIsModalOpenStats(false)
            }, 2000)
        }
      };

      

    return (
       <div className="container-config">
        <div className="Config-minhaConta">
            <p className="tipo-config-title">Minha Conta</p>
            <p className="tipo-subtitle-config">Aqui você pode editar e adicionar suas informações pessoais.</p>
        </div>

        <div className="config-minhaContaInp" >
            <ul>
                <li>
                    <p  className="tipo-subtitle-config">Nome</p>
                    <InputCustomizado
                placeholder={userName}
                name="userName"
                value={credentials.userName}
                onChange={handleInputChange}
                type="text"
                required
            />
                </li>
                <li>
                    <p  className="tipo-subtitle-config">Celular</p>
                    <InputCustomizado
              name="phone"
              placeholder={userPhone}
              value={credentials.userPhone}
              onChange={handleInputChange}
              type="text"
              required
            />
                </li>
                <li>
                    <p  className="tipo-subtitle-config">Email</p>
                    <InputCustomizado
              name="login"
              placeholder={userEmail}
              value={credentials.userEmail}
              onChange={handleInputChange}
              type="email"
              required
            />
                </li>
            </ul>

            
        </div>
        <div className="div-btn-save">
            <div  className="btn-salvar" onClick={handleSave}>
                <img src={check} width={20} alt="" />
                <p>Salvar alterações</p>
            </div>

            <div  className="btn-salvar color-btn-verme" onClick={handleOpenModal}>
                <p>Alterar senha</p>
            </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="container-modal-senha">

                <div className="title-modal-table">
                    <h3>Mudar Senha</h3>
                </div>
                <div className="txt-modal-table">
                    <p className="color-preto">Estamos quase lá!</p>
                    <p className="color-cinza">Para mudar a sua senha, preencha os campos abaixo.</p>
                </div>


                <div>
                <p>Senha atual</p>
                <InputCustomizado
                     name="senhaAtual"
                     placeholder="Digite a senha atual"
                     type="password"
                     value={senha.senhaAtual}
                     onChange={handleSenhaChange}
                     required
                />
                </div>

                <div>
                    <p>Nova senha</p>
                <InputCustomizado
                    name="novaSenha"
                    placeholder="Digite a nova senha"
                    type="password"
                    value={senha.novaSenha}
                    onChange={handleSenhaChange}
                    required
                />
                </div>
                
                <div className="button-modal-table">
            <p onClick={handleCloseModal} className="buttonPCancelar color-preto">Cancelar</p>
            <p onClick={handleChangePassword} className="buttonPVermelho color-vermelho">Alterar</p>
          </div>
          </div>

            </Modal>

            <Modal isOpen={isModalOpenStats} onClose={() => setIsModalOpenStats(false)} showCloseButton={false}>
                <div className={`container-stats title-modal-stats ${statusType === "success" ? "color-sucesso" : "color-erro"}`}>
                    <p>{statusMessage}</p>
                    {statusType === "success" ? <FaCheck size={20} /> : <FaTimes size={20} />}
                </div>
            </Modal>
       </div>
    )
}

export default MinhaConta
