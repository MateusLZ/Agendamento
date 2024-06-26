import "./Style.css"
import Navegacao from "../../components/Navegacao/Navegacao"
import { UserContext } from "../../Context/Provider"
import React, { useContext,useState } from "react"
import Calendario from "../../components/Calendario/Calendario"
import Tabela from "../../components/Tabela/Tabela"
import { FaWhatsapp,FaInstagram  } from "react-icons/fa"
import Agendamentos from "../../components/Agendamentos/Agendamentos.jsx"
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"




function Home() { 
  const [selectedDate, setSelectedDate] = useState(null)
  const [exclusao, setExclusao] = useState(false)
  const { userName,userDataLoaded, token } = useContext(UserContext)
  const navigate = useNavigate()

  const handleNavigateToAgendamentos = () => {
    navigate("/agenda")
}

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }
 
  const handleAttTable = (value) => {
    setExclusao(value)
    setTimeout(() => {
      setExclusao(false)
    }, 2000)
  }
  const isAuthenticated = !!token 

  return (
    <div className="container-home">
      <div className="div-container">

</div>
      <Navegacao />

      <div className="telaPrincipal">
        <div className="info-home">
          <div>
            <p>Bem-vindo, {isAuthenticated ? userName : "visitante"}</p>
          </div>
          <div className="icons">
            <div className="bola">
              <FaWhatsapp size={24} />
            </div>

            <div className="bola">
              <a href="https://www.instagram.com/cabeloeartsalao/?hl=pt-br">
              <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="info-principal">
          <div className="table-calendar">
            <div className="tabela-horario">
              <h2 className="title-tabela">Horários disponíveis</h2>
              <Tabela onDateSelect={selectedDate} exclusao={exclusao} />
            </div>
            <div className="calendario">
              <Calendario onDateClick={handleDateSelect} />
            </div>
          </div>

          <div className="info-horario">
            <div className="mais-horarios">
            <h2 className="title-agenda">Meus Horários</h2>

              <FaArrowRightLong className="cursor-pointer" onClick={handleNavigateToAgendamentos} />
            </div>
            {isAuthenticated && <Agendamentos onAgendamentoExcluido={handleAttTable} />}
          </div>
        </div> 
      </div>
    </div> 
  )
}

export default Home