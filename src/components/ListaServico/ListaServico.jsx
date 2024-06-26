import React, { useState, useEffect,useContext } from "react"
import axios from "axios"
import { getDownloadURL, ref } from "firebase/storage"
import { UserContext } from "../../Context/Provider"
import Modal from "../Modal"
import InputCustomizado from "../Input"
import { storage } from "../../firebase"
import MultipleOptionsSelectMenu from "../MultipleOptionsSelectMenu/MultipleOptionsSelectMenu"
import Editar from "../../images/Edit.svg"
import "./Style.css"


const ListaServico = ({ produtoAdicionado }) => {
    const [produtos, setProdutos] = useState([])
    const [imgURLs, setImgURLs] = useState({}) 
    const { userIsAdmin,apiUrl } = useContext(UserContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [nomeProduto, setNomeProduto] = useState("")
    const [descricaoProduto, setDescricaoProduto] = useState("")
    const [idProduto, setIdProduto] = useState("")
    const [userIds, setUserIds] = useState([])
    const [imgURL, setImgURL] = useState('')
    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionariosSelecionados, setFuncionariosSelecionados] = useState([]);
    const token = localStorage.getItem("token")


    useEffect(() => {
        const buscarFuncionarios = async () => {
            try {
                const response = await axios.get(`${apiUrl}/admin/listarPorRole/funcionario`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFuncionarios(response.data.content);
            } catch (error) {
                console.error("Erro ao recuperar os dados dos funcionários:", error)
            }
        }
        buscarFuncionarios()
    }, [token])
    
   
    const handleFuncionariosSelecionadosChange = (values) => {
        const selectedIds = values.map(value => value.split(':')[1])
        setUserIds(selectedIds)
      }


    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    
    const handleOpenEditModal = (produto) => {
        setNomeProduto(produto.nome);
        setDescricaoProduto(produto.descricao);
        setIdProduto(produto.codigo);
        const funcionariosComSelecao = funcionarios.map(funcionario => ({
            ...funcionario,
            selecionado: produto.usuarios.some(usuario => usuario.id === funcionario.id)
        }));
        const selectedUserIds = funcionariosComSelecao
            .filter(funcionario => funcionario.selecionado)
            .map(funcionario => funcionario.id);
        setFuncionarios(funcionariosComSelecao);
        setUserIds(selectedUserIds); 
        setIsModalOpen(true);
    };


    const handleCloseEditModal = () => {
        setNomeProduto("");
        setDescricaoProduto("");
        setIdProduto("");
        setUserIds([]);
        setIsModalOpen(false);
    };

    const getImgURL = async (nomeImagem) => {
        const storageRef = ref(storage, nomeImagem)
        const url = await getDownloadURL(storageRef)
        return url
    }

    const fetchProdutos = async () => {
        try {
            const response = await axios.get(`${apiUrl}/listar`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error)
        }
    }

    useEffect(() => {
        fetchProdutos()
    },  [produtoAdicionado])
    
    useEffect(() => {
        const fetchImgURLs = async () => {
            const urls = {}
            await Promise.all(produtos.map(async (produto) => {
                const imgURL = await getImgURL(produto.nomeImagem)
                urls[produto.codigo] = imgURL
            }))
            setImgURLs(urls)
        }

        fetchImgURLs()

    }, [produtos])

    
    const handleEditProduto = () => {
        const produtoAtualizado = {
            nome: nomeProduto,
            descricao: descricaoProduto,
            usuarios: userIds.map(id => ({ id }))  
        };

        axios.put(`${apiUrl}/editar/${idProduto}`, produtoAtualizado, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log("Produto editado com sucesso:", response.data);
                handleCloseEditModal();
                fetchProdutos();
            })
            .catch((error) => {
                console.error("Erro ao editar produto:", error);
            });
    };

    const handleExcluirProdutoDoUsuario = () => {
        axios.delete(`${apiUrl}/remover/${idProduto}/usuarios`, {
            data: userIds,
            headers: {
                ...config.headers,
                'Content-Type': 'application/json' // Informa que o conteúdo da solicitação é JSON
            }
        })
        .then(response => {
            console.log("Relacionamentos entre produto e usuários removidos com sucesso:", response.data)
            handleExcluirProduto()
        })
        .catch(error => {
            console.error("Erro ao remover relacionamentos entre produto e usuários:", error)
        })
    }
    

    const handleExcluirProduto = () => {
        axios.delete(`${apiUrl}/remover/${idProduto}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log("Produto removido com sucesso:", response.data);
                handleCloseEditModal();
                fetchProdutos();
            })
            .catch((error) => {
                console.error("Erro ao remover produto:", error);
            });
    };

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
                                            {funcionario.userName.split(' ')[0]}
                                        </li>
                                    ))}
                            </ul>
                        </div>

                       
                        {userIsAdmin === true &&
                        <img  className="btn-editar" size={17} onClick={() => handleOpenEditModal(produto)} src={Editar} alt="" />
                       } 
                    </li>
                ))}
            </ul>
            </div> 

        

            <Modal isOpen={isModalOpen} onClose={handleCloseEditModal}>
                <div className="title-modal-table">
                    <h3>Editar Serviço</h3>
                </div>
             

                <div>
                <p>Novo serviço</p>
                <InputCustomizado
                    name="nomeProduto"
                    placeholder="Nome do serviço"
                    color="black"
                    type="string"
                    required
                    value={nomeProduto}
                    onChange={e => setNomeProduto(e.target.value)}
                />
                </div>

                <div>
                    <p>Profissionais</p>
                    <MultipleOptionsSelectMenu
                        items={funcionarios}
                        labelKey="userName"
                        selectedItems={funcionarios.filter((funcionario) => funcionario.selecionado)}
                        onItemsSelecionadosChange={handleFuncionariosSelecionadosChange}
                    />
                    </div>

                <div>
                    <p>Descrição</p>
                    <InputCustomizado
                    name="descricaoProduto"
                    placeholder="Descrição do serviço"
                    color="black"
                    type="string"
                    required
                    value={descricaoProduto}
                    onChange={e => setDescricaoProduto(e.target.value)}
                />
                </div>

                    

                {/* <div>
                    <input type="file" accept="image/*" onChange={handleImgChange} />
                </div> */}
                <div className="button-modal-table">
            <p onClick={handleCloseEditModal} className="buttonPCancelar color-preto">Cancelar</p>
            <p onClick={handleEditProduto} className="buttonPVermelho color-vermelho">Cadastrar</p>
            <p onClick={handleExcluirProdutoDoUsuario} className="buttonPCancelar color-preto">Excluir</p>
          </div>
            </Modal>

        </div>
    )
}

export default ListaServico
