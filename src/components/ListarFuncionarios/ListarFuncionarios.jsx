import "./Style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function ListarFuncionarios({ atualizarLista, setAtualizarLista }) {
    const [funcionarios, setFuncionarios] = useState([]);

    // Função para buscar os funcionários
    const buscarFuncionarios = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get("http://localhost:8080/admin/listarPorRole/funcionario", config);
            // Dados dos funcionários recuperados com sucesso
            setFuncionarios(response.data);
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
    }, [atualizarLista, setAtualizarLista]); 

    // Executar a busca dos funcionários quando o componente for montado
    useEffect(() => {
        buscarFuncionarios();
    }, []);

    return (
        <div>
            <h2>Lista de Funcionários</h2>
            <ul>
                {funcionarios.map(funcionario => (
                    <li key={funcionario.id}>
                        <strong> Nome:</strong> {funcionario.userName}, 
                        <strong> Email:</strong> {funcionario.login}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListarFuncionarios;
