import "./Style.css"
import React, { useContext, useState } from "react"
import { UserContext } from "../../Context/Provider"
import InputCustomizado from "../../components/Input"
import ButtonCustomizado from "../../components/Button"
import Modal from "../Modal"
import { FaPlus } from "react-icons/fa6"




function CadastrarFuncionario({ atualizarListaFuncionarios }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [credentials, setCredentials] = useState({ email: "", password: "", userName: "" })
  const [mensagem, setMensagem] = useState("")
  const { register } = useContext(UserContext)

  const handleCadastroFuncionario = async (e) => {
    e.preventDefault()
    try {
      let success = false

      const userData = { login: credentials.email, userName: credentials.userName, password: credentials.password, role: 2 }
      success = await register(userData)

      if (success) {
        setMensagem("Funcionário cadastrado com sucesso!")
        handleCloseModal()
        atualizarListaFuncionarios()
      } else {
        setMensagem("Erro ao cadastrar funcionário")
      }
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error)
      setMensagem("Erro ao cadastrar funcionário")
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <div className=" btn-cadastrar">
        <FaPlus />
        <p onClick={handleOpenModal}>Novo funcionário</p>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="form-newFunc">
          <div className="title-modal-table display-flex-func">
            <h3>Novo funcionário</h3>
          </div>
          <div className="txt-modal-table">
            <p className="color-preto">Estamos quase lá!</p>
            <p className="color-cinza">Para cadastrar um novo funcionário, forneça os dados necessários de acordo com os dados abaixo.</p>
          </div>

          <div className="input-cadastro">
            <p className="texto-input">Nome</p>
            <InputCustomizado
              name="userName"
              placeholder="Nome funcionário"
              onChange={(e) => setCredentials({ ...credentials, userName: e.target.value })}
              type="email"
              required
            />
          </div>

          <div className="input-cadastro">
            <p className="texto-input">E-mail</p>
            <InputCustomizado
              name="login"
              placeholder="Email funcionário"
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              type="email"
              required
            />
          </div>

          <div className="input-cadastro">
            <p className="texto-input">Senha</p>
            <InputCustomizado
              name="password"
              placeholder="Senha funcionário"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              type="password"
              required
            />
          </div>

          <div className="btn-func">
          <p onClick={handleCloseModal} className="buttonPCancelar color-preto">Cancelar</p>
          <p onClick={handleCadastroFuncionario} className="buttonPVermelho color-vermelho">Cadastrar</p>
          </div>
         
        </div>
      </Modal>
    </div>
  )
}

export default CadastrarFuncionario
