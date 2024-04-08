import "./Style.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/Provider";
import Modal from "../Modal";
import Calendario from "../../images/calender.svg";

function Tabela({produtoAdicionado, exclusao , onDateSelect}) {
  const [produtos, setProdutos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [horaClick, setHoraClick] = useState([]);
  const [servicoClick, setServClick] = useState([]);
  const [servicoAgenda, setServAgend] = useState([]);
  const [horaAgenda, setHoraAgend] = useState([]);
  const { userEmail,userId } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [horariosOcupados, setHorariosOcupados] = useState({});


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

const agendarHorario = async () => {
  const dataSemBarras = onDateSelect.replace(/\//g, '');
  try {
    const response = await axios.post(
      "http://localhost:8080/agendamentos/cadastrar",
      {
        usuario: {
          id: userId,
        },
        produto: servicoAgenda,
        horario: horaAgenda,
        dataAgendamento: dataSemBarras,
      },
      config
    );
    handleCloseModal();
    fetchAgendamentosPorData();
  } catch (error) {
    console.error("Erro ao cadastrar agendamento:", error);
  }
};

const handleClickHorario = async (produtoIndex, horarioId) => {
  const produto = findProdutoByIndex(produtoIndex);
  const horario = findHorarioById(horarioId);
  const horarioObjeto = horarios.find((horario) => horario.id === horarioId);
  setServClick(produto.nome);
  setHoraClick(formatarHorario(horario.dataHora));
  setServAgend(produto)
  setHoraAgend(horarioObjeto)
  handleOpenModal();
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
              <img  src={Calendario} style={{ width: '18px' }}  />
              <p className="color-preto">{onDateSelect}</p>
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
);
}

export default Tabela;
