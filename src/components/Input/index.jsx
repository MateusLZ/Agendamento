import "./Style.css"
import React from "react";



const InputCustomizado = ({ name, placeholder, onChange, type,color,value }) => {
    
    return (  
        <>
        <input
           
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