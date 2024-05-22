import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import Modal from "../Modal";
import MultipleOptionsSelectMenu from "../MultipleOptionsSelectMenu/MultipleOptionsSelectMenu";
import "./Style.css"
import { FaTrashAlt } from "react-icons/fa";


const ConfigHorario = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [horarios, setHorarios] = useState([]);
    const [horariosAtivos, setHorariosAtivos] = useState([]);
    const [idsSelecionados, setIdsSelecionados] = useState([]);


    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get("http://localhost:8080/horarios/listar", config);
                const responseTwo = await axios.get("http://localhost:8080/horarios/ativos", config);

                const horariosAtivos = responseTwo.data
                const horariosInativos = response.data.filter(horario => !horario.ativo);
                setHorarios(horariosInativos);
                setHorariosAtivos(horariosAtivos)
            } catch (error) {
                console.error("Erro ao buscar horários:", error);
            }
        };
        fetchHorarios();
    }, []);
      
    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

    const handleHorariosSelecionadosChange = (values) => {
        const selectedIds = values.map(value => value.split(':')[3]);
        setIdsSelecionados(selectedIds);
    };

    const cadastrarHorarios = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {    
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await Promise.all(idsSelecionados.map(async (id) => {
                await axios.put(`http://localhost:8080/horarios/ativar/${id}`, { ativo: true }, config);
            }));
            // Atualiza a lista de horários ativos após a edição
            const response = await axios.get("http://localhost:8080/horarios/ativos", config);
            setHorariosAtivos(response.data);
            handleCloseModal()
        } catch (error) {
            console.error("Erro ao enviar horários para o backend:", error);
        }
    };
      
    const excluirHorarios = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const config = {    
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
                await axios.put(`http://localhost:8080/horarios/desativar/${id}`, { ativo: false }, config);
            // Atualiza a lista de horários ativos após a edição
            const response = await axios.get("http://localhost:8080/horarios/ativos", config);
            setHorariosAtivos(response.data);
        } catch (error) {
            console.error("Erro ao enviar horários para o backend:", error);
        }
    };
      
    const formatarHorario = (dataHora) => {
        return dataHora.substring(0, 5); // Extrai os primeiros 5 caracteres (HH:mm)
      };
      
    return (
       <div>
         <div className="Config-minhaConta-horarios">
            <div>
            <p className="tipo-config-title">Horários cadastrados</p>
            <p className="tipo-subtitle-config">Aqui você pode editar e adicionar seus horarios.</p>
            </div>

            <div className=" btn-cadastrar">
            <FaPlus />
            <p onClick={handleOpenModal}>Cadastrar horário</p>
        </div>
        </div>

        <div className="config-minhaContaHorario" >
           
        <div className="tabela-horarios">
   
        <div className="header-func-tabela-horarios">
                <ul>
                    <li>
                        <p>Horário</p>
                    </li>
                    <li>
                        <p>Ações</p>
                    </li>
                </ul>
            </div>
    <ul className="lista-funcionarios">
        {horariosAtivos.map((horario) => (
            <li key={horario.id}>
                <div>
                <p>{formatarHorario(horario.dataHora)}</p>
                </div>
                <div>
                <FaTrashAlt onClick={() => excluirHorarios(horario.id)} style={{ cursor: "pointer" }} />
                </div>
            </li>


        ))}
    </ul>
</div>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="title-modal-table">
                    <h3>Selecionar horários</h3>
                </div>
                <div className="txt-modal-table">
                    <p className="color-cinza">Para cadastrar um novo horário, selecione os horarios de funcionamento do estabelecimento.</p>
                </div>

                <div>
                        <p>Horários</p>
                        <MultipleOptionsSelectMenu
                            items={horarios}
                            labelKey="dataHora"
                            onItemsSelecionadosChange={handleHorariosSelecionadosChange}
                        />
                    </div>
                
                <div className="button-modal-table">
            <p onClick={handleCloseModal} className="buttonPCancelar color-preto">Cancelar</p>
            <p onClick={cadastrarHorarios}  className="buttonPVermelho color-vermelho">Cadastrar</p>
          </div>
            </Modal>
           </div>
            
        </div>
    );
};

export default ConfigHorario;
