import "./Style.css";
import Navegacao from "../../components/Navegacao/Navegacao";
import { UserContext } from "../../Context/Provider";
import { useContext,useState } from "react";
import Calendario from "../../components/Calendario/Calendario"
import Tabela from "../../components/Tabela/Tabela"
import { FaWhatsapp,FaInstagram  } from "react-icons/fa";
import Agendamentos from "../../components/Agendamentos/Agendamentos.jsx";



function Home() { 
  const [selectedDate, setSelectedDate] = useState(null);
  const [exclusao, setExclusao] = useState(false);
  const { userName, token } = useContext(UserContext);


  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
 
  const handleAttTable = (value) => {
    setExclusao(value);
    // Define exclusao como false após 2 segundos
    setTimeout(() => {
      setExclusao(false);
    }, 2000);
  };
  const isAuthenticated = !!token; // Verifica se o token existe

  return (
    <div className="container-home">
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
              <FaInstagram size={24} />
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
            <h2 className="title-agenda">Meus Horários</h2>
            {isAuthenticated && <Agendamentos onAgendamentoExcluido={handleAttTable} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;