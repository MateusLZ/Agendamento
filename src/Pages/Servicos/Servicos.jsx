import React, { useState,useContext } from "react";
import "./Style.css";
import Navegacao from "../../components/Navegacao/Navegacao";
import Produto from "../../components/NovoProduto/Produto"
import ListaServico from "../../components/ListaServico/ListaServico"
import { UserContext } from "../../Context/Provider";



function Servicos() {
  const [produtoAdicionado, setProdutoAdicionado] = useState(false);
  const { userIsAdmin } = useContext(UserContext);
  
  
  const handleProdutoAdicionado = () => {
    setProdutoAdicionado(!produtoAdicionado); 
};

  return (
    <div className="container-home">
        <Navegacao/>

      <div className="telaPrincipal">

          <div className="cadastro-produto">
            {userIsAdmin && (
              <Produto onProdutoAdicionado={handleProdutoAdicionado}/>

            )}
          </div>

          <div className="produtos-lista">
            <ListaServico produtoAdicionado={produtoAdicionado}/>
          </div>
      </div>
    </div>
  );
}

export default Servicos;
