import React, { useState,useContext } from "react"
import "./Style.css"
import Navegacao from "../../components/Navegacao/Navegacao"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6"
import TabelaAgenda from "../../components/TabelaAgenda/TabelaAgenda"
import AgendaUser from "../../components/AgendaUser/AgendaUser"
import AgendamentosMarcados from "../../components/AgendamentosMarcados/AgendamentosMarcados"
import { UserContext } from "../../Context/Provider"



function Agenda() {
  const [dataAtual, setDataAtual] = useState(new Date())
  const { userIsAdmin, userRole } = useContext(UserContext)

  const avancarDia = () => {
    const novaData = new Date(dataAtual)
    novaData.setDate(novaData.getDate() + 1)
    setDataAtual(novaData)
  }

  const retrocederDia = () => {
    const novaData = new Date(dataAtual)
    novaData.setDate(novaData.getDate() - 1)
    setDataAtual(novaData)
  }

  const options = {  year: 'numeric', month: 'long', day: 'numeric' }
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR', options)
  const dataDigito = { day: '2-digit', month: '2-digit', year: '2-digit' }
  const dataFormatadaDigito = dataAtual.toLocaleDateString('pt-BR', dataDigito)

  return (
    <div className="container-home">
      <div className="div-container">

</div>
      <Navegacao />

      <div className="telaPrincipal">
        <div className="info-home">

          <div>
            <p>
              Agendamentos 
            </p>
          </div>

        </div>

        {(userRole === "USER" && (
            <div className="container-agenda-user">
              <div>
                <h2 className="title-agenda">Meus Horários</h2>
              </div>

              <div>
              <AgendaUser/>
              </div>

            </div>
))}

  {(userRole != "USER" && (
    <div className="lista-agenda">
          <div className="lista-agenda-container">

          <div className="dia-Atual">
          <span
            id="prev"
            className="material-symbols-rounded"
            onClick={retrocederDia}
          >
            <FaChevronLeft className='chevron' />
          </span>

          <span
            id="next"
            className="material-symbols-rounded"
            onClick={avancarDia}
          >
           <FaChevronRight className='chevron'  />
          </span>
            <h2 className="data_formatada tipografia-data">{dataFormatada}</h2>
           
          </div>

    <div>
         <TabelaAgenda onDateSelect={dataFormatadaDigito} />
    </div>
        </div>

        <div>
          <AgendamentosMarcados onDateSelect={dataFormatadaDigito} />
        </div>
         
        </div>

  ))}
        
      </div>
    </div>
  )
}

export default Agenda
