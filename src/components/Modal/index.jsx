import "./Style.css"
import React from "react";



const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;