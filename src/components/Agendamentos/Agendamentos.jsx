import "./Style.css";
import { UserContext } from "../../Context/Provider";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Calendario from "../../images/calenderBlack.svg";
import Relogio from "../../images/Clock.svg";
import Lixeira from "../../images/Trash.svg";


const Agendamentos = ({ onAgendamentoExcluido }) => {
    const [agendamentos, setAgendamentos] = useState([]);
    const { userId } = useContext(UserContext);
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };


    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                if (userId) { // Verifica se userId está definido
                    const response = await axios.get(`http://localhost:8080/agendamentos/listarPorUsuario/${userId}`, config);
                    // Formata a data e a hora antes de definir o estado
                    const agendamentosFormatados = response.data.map(agendamento => ({
                        ...agendamento,
                        dataAgendamento: formatarData(agendamento.dataAgendamento),
                        horario: formatarHora(agendamento.horario.dataHora)
                    }));

                    agendamentosFormatados.sort((a, b) => {
                        if (a.dataAgendamento !== b.dataAgendamento) {
                            return a.dataAgendamento.localeCompare(b.dataAgendamento);
                        } else {
                            return a.horario.localeCompare(b.horario.dataHora);
                        }
                    });
                    setAgendamentos(agendamentosFormatados);
                }
            } catch (error) {
                console.error("Erro ao buscar agendamentos:", error);
            }
        };

        fetchAgendamentos(); // Chame a função dentro de useEffect para executá-la após a montagem do componente
    }, [userId, config]); // Certifique-se de incluir userId e config como dependências do useEffect

    // Função para formatar a data
    const formatarData = (data) => {
        // Adiciona a barra entre o terceiro e o quinto caractere
        return data.substring(0, 2) + "/" + data.substring(2, 4) + "/" + data.substring(4);
    };

    // Função para formatar a hora
    const formatarHora = (hora) => {
        // Retorna apenas a hora sem os minutos e segundos
        return hora.substring(0, 5);
    };

    const handleExcluirAgendamento = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/agendamentos/remover/${id}`, config);
            // Remove o agendamento excluído da lista
            setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== id));
            onAgendamentoExcluido(true);
        } catch (error) {
            console.error("Erro ao excluir agendamento:", error);
        }
    };

    return ( 
        <div>
            <div className="container-agendamento">
                {agendamentos.map(agendamento => (
                    <div className="agenda-container" key={agendamento.id}>

                        <div className="agendamento-card">
                        <div>
                        <p className="tipografia font18">{agendamento.produto.nome}</p>
                        </div>

                        <div className="agenda-dataTime">
                            <div className="display-agenda">
                            <img src={Calendario}  style={{ width: '18px', color:'black' }} alt="" />
                            <p className="tipografia font14">{agendamento.dataAgendamento}</p>
                            </div>
                            <div className="display-agenda">
                            <img src={Relogio}  style={{ width: '18px' }} alt="" />
                            <p className="tipografia font14">{agendamento.horario}</p>
                            </div>
                        </div>
                        </div>

                        <div className="excluir-agendamento"  onClick={() => handleExcluirAgendamento(agendamento.id)}>
                            <img src={Lixeira} style={{ width: '22px',cursor:'pointer' }} alt="" />
                        </div>
                        
                    </div>
                ))}
            </div> 
        </div> 
    );
}
 
export default Agendamentos;
