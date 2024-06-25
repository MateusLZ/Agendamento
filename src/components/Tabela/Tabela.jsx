import "./Style.css"
import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { UserContext } from "../../Context/Provider"
import Modal from "../Modal"
import Calendario from "../../images/calender.svg"

function Tabela({produtoAdicionado, exclusao , onDateSelect}) {
  const [produtos, setProdutos] = useState([])
  const [horarios, setHorarios] = useState([])
  const [horaClick, setHoraClick] = useState([])
  const [servicoClick, setServClick] = useState([])
  const [servicoAgenda, setServAgend] = useState([])
  const [horaAgenda, setHoraAgend] = useState([])
  const [agendamentos, setAgendamento] = useState([])
  const { userEmail,userId } = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [horariosOcupados, setHorariosOcupados] = useState({})
  const [funcionariosServicoSelecionado, setFuncionariosServicoSelecionado] = useState([])
  const [nomeFuncionario, setNomeFuncionario] = useState(null)
  const [funcionarios, setFuncionarios] = useState([])
  const [mostrarFuncionarios, setMostrarFuncionarios] = useState(false)

  const toggleMostrarFuncionarios = () => {
    setMostrarFuncionarios(!mostrarFuncionarios)
  }


  const token = localStorage.getItem("token")
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}



  const fetchProdutos = async () => {
    try {
        const response = await axios.get("https://backendagendamento.onrender.com/listar", config)
        const responseHorario = await axios.get("https://backendagendamento.onrender.com/horarios/ativos", config)
        setProdutos(response.data) 
        setHorarios(responseHorario.data)
    } catch (error) {
        console.error("Erro ao buscar produtos:", error)
    }
}

const fetchAgendamentosPorData = async () => {
  if (!onDateSelect) {
    console.error("Data não selecionada")
    return
  }
  const dataSemBarras = onDateSelect.replace(/\//g, '')
  try {
    const response = await axios.get(`https://backendagendamento.onrender.com/agendamentos/listarPorData/${dataSemBarras}`, config)

    setAgendamento(response.data)
    const produtosCodigos = produtos.map(produto => produto.codigo)

    const horariosOcupadosTemp = {} 

    produtosCodigos.forEach(async (produtoCodigo) => {
      const agendamentosProdutoSelecionado = response.data
        .filter(agendamento => agendamento.produto.codigo === produtoCodigo)

      const produto = produtos.find(produto => produto.codigo === produtoCodigo)

      if (agendamentosProdutoSelecionado.length >= produto.usuarios.length) {
        const horariosOcupados = agendamentosProdutoSelecionado.map(agendamento => agendamento.horario.id)

        const horariosOcupadosFiltrados = horariosOcupados.filter((horarioId) => {
          const numFuncionarios = produto.usuarios.length
          const numOcorrencias = horariosOcupados.filter(id => id === horarioId).length
          return numOcorrencias === numFuncionarios
        })
        horariosOcupadosTemp[produtoCodigo] = horariosOcupadosFiltrados
      } else {
        horariosOcupadosTemp[produtoCodigo] = []
      }
    })

    setHorariosOcupados(horariosOcupadosTemp)
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error)
  }
}


useEffect(() => {
  fetchProdutos()
}, [produtoAdicionado])

useEffect(() => {
  if (onDateSelect) {
    fetchAgendamentosPorData()
  }
}, [onDateSelect, produtos, exclusao])
const formatarHorario = (dataHora) => {
  return dataHora.substring(0, 5)
}

const findProdutoByIndex = (index) => {
  return produtos[index]
}

const findHorarioById = (horarioId) => {
  return horarios.find((horario) => horario.id === horarioId)
}


const handleFuncionarioSelect = (funcionarioId) => {
  const funcionarioSelecionado = funcionariosServicoSelecionado.find((funcionario) => funcionario.id === funcionarioId)
  if (!funcionarioSelecionado) {
    setNomeFuncionario(null) 
    setFuncionarios(null) 
  } else {
    setNomeFuncionario(funcionarioSelecionado.userName) 
    setFuncionarios(funcionarioId) 
  }
}




