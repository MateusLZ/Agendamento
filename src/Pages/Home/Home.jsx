import "./Style.css";
import Navegacao from "../../components/Navegacao/Navegacao";
import { UserContext } from "../../Context/Provider";
import { useContext } from "react";
import Calendario from "../../components/Calendario/Calendario"
import Tabela from "../../components/Tabela/Tabela"
import { FaWhatsapp,FaInstagram  } from "react-icons/fa";



function Home() { 
 
  const { userName } = useContext(UserContext);
 
  return (
    <div className="container-home">
        <Navegacao/>

      <div className="telaPrincipal">
        <div className="info-home">
          <div>
            <p>
              Bem-vinda , {userName}
            </p>
          </div>
          <div className="icons">
            <div className="bola">
              <FaWhatsapp size={24}/>
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
              <Tabela />
              </div>
            <div className="calendario">
            <Calendario/>

            </div>

          </div>

          <div className="info-horario">
          <p>oi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
