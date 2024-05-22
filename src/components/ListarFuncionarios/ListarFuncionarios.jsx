import "./Style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Editar from "../../images/Edit.svg";
import BallVerd from "../../images/BolinhaVerde.svg";
import BallCinza from "../../images/BolinhaCinza.svg";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";


function ListarFuncionarios({ atualizarLista, setAtualizarLista }) {
    const [funcionarios, setFuncionarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(8);
    console.log(currentPage)

    // Função para buscar os funcionários
    const buscarFuncionarios = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(`http://localhost:8080/admin/listarPorRole/funcionario?page=${currentPage}&size=${itemsPerPage}`, config);
            // Dados dos funcionários recuperados com sucesso
            console.log(response)
            setFuncionarios(response.data.content);
        } catch (error) {
            // Ocorreu um erro ao recuperar os dados dos funcionários
            console.error("Erro ao recuperar os dados dos funcionários:", error);
        } finally {
            // Resetar a flag após a atualização da lista
            setAtualizarLista(false);
        }
    };

    useEffect(() => {
        // Verificar se a lista precisa ser atualizada
        if (atualizarLista) {
            buscarFuncionarios();
        }
    }, [atualizarLista, setAtualizarLista, currentPage]); // Adicione currentPage como dependência para buscar dados quando a página mudar

    // Executar a busca dos funcionários quando o componente for montado
    useEffect(() => {
        buscarFuncionarios();
    }, [currentPage]); // Atualize a lista quando a página mudar

    // Função para lidar com a mudança de página
const totalPages = Math.ceil(funcionarios.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
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
                        <p>Ações</p>
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
                            <div>
                                <img src={Editar} alt="" />
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
        </div>
    );
}

export default ListarFuncionarios;
