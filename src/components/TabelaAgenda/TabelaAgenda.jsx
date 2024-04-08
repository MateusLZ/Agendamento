import "./Style.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/Provider";
import Modal from "../Modal";
import Calendario from "../../images/calender.svg";



function TabelaAgenda({produtoAdicionado, exclusao , onDateSelect}) {
  const [produtos, setProdutos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [horaClick, setHoraClick] = useState([]);
  const [servicoClick, setServClick] = useState([]);
  const [servicoAgenda, setServAgend] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [phoneCliente, setPhone] = useState([]);
  const [horaAgenda, setHoraAgend] = useState([]);
  const { userEmail,userId,userIsAdmin } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [horariosOcupados, setHorariosOcupados] = useState({});
  const [agendamentosPorData, setAgendamentosPorData] = useState([]);



  const token = localStorage.getItem("token");
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};



  const fetchProdutos = async () => {
    try {
        const response = await axios.get("http://localhost:8080/listar", config);
        const responseHorario = await axios.get("http://localhost:8080/horarios/listar", config);
        setProdutos(response.data); // Define os produtos retornados pela API no estado
        setHorarios(responseHorario.data)
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
};

const fetchAgendamentosPorData = async () => {
  const dataSemBarras = onDateSelect.replace(/\//g, '');
  try {
    const response = await axios.get(`http://localhost:8080/agendamentos/listarPorData/${dataSemBarras}`, config);

    setAgendamentosPorData(response.data);
    const produtosCodigos = produtos.map(produto => produto.codigo);

    produtosCodigos.forEach(async (produtoCodigo) => {
      const agendamentosProdutoSelecionado = response.data
        .filter(agendamento => agendamento.produto.codigo === produtoCodigo);

      // Filtrar apenas os horários ocupados para o produto específico
      const horariosOcupadosProduto = agendamentosProdutoSelecionado
        .map(agendamento => agendamento.horario.id);

      // Atualizar os horários ocupados apenas para o produto específico
      setHorariosOcupados(prevState => ({
        ...prevState,
        [produtoCodigo]: horariosOcupadosProduto,
      }));
    });
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
  }
};

useEffect(() => {
  fetchProdutos();
}, [produtoAdicionado]);

useEffect(() => {
  fetchAgendamentosPorData();
}, [onDateSelect, produtos,exclusao]);

const formatarHorario = (dataHora) => {
  return dataHora.substring(0, 5); // Extrai os primeiros 5 caracteres (HH:mm)
};

const findProdutoByIndex = (index) => {
  return produtos[index];
};

const findHorarioById = (horarioId) => {
  return horarios.find((horario) => horario.id === horarioId);
};



const handleClickHorario = async (produtoIndex, horarioId) => {
    const produto = findProdutoByIndex(produtoIndex);
    const horario = findHorarioById(horarioId);
    const horarioObjeto = horarios.find((horario) => horario.id === horarioId);
    setServClick(produto.nome);
    setHoraClick(formatarHorario(horario.dataHora));
    setServAgend(produto);
    setHoraAgend(horarioObjeto);
    
  
    // Busca pelo agendamento correspondente dentro do estado agendamentosPorData
    const agendamento = agendamentosPorData.find(
      (agendamento) =>
        agendamento.produto.codigo === produto.codigo &&
        agendamento.horario.id === horarioId
    );
  
    // Verificar se existe um agendamento para exibir
    if (agendamento) {
        handleOpenModal()
        setCliente(agendamento.usuario.userName)
        setPhone(agendamento.usuario.userName)
      console.log("Nome do Usuário:", agendamento.usuario.userName);
      console.log("ID do Usuário:", agendamento.usuario.id);
    } else {
      console.log("Nenhum agendamento encontrado para este horário.");
    }
  };
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  


return (
    <div className="table-container">
      <div className="table-horarios">
        <div className="nome-servicos">
          <div className="celulas-add">
            <p>Horário</p>
          </div>
          {produtos.map((produto, index) => (
            <div className="header-cell" key={index}>
              <p>{produto.nome}</p>
            </div>
          ))}
        </div>
        <div className="clientes-horarios">
          <div className="horariosAgenda">
            
            {horarios.map((horario) => (
                
              <div className="horario-celula" key={horario.id}>
                <div className="horas celula-livre">
                <p>{formatarHorario(horario.dataHora)}</p>
                </div>
                <ul className="agendamento-celula">
                {produtos.map((produto, index) => (
                <li
                    key={produto.codigo}
                    className={`${horariosOcupados[produto.codigo]?.includes(horario.id) ? 'celula-agendada' : 'celula-livre'}`}
                    onClick={() => handleClickHorario(index, horario.id)}
                >
                    {horariosOcupados[produto.codigo]?.includes(horario.id) ? (
                    <p>Agendado</p>
                    ) : (
                    <p>Livre</p>
                    )}
                </li>
                ))}
                </ul>
              </div>
              
            ))}
             <div className="modal-table">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="modal-table-conteudo">
          <div className="title-modal-table">
            <h3>Horario Agendado</h3>
          </div>
          
          <div className="info-modal-table">
            <p className="color-preto">Serviço:</p>
            <div className="serv-hora">
              <p className="color-preto buttonPCinza">{servicoClick}</p>
              <p className="color-preto buttonPVerd">{horaClick}</p>
            </div>
            <p className="color-preto">Cliente:</p>
            <div className="serv-hora">
              <p className="color-preto buttonPCinza">{cliente}</p>
              <p className="color-preto buttonPVerd">{phoneCliente}</p>
            </div>
            <p className="color-preto">Profissional:</p>
            <div className="serv-hora">
              <p className="color-preto buttonPCinza">Claudia</p>
            </div>
            <div className="flex-gap-12">
              <img  src={Calendario} style={{ width: '18px' }}  />
              <p className="color-preto">{onDateSelect}</p>
            </div>
          </div>
          <div className="button-modal-table">
          </div>
        </div>
      </Modal>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabelaAgenda;