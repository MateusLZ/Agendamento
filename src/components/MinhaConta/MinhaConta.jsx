// Produto.js
import React, { useState, useEffect,useContext } from "react";
import { UserContext } from "../../Context/Provider";
import InputCustomizado from "../../components/Input";


import "./Style.css"

const MinhaConta = () => {
    const { userName } = useContext(UserContext);

   
    return (
       <div className="container-config">
        <div className="Config-minhaConta">
            <p className="tipo-config-title">Minha Conta</p>
            <p className="tipo-subtitle-config">Aqui você pode editar e adicionar suas informações pessoais.</p>
        </div>

        <div className="config-minhaContaInp" >
            <ul>
                <li>
                    <p  className="tipo-subtitle-config">Nome</p>
                    <InputCustomizado
              name="userName"
              placeholder={userName}
              onChange={(e) => setCredentials({ ...credentials, userName: e.target.value })}
              type="email"
              required
            />
                </li>
                <li>
                    <p  className="tipo-subtitle-config">Senha atual</p>
                    <InputCustomizado
              name="userName"
              placeholder={userName}
              onChange={(e) => setCredentials({ ...credentials, userName: e.target.value })}
              type="email"
              required
            />
                </li>
                <li>
                    <p  className="tipo-subtitle-config">Nova senha</p>
                    <InputCustomizado
              name="userName"
              placeholder={userName}
              onChange={(e) => setCredentials({ ...credentials, userName: e.target.value })}
              type="email"
              required
            />
                </li>
            </ul>

            <ul>
                <li>
                    <p  className="tipo-subtitle-config">Celular</p>
                    <InputCustomizado
              name="userName"
              placeholder={userName}
              onChange={(e) => setCredentials({ ...credentials, userName: e.target.value })}
              type="email"
              required
            />
                </li>
                <li>
                    <p  className="tipo-subtitle-config">Email</p>
                    <InputCustomizado
              name="userName"
              placeholder={userName}
              onChange={(e) => setCredentials({ ...credentials, userName: e.target.value })}
              type="email"
              required
            />
                </li>
                <li>
                    <p  className="tipo-subtitle-config">Nova senha</p>
                    <InputCustomizado
              name="userName"
              placeholder={userName}
              onChange={(e) => setCredentials({ ...credentials, userName: e.target.value })}
              type="email"
              required
            />
                </li>
            </ul>
            
        </div>
       </div>
    );
};

export default MinhaConta;
