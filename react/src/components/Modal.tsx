import React, { useRef } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => {
  const ref = useRef(null);
  useOutsideClick(ref, onClose);

  return (
    <div role='dialog' className="modal-overlay">
      <div className="modal-content" ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
