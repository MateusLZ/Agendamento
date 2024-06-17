// Produto.js
import React, { useState, useEffect } from "react"
import Modal from "../Modal"
import InputCustomizado from "../Input"
import axios from "axios"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "../../firebase"
import MultipleOptionsSelectMenu from "../MultipleOptionsSelectMenu/MultipleOptionsSelectMenu"
import { FaPlus } from "react-icons/fa6"
import "./Style.css"



const Produto = ({ onProdutoAdicionado }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [nomeProduto, setNomeProduto] = useState("")
    const [marcaProduto, setMarcaProduto] = useState("")
    const [imgURL, setImgURL] = useState("")
    const [progress, setProgress] = useState(0)
    const [funcionarios, setFuncionarios] = useState([])
    const [idsSelecionados, setFuncionariosSelect] = useState([])


    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setNomeProduto("")
        setMarcaProduto("")
    }

    const handleImgChange = (e) => {
        if (e.target.files[0]) {
            setImgURL(e.target.files[0])
        }
    }

    const handleCadastrarProduto = () => {
        if (!imgURL) {
            console.error("Selecione uma imagem antes de cadastrar o produto.")
            return
        }
    
        const storegaRef = ref(storage, `images/${imgURL.name}`)
        console.log(storegaRef)
        const uploadTask = uploadBytesResumable(storegaRef, imgURL)
    
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress)
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setImgURL(url)
                })
            }
        )
    
        
    
        const novoProduto = {
            produto: {
                nome: nomeProduto,
                descricao: marcaProduto,
                nomeImagem: `images/${imgURL.name}`,
            },
            userIds: idsSelecionados, // Aqui estão os IDs dos funcionários selecionados
        }
    
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    
        axios
            .post("http://localhost:8080/cadastrar", novoProduto, config)
            .then((response) => {
                console.log("Produto cadastrado com sucesso:", response.data)
                handleCloseModal()
                onProdutoAdicionado()
            })
            .catch((error) => {
                console.error("Erro ao cadastrar produto:", error)
                handleCloseModal()
            })
    }
    

   
    const handleFuncionarioCheckboxChange = (id) => {
        console.log("ID do funcionário:", id)
        setFuncionarios(
            funcionarios.map((funcionario) =>
                funcionario.id === id ? { ...funcionario, selecionado: !funcionario.selecionado } : funcionario
            )
        )
    }

    useEffect(() => {
        // Função para buscar os funcionários
        const buscarFuncionarios = async () => {
            try {
                const token = localStorage.getItem("token")
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }

                const response = await axios.get("http://localhost:8080/admin/listarPorRole/funcionario", config)
                setFuncionarios(response.data.content.map((funcionario) => ({ ...funcionario, selecionado: false })))
            } catch (error) {
                console.error("Erro ao recuperar os dados dos funcionários:", error)
            }
        }

        buscarFuncionarios()
    }, [])

    const handleFuncionariosSelecionadosChange = (values) => {
        const selectedIds = values.map(value => value.split(':')[1])
        setFuncionariosSelect(selectedIds)
        console.log(idsSelecionados)
      }
      

    return (
        <div className="button-cadastrar">
            <div className="btn-cadastrar">
            <FaPlus/>
            <p onClick={handleOpenModal} >Novo Serviço </p>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="title-modal-table">
                    <h3>Novo Serviço</h3>
                </div>
                <div className="txt-modal-table">
                    <p className="color-preto">Estamos quase lá!</p>
                    <p className="color-cinza">Para cadastrar um novo serviço, preencha os campos abaixo e insira novas imagens.</p>
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
                    onChange={(e) => setNomeProduto(e.target.value)}
                />
                </div>

                <div>
                    <p>Profissionais</p>
                    <MultipleOptionsSelectMenu
                        items={funcionarios}
                        labelKey="userName"
                        onItemsSelecionadosChange={handleFuncionariosSelecionadosChange}
                        />

                    </div>

                <div>
                    <p>Descrição</p>
                <InputCustomizado
                    name="marcaProduto"
                    placeholder="Marca do serviço"
                    color="black"
                    type="string"
                    required
                    value={marcaProduto}
                    onChange={(e) => setMarcaProduto(e.target.value)}
                />
                </div>

                    

                <div>
                    <input type="file" accept="image/*" onChange={handleImgChange} />
                </div>
                <div className="button-modal-table">
            <p onClick={handleCloseModal} className="buttonPCancelar color-preto">Cancelar</p>
            <p onClick={handleCadastrarProduto} className="buttonPVermelho color-vermelho">Cadastrar</p>
          </div>
            </Modal>
        </div>
    )
}
 
export default Produto
