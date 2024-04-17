import "./Style.css";
import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/Provider";
import InputCustomizado from "../../components/Input";
import ButtonCustomizado from "../../components/Button";
import Modal from "../Modal";
import Button from "../Botao/Botao"



function CadastrarFuncionario({atualizarListaFuncionarios}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [credentials, setCredentials] = useState({ email: "", password: "", userName: "" });
    const [mensagem, setMensagem] = useState("");
    const { register } = useContext(UserContext);

    


  const handleCadastroFuncionario = async (e) => {
    e.preventDefault();
    try {
      let success = false;

      const userData = { login: credentials.login, userName:credentials.userName, password: credentials.password, role:2};
      success = await register(userData);

      if (success) {
        setMensagem("Funcionário cadastrado com sucesso!");
        handleCloseModal()
        atualizarListaFuncionarios();
      } else {
        setMensagem("Erro ao cadastrar funcionário");
      }
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
      setMensagem("Erro ao cadastrar funcionário");
    }
  };

  const handleChange = (event) => {
    setCredentials({
        ...credentials,
        [event.target.name]: event.target.value,
    });
}

const handleOpenModal = () => {
    setIsModalOpen(true);
};

const handleCloseModal = () => {
    setIsModalOpen(false);
   
};


 
  return (
        
    <div>


    <Button text='Cadastrar Serviços' onClick={handleOpenModal} />
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form className="form-newFunc" onSubmit={handleCadastroFuncionario}>
               
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
                {/* Condicionalmente renderizar o botão com base no estado */}
                <ButtonCustomizado
                    type='submit'
                    text={'Cadastrar'}
                     // Desabilitar o botão enquanto estiver carregando
                />
                <div>
                   
                </div>
            </form>

            </Modal>
    </div>
       
  );
}

export default CadastrarFuncionario;
