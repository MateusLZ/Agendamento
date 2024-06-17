import "./Style.css"
import  { useContext } from "react"
import NotAcessIMG from '../../images/notAcess.gif'
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../Context/Provider"




function AcessoNegado() {
  const { userRole } = useContext(UserContext)
  console.log(userRole)

  const navigate = useNavigate()

  const handleNavigateToAgendamentos = () => {
    if(userRole != ''){
      navigate("/loading")
    }else{
      navigate("/")
    }
}

  return(
    <div className="container-notAcess">
      <div >
      <img className="gif-notAcess" src={NotAcessIMG} alt="" />
      </div>

      <div  className="btn-salvar color-btn-verme" onClick={handleNavigateToAgendamentos}>
                <p>Voltar</p>
            </div>
    </div>
  );
}

export default AcessoNegado