const agendarHorario = async () => {
  const dataSemBarras = onDateSelect.replace(/\//g, '')
  try {
    const response = await axios.post(
      "https://backendagendamento.onrender.com/agendamentos/cadastrar",
      {
        usuario: {
          id: userId,
        },
        produto:{codigo:servicoAgenda.codigo},
        
        horario:horaAgenda
        ,
        funcionario: {
          id: funcionarios, 
        },
        dataAgendamento: dataSemBarras,
      },
      config
    )
    
    handleCloseModal()
    fetchAgendamentosPorData()
  } catch (error) {
    console.error("Erro ao cadastrar agendamento:", error)
  }
}

const handleClickHorario = async (produtoIndex, horarioId) => {
  const produto = findProdutoByIndex(produtoIndex)
  const horario = findHorarioById(horarioId)
  const horarioObjeto = horarios.find((horario) => horario.id === horarioId)
  const codigoProduto = produto.codigo

const agendamentosFiltrados = agendamentos.filter(agendamento => (
  agendamento.produto.codigo === codigoProduto &&
  agendamento.horario.id === horarioId
))

const idsFuncionarios = agendamentosFiltrados.map(agendamento => agendamento.funcionario.id)
const novoFuncionariosServicoSelecionado = produto.usuarios.filter(funcionario => !idsFuncionarios.includes(funcionario.id))

  setFuncionariosServicoSelecionado(novoFuncionariosServicoSelecionado)
  setServClick(produto.nome)
  setHoraClick(formatarHorario(horario.dataHora))
  setServAgend(produto)
  setHoraAgend(horarioObjeto)
  handleOpenModal()
}

const handleOpenModal = () => {
  setIsModalOpen(true)
}

const handleCloseModal = () => {
  setIsModalOpen(false)
  setNomeFuncionario(null)
}


return (
  <div className="table-container">
  <div className="table-horarios">
    <div className="nome-servicos">
      {produtos.map((produto, index) => (
        <div className="header-cell" key={index}>
          <p>{produto.nome}</p>
        </div>
      ))}
    </div>
    <div className="horarios">
      {produtos.map((produto, index) => (
        <div className="horario-row" key={index}>
          {horarios.map((horario) => (
            <div className="horario-cell" key={horario.id}>
              <p
                onClick={() => handleClickHorario(index, horario.id)}
                className={horariosOcupados[produto.codigo]?.includes(horario.id) ? "horario-cell horario-ocupado" : "horario-cell"}
              >
                {formatarHorario(horario.dataHora)}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
  <div className="modal-table">
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <div className="modal-table-conteudo">
        <div className="title-modal-table">
          <h3>Agendar Horario</h3>
        </div>
        <div className="txt-modal-table">
          <p className="color-preto">Estamos quase lá!</p>
          <p className="color-cinza">Confirme o agendamento para garantir seu horário em nosso salão.</p>
        </div>
        <div className="info-modal-table">
          <p className="color-preto">Você escolheu o seguinte serviço:</p>
          <div className="serv-hora">
            <p className="color-preto buttonPCinza">{servicoClick}</p>
            <p className="color-preto buttonPVerd">{horaClick}</p>
          </div>
          <div className="flex-gap-12">
            <img src={Calendario} style={{ width: '18px' }} alt="Calendário" />
            <p className="color-preto">{onDateSelect}</p>
          </div>
        </div>
        <div>
        <p>Profisional</p>

        <div className="funcionarios-modal-table" onClick={toggleMostrarFuncionarios}>
  <p>{nomeFuncionario ? nomeFuncionario : "Selecionar"}</p>
  {mostrarFuncionarios && (
    <div className="funcionarios-container">
      {funcionariosServicoSelecionado.map((funcionario) => (
        <div className="select-func" key={funcionario.id} onClick={() => handleFuncionarioSelect(funcionario.id)}>
          <p>{funcionario.userName}</p>
        </div>
      ))}
    </div>
  )}
</div>
        </div>
        <div className="button-modal-table">
          <p onClick={handleCloseModal} className="buttonPCancelar color-preto">Cancelar</p>
          <p onClick={agendarHorario} className="buttonPVermelho color-vermelho">Confirmar</p>
        </div>
      </div>
    </Modal>
  </div>
</div>
)
}


export default Tabela
