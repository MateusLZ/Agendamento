import "./Style.css";
import Navegacao from "../../components/Navegacao/Navegacao";
import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Context/Provider";
import InputCustomizado from "../../components/Input";
import ButtonCustomizado from "../../components/Button";
import CadastrarFuncionario from "../../components/CadastraFuncionario/CadastraFuncionario";
import ListarFuncionarios from "../../components/ListarFuncionarios/ListarFuncionarios";



function Funcionarios() {
  const [atualizarLista, setAtualizarLista] = useState(false);



  const atualizarListaFuncionarios = () => {
    setAtualizarLista(true);
};

 
  return (
    <div className="container-home">
      <div className="div-container">

</div>
        <Navegacao/>

      <div className="telaPrincipal">
        <div>
        <p>Funcionarios</p>
        <CadastrarFuncionario atualizarListaFuncionarios={atualizarListaFuncionarios} />
        </div>

        <div>
        <ListarFuncionarios atualizarLista={atualizarLista}  setAtualizarLista={setAtualizarLista} />
        </div>
      </div>
    </div>
  );
}

export default Funcionarios;
