import { ImExit } from "react-icons/im"
import HomeSvg from "../../images/home.svg"
import Calendario from "../../images/calender.svg"
import Maleta from "../../images/maleta.svg"
import Perfil from "../../images/perfil.svg"
import addUser from "../../images/addUser.svg"
import config from "../../images/config.svg"
import React from "react"

import "./style.css"

const Botao = ({
    type,
    text,
    onClick,
    icon,
   
}) => {
    
    const renderIcon = (iconName) => {
        switch (iconName) {
            case 'home': 
                return <img  src={HomeSvg} style={{ width: '22px' }}  />
            case 'calendar':
                return  <img  src={Calendario} style={{ width: '22px' }}  />
            case 'user':
                return  <img  src={Perfil} style={{ width: '22px' }}  />
            case 'briefcase':
                return  <img  src={Maleta} style={{ width: '22px' }}  />
            case 'users':
                return <img  src={addUser} style={{ width: '23px' }}  />
            case 'config':
                return <img  src={config} style={{ width: '23px' }}  />
            case 'exit':
                return <ImExit size={22}  />
            default:
                return null
        }
    }

    

    return ( 
        <div className="botao-menu" >
        <li type={type}
            onClick={onClick}
            className='lista-botao'
            
            >
           {icon && <p className='string-botao'>{renderIcon(icon)}</p>}
            <p className='string-botao'>{text}</p>
        </li>
        </div>

    )
}
 
export default Botao
