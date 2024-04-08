import React, { useState,useContext } from "react";
import "./Style.css";
import Navegacao from "../../components/Navegacao/Navegacao";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import TabelaAgenda from "../../components/TabelaAgenda/TabelaAgenda";
import { UserContext } from "../../Context/Provider";



function Agenda() {
  // Estado para armazenar a data atual
  const [dataAtual, setDataAtual] = useState(new Date());
  const { userIsAdmin } = useContext(UserContext);


  // Função para avançar um dia
  const avancarDia = () => {
    const novaData = new Date(dataAtual);
    novaData.setDate(novaData.getDate() + 1);
    setDataAtual(novaData);
  };

  // Função para retroceder um dia
  const retrocederDia = () => {
    const novaData = new Date(dataAtual);
    novaData.setDate(novaData.getDate() - 1);
    setDataAtual(novaData);
  };

  // Formatar a data atual
  const options = {  year: 'numeric', month: 'long', day: 'numeric' };
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR', options);
  const dataDigito = { day: '2-digit', month: '2-digit', year: '2-digit' };
  const dataFormatadaDigito = dataAtual.toLocaleDateString('pt-BR', dataDigito);

  return (
    <div className="container-home">
      <Navegacao />

      <div className="telaPrincipal">
        <div className="info-home">

          <div>
            <p>
              Agendamentos 
            </p>
          </div>

            {

userIsAdmin &&
          <div className="dia-Atual">
          <span
            id="prev"
            className="material-symbols-rounded"
            onClick={retrocederDia}
          >
            <FaChevronLeft className='chevron' />
          </span>
            <h2 className="data_formatada">{dataFormatada}</h2>
            <span
            id="next"
            className="material-symbols-rounded"
            onClick={avancarDia}
          >
           <FaChevronRight className='chevron'  />
          </span>
          </div>

        }

          <div className="icons">
          
          
            <div className="bola">
              <FaWhatsapp size={24} />
            </div>
            <div className="bola">
              <FaInstagram size={24} />
            </div>
          </div>
        </div>

        <div className="lista-agenda">
        {userIsAdmin &&  <TabelaAgenda onDateSelect={dataFormatadaDigito} />}

         
        </div>
      </div>
    </div>
  );
}

export default Agenda;
