import "./Style.css"
import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import Filtro from "../../images/Filter.svg"
import ChevronDown from "../../images/Caretdown.svg"
import Calendario from "../../images/calenderBlack.svg"
import Relogio from "../../images/Clock.svg"
import { ImSad } from "react-icons/im"
import { UserContext } from "../../Context/Provider"




function AgendamentosMarcados({  onDateSelect}) {
  const [agendamentosPorData, setAgendamentosPorData] = useState([])
  const [produtos, setProdutos] = useState([])
  const [mostrarProdutos, setMostrarProdutos] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const { userEmail,userId,userIsAdmin } = useContext(UserContext)


  const toggleMostrarProdutos = () => {
    setMostrarProdutos(!mostrarProdutos)
  }

  const token = localStorage.getItem("token") 
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}

const fetchProdutos = async () => {
    try {
        const response = await axios.get("http://localhost:8080/listar", config)
        if (userIsAdmin) {
          setProdutos(response.data) 
      } else {
        const produtosFiltrados = response.data.filter(produto => produto.usuarios.some(user => user.id === userId))
        setProdutos(produtosFiltrados)
      }
    } catch (error) {
        console.error("Erro ao buscar produtos:", error)
    }
}


const fetchAgendamentosPorData = async () => {
  const dataSemBarras = onDateSelect.replace(/\//g, '')
  try {
    const response = await axios.get(`http://localhost:8080/agendamentos/listarPorData/${dataSemBarras}`, config)
    let agendamentosFiltrados = []
    if (userIsAdmin) {
      agendamentosFiltrados = response.data
    } else {
      agendamentosFiltrados = response.data.filter(agendamento => agendamento.funcionario.id === userId)
    }
    setAgendamentosPorData(agendamentosFiltrados)
   
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error)
  }
}


useEffect(() => {
  fetchAgendamentosPorData()
  fetchProdutos()
}, [onDateSelect, ])

  
const handleProdutoSelecionado = (codigoProduto) => {
    setProdutoSelecionado(codigoProduto)
    setMostrarProdutos(false) 
  }

  const formatarData = (data) => {
    const dia = data.substring(0, 2)
    const mes = data.substring(2, 4)
    const ano = `20${data.substring(4)}`
    
    const dataObj = new Date(`${ano}-${mes }-${dia}`)

    dataObj.setUTCDate(dataObj.getUTCDate() + 1)
  
    const diasSemana = [
      "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", 
      "Quinta-feira", "Sexta-feira", "Sábado"
    ]
    
    const meses = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ]
  
    const diaSemana = diasSemana[dataObj.getDay()]
    const diaNumero = dataObj.getDate()
    const nomeMes = meses[dataObj.getMonth()]
  
    return `${diaSemana}, ${diaNumero} de ${nomeMes}`
  }
  
  const formatarHorario = (hora) => {
    const horaAtual = hora.substring(0, 5)
  
    const horaInicio = new Date(`1970-01-01T${horaAtual}:00`)
    
    const horaFim = new Date(horaInicio.getTime() + 60 * 60 * 1000)
  
    const horaInicioFormatada = horaInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const horaFimFormatada = horaFim.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  
    return `${horaInicioFormatada} - ${horaFimFormatada}`
  }
  
  


return (
    <div className="container-filtre">
        <div className="filtro-div" onClick={toggleMostrarProdutos}>
            <div className="filtro-flex">
                <img src={Filtro} alt="" /> 
                <p>{produtoSelecionado ? produtos.find(produto => produto.codigo === produtoSelecionado).nome : "Todos"}</p>
            </div>
            <img src={ChevronDown} alt="" />
        </div>
        {mostrarProdutos && (
        <div className="produtos-container">
            <div onClick={() => handleProdutoSelecionado(null)}>
            <p className="tipografia-title size-14">Todos</p>
          </div>
          {produtos.map((produto) => (
            <div key={produto.id}
            onClick={() => handleProdutoSelecionado(produto.codigo)}>
              <p className="tipografia-title size-14">{produto.nome}</p>
            </div>
          ))}
        </div>
      )}


        <div className="lista-agendamentos">
        {(produtoSelecionado !== null
          ? agendamentosPorData.filter(
              (agendamento) => agendamento.produto.codigo === produtoSelecionado
            )
          : agendamentosPorData
        ).length === 0 &&<div className="mensagem-agenda">
        <p className=" tipografia-leve oi" >Nenhum agendamento marcado no momento</p>
        <ImSad size={40} />
      </div>}
        {(produtoSelecionado !== null
          ? agendamentosPorData.filter(
              (agendamento) => agendamento.produto.codigo === produtoSelecionado
            )
          : agendamentosPorData
        ).map((agendamento, index) => (
      <div key={index} className="agendamento-item">
        <ul>
            <li>
        <p className="tipografia-title">{agendamento.produto.nome}</p>
            </li>
            <div className="gap-7">

            <li className="display-flex">
                <img width={18} src={Calendario} alt="" />
            <p className="tipografia-leve">{formatarData(agendamento.dataAgendamento)}</p>
            </li>
            <li className="display-flex">
                <img width={20} src={Relogio} alt="" />
            <p className="tipografia-leve"> {formatarHorario(agendamento.horario.dataHora)}</p>
            </li>
            </div>

            <div className="gap-7">
            <li>
                <div className="padding-cliente-profi">
                    <p className="tipografia-leve cor-leve">Cliente</p>
                    <p className="tipografia-title size-14">{agendamento.usuario.userName}</p>
                </div>
            </li>
            <li>
                <div className="padding-cliente-profi">
                    <p className="tipografia-leve cor-leve">Profissional</p>
                    <p className="tipografia-title size-14">{agendamento.funcionario.userName}</p>
                </div>
            </li>
</div>
        </ul>
      </div>
       ))}
</div>

    </div>
  )
}

export default AgendamentosMarcados