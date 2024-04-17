import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { getDownloadURL, ref } from "firebase/storage";
import { UserContext } from "../../Context/Provider";
import Modal from "../Modal";
import InputCustomizado from "../Input";
import Button from "../Botao/Botao"

import { storage } from "../../firebase";
import "./Style.css"


const ListaServico = ({ produtoAdicionado }) => {
    const [produtos, setProdutos] = useState([]);
    const [imgURLs, setImgURLs] = useState({}); 
    const { userIsAdmin } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nomeProduto, setNomeProduto] = useState("");
    const [descricaoProduto, setDescricaoProduto] = useState("");
    const [idProduto, setIdProduto] = useState("");
    const [imgURL, setImgURL] = useState('');
    const token = localStorage.getItem("token");


    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const handleOpenEditModal = (produto) => {
        setNomeProduto(produto.nome)
        setDescricaoProduto(produto.descricao)
        setIdProduto(produto.codigo);
        setIsModalOpen(true);

    };
    
    const handleCloseEditModal = () => {
        setNomeProduto("")
        setDescricaoProduto("")
        setIdProduto("");
        setIsModalOpen(false);
    };

    const getImgURL = async (nomeImagem) => {
        const storageRef = ref(storage, nomeImagem);
        const url = await getDownloadURL(storageRef);
        return url;
    };

    const fetchProdutos = async () => {
        try {
            const response = await axios.get("http://localhost:8080/listar", config);
            setProdutos(response.data); // Define os produtos retornados pela API no estado
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    useEffect(() => {
        // Chama a função de busca de produtos ao montar o componente
        fetchProdutos();
    },  [produtoAdicionado]);
    
    useEffect(() => {
        // Para cada produto, obtenha a URL de download da imagem
        const fetchImgURLs = async () => {
            const urls = {};
            await Promise.all(produtos.map(async (produto) => {
                const imgURL = await getImgURL(produto.nomeImagem);
                urls[produto.codigo] = imgURL;
            }));
            setImgURLs(urls);
        };

        fetchImgURLs();

    }, [produtos]);

    const handleEditProduto = () => {

        const produtoAtualizado = {
            nome: nomeProduto,
            descricao: descricaoProduto,
        };
    
        axios.put(`http://localhost:8080/editar/${idProduto}`, produtoAtualizado, config)
            .then(response => {
                console.log("Produto editado com sucesso:", response.data);
                handleCloseEditModal(); // Fecha o modal após a edição
                fetchProdutos();
            })
            .catch(error => {
                console.error("Erro ao editar produto:", error);
            });
    };

        const handleExcluirProduto = () => {
            axios.delete(`http://localhost:8080/remover/${idProduto}`, config)
            .then(response => {
                console.log("Produto removido com sucesso:", response.data);
                // Atualize a lista de produtos após a exclusão
                handleCloseEditModal(); // Fecha o modal após a edição
                fetchProdutos();
            })
            .catch(error => {
                console.error("Erro ao remover produto:", error);
            });
        }
   

        

    return (  
        <div className="lista-produtos">
           <div className="container-service">
            <ul className="produtosUL">
                {produtos.map(produto => (
                    <li className="produtos" key={produto.codigo}>

                        <div className="service-img">
                         <img className="img-produtos" src={imgURLs[produto.codigo]} alt="Imagem do Produto" />
                        </div>

                        <div className="service-nomeDescr">
                            <div>
                                <p className="title-service">{produto.nome}</p>
                            </div>

                            <div className="gap-5service">
                                <p className="title-descricao">Descrição</p>
                                <p className="descricao-service">{produto.descricao}</p>
                            </div>
                        </div>

                        <div className="service-func">
                            <p className="title-descricao">Profissionais desse serviço</p>
                            <ul className="funcionarios-service">
                            {produto.usuarios.map(funcionario => (
                                <li className="nome-funcionario" key={funcionario.id}>
                                    {funcionario.userName}
                                </li>
                                ))}
                            </ul>
                        </div>

                       
                        {/* {userIsAdmin === true && <p className="btn-editar" onClick={() => handleOpenEditModal(produto)}>Editar</p>}  */}
                    </li>
                ))}
            </ul>
            </div> 

            <Modal isOpen={isModalOpen} onClose={handleCloseEditModal}>
            <InputCustomizado
                    name="nomeProduto"
                    placeholder="Nome do serviço"
                    color="black"
                    type="string"
                    required
                    value={nomeProduto}
                    onChange={e => setNomeProduto(e.target.value)}
                />
                <InputCustomizado
                    name="descricaoProduto"
                    placeholder="Descrição do serviço"
                    color="black"
                    type="string"
                    required
                    value={descricaoProduto}
                    onChange={e => setDescricaoProduto(e.target.value)}
                />
                {/* <input
                    type="file"
                    accept="image/*"
                    onChange={handleImgChange}
                /> */}
              
                 <Button text='Editar' background='#c6c6c6'  onClick={handleEditProduto}  />
                 <Button text='Excluir' background='#c6c6c6'  onClick={handleExcluirProduto}  />

            </Modal>

        </div>
    );
}

export default ListaServico;
