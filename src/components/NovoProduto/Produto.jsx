import "./Style.css"
import React, { useState } from "react";
import Button from "../Botao/Botao"
import Modal from "../Modal";
import InputCustomizado from "../Input";
import axios from "axios";
import { ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";



const Produto = ({ onProdutoAdicionado }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nomeProduto, setNomeProduto] = useState("");
    const [marcaProduto, setMarcaProduto] = useState("");
    const [imgURL, setImgURL] = useState('');
    const [progress, setProgress] = useState(0);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNomeProduto("")
        setMarcaProduto("")
    };

    const handleImgChange = (e) => {
        if (e.target.files[0]) {
            setImgURL(e.target.files[0]);
        }
    };
   

    const handleCadastrarProduto = () => {

        if (!imgURL) {
            console.error("Selecione uma imagem antes de cadastrar o produto.");
            return;
        }
        const storegaRef = ref(storage, `images/${imgURL.name}`)
        const uploadTask = uploadBytesResumable(storegaRef, imgURL)

        uploadTask.on(
            "state_changed",
            snapshot =>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes  ) * 100
                setProgress(progress)
            },
            error =>{
                console.log(error)
            }, 
            () =>{
                getDownloadURL(uploadTask.snapshot.ref).then(url =>{
                    setImgURL(url)
                })
            }
        )

        const novoProduto = {
            nome: nomeProduto,
            descricao: marcaProduto,
            nomeImagem: `images/${imgURL.name}`,
        };

        const token = localStorage.getItem("token");

        // Se você estiver usando um token JWT, inclua-o no cabeçalho da solicitação
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.post("http://localhost:8080/cadastrar", novoProduto, config)
        .then(response => {
            // Produto cadastrado com sucesso
            console.log("Produto cadastrado com sucesso:", response.data);
            // Feche o modal após cadastrar o produto
            handleCloseModal();
            onProdutoAdicionado();
        })
        .catch(error => {
            // Ocorreu um erro ao cadastrar o produto
            console.error("Erro ao cadastrar produto:", error);
            handleCloseModal();

        });
    };


  

    return (  
        <div className="button-cadastrar">
            <Button text='Cadastrar Serviços' onClick={handleOpenModal} />
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
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
                    name="marcaProduto"
                    placeholder="Marca do serviço"
                    color="black"
                    type="string"
                    required
                    value={marcaProduto}
                    onChange={e => setMarcaProduto(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImgChange}
                />
              
                 <Button text='Cadastrar' background='#c6c6c6' onClick={handleCadastrarProduto} />

            </Modal>
        </div>
    );
}

export default Produto;