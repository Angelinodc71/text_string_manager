import React, { useRef } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => {
  const ref = useRef(null);
  useOutsideClick(ref, onClose);
  
  return (
    <dialog>
      <div className="modal-content" ref={ref}>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
