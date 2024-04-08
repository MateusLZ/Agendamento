import "./Style.css"
import React from "react";
import Close from "../../images/Cross.svg"




const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
         
          <img src={Close} className="close-button" onClick={onClose} alt="" />
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;