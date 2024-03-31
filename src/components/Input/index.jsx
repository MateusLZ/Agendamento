import "./Style.css"
import React from "react";



const InputCustomizado = ({ name, placeholder, onChange, type,color,value }) => {
    const Style = {
        color: color || 'white' // Define o background recebido da propriedade ou transparente se não for definido
    };
    return (  
        <>
        <input
            style={Style}
           className="input"
           name={name}
           value={value}
           placeholder={placeholder}
           onChange={onChange}
           type={type}
         />
        </>
    );
}
 
export default InputCustomizado;