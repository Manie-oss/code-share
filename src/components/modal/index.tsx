import React from 'react';
import './style.css';

interface ModalInterface {
  handleClose: ()=>void, 
  show: boolean,
  children: React.ReactNode
}

export function Modal({ handleClose, show, children }: ModalInterface){
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};
