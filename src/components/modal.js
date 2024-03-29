import React from "react";
import '../styles/modal.css';
import { useNavigate } from "react-router-dom";

const Modal = ({ auth,isOpen, onClose, onInputChange, onAddNew }) => {
  const navigate = useNavigate()
  console.log(auth)
  if (!isOpen) {
    return null;
  }
  if(auth){
    navigate("/");
  }
  if(!auth){
  return (
    <div className="modal">
      <div className="modal-content p-10 w-96 h-44 flex flex-col justify-center items-center">
        {/* Modal content, e.g., input fields */}
        <input
          type="text"
          placeholder="Enter Request"
          onChange={(e) => onInputChange(e, 1)}
          style={{borderWidth:1, padding:8, borderRadius:10}}
        />
        

        {/* Buttons, e.g., Add and Cancel */}
        <div className="flex flex-row justify-between mt-5">
            <button className="mr-5" onClick={onAddNew}>Add</button>
            <button onClick={onClose}>Cancel</button>
        </div>
        
      </div>
    </div>
  );
};
}

export default Modal;
