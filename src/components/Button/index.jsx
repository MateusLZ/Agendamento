import "./style.css"
import React from "react"


const ButtonCustomizado = ({
    type,
    text,
    onClick,
    
}) => {

    
    return (  
        <button
            type={type}
            text={text}
            onClick={onClick}>
                {text}
                </button>
    )
}
 
export default ButtonCustomizado