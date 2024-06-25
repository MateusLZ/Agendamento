import "./Style.css"
import React, { useEffect, useState } from "react"
import axios from "axios"
import BallVerd from "../../images/BolinhaVerde.svg"
import BallCinza from "../../images/BolinhaCinza.svg"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6"
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../Modal"
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";


function ListarFuncionarios({ atualizarLista, setAtualizarLista }) {
    const [funcionarios, setFuncionarios] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [isModalOpenStats, setIsModalOpenStats] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")
    const [statusType, setStatusType] = useState("")
    const [itemsPerPage] = useState(8)

    const buscarFuncionarios = async () => {
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const response = await axios.get(`https://backendagendamento.onrender.com/admin/listarPorRole/funcionario?page=${currentPage}&size=${itemsPerPage}`, config)
            setFuncionarios(response.data.content)
        } catch (error) {
            console.error("Erro ao recuperar os dados dos funcionários:", error)
        } finally {
            setAtualizarLista(false)
        }
    }

    useEffect(() => {
        if (atualizarLista) {
            buscarFuncionarios()
        }
    }, [atualizarLista, setAtualizarLista, currentPage]) 
    useEffect(() => {
        buscarFuncionarios()
    }, [currentPage]) 

const totalPages = Math.ceil(funcionarios.length / itemsPerPage)

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    const excluirFuncionario = async (funcionarioId) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            console.log(funcionarioId)
    
            await axios.delete(`https://backendagendamento.onrender.com/auth/excluir/${funcionarioId}`, config);
            setAtualizarLista(true)
            setStatusMessage("Funcionario excluido com sucesso");
            setStatusType("success");
            setIsModalOpenStats(true);
            setTimeout(() => {
                setIsModalOpenStats(false);
            }, 2000);
        } catch (error) {
            console.error("Erro ao excluir funcionário:", error);
            setStatusMessage("Erro ao excluir funcionário");
            setStatusType("error");
            setIsModalOpenStats(true);
            setTimeout(() => {
                setIsModalOpenStats(false);
            }, 2000);
        }
    };
    

    return (
        <div className="tabela-funcionarios">
            <div className="header-func-tabela">
                <ul>
                    <li>
                        <p>Nome</p>
                    </li>
                    <li>
                        <p>Especialidade</p>
                    </li>
                    <li>
                        <p>Status</p>
                    </li>
                    <li>
                        <p>Excluir</p>
                    </li>
                </ul>
            </div>
            <ul className="lista-funcionarios">
                {funcionarios.map(funcionario => (
                    <li key={funcionario.id}>
                        <div>
                            <div>
                                <p>{funcionario.login}</p>
                            </div>
                            <div className="especialidade">
                                <p>{funcionario.produtos.length}</p>
                            </div>
                            <div>
                                {funcionario.active ?
                                    <div className="stats-func">
                                        <img src={BallVerd} alt="" width={17} /> 
                                        <p>Ativo</p>
                                    </div>
                                    :
                                    <div className="">
                                        <img src={BallCinza} alt="" width={17} /> 
                                        <p className="inative">Inativo</p>
                                    </div>
                                }
                            </div>
                            <div onClick={() => excluirFuncionario(funcionario.id)}>
                                <FaRegTrashAlt className="clickable-icon" size={18} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {
                    currentPage !== 0 ? (
                        <FaChevronLeft className="cursor-pointer" size={14} onClick={() => handlePageChange(currentPage - 1)} />

                    )
                : null}
                <p className="tipo-paginacao">{currentPage + 1}</p>
                {
                    currentPage === totalPages - 1 ? (
                        <FaChevronRight className="cursor-pointer" size={14}  onClick={() => handlePageChange(currentPage + 1)} disabled={funcionarios.length < itemsPerPage}/>
                    )
                :null}
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

export default ListarFuncionarios
