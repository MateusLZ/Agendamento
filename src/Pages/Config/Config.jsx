import "./Style.css"
import Navegacao from "../../components/Navegacao/Navegacao"
import MinhaConta from "../../components/MinhaConta/MinhaConta.jsx"
import ConfigHorario from "../../components/ConfigHorario/ConfigHorario.jsx"
import React, { useState,useContext } from "react"
import { UserContext } from "../../Context/Provider"



function Profile() {
  const { userIsAdmin} = useContext(UserContext)
  const [isMinhaConta, setIsMinhaConta] = useState(true) 

  const toggleComponent = () => {
    setIsMinhaConta(!isMinhaConta)
  }
 
  return (
    <div className="container-home-config">
      <div className="div-container">

</div> 
        <Navegacao/>

      <div className="telaPrincipal-config">
       <div className="header-config">
            <p className="title-header">Configurações</p>
        </div>

        <div className="page-config">
        {userIsAdmin && (
            <div className="navigation-config">
              <ul>
                <li
                  className={`btn-navigation-config ${
                    isMinhaConta ? "select-btn" : ""
                  }`}
                  onClick={toggleComponent}
                >
                  <p>Minha conta</p>
                </li>

                <li
                  className={`btn-navigation-config ${
                    !isMinhaConta ? "select-btn" : ""
                  }`}
                  onClick={toggleComponent}
                >
                  <p>Horários</p>
                </li>
              </ul>
            </div>
          )}

            <div>
              {isMinhaConta ? <MinhaConta /> : <ConfigHorario />}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
