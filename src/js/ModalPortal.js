import { useEffect } from 'react';
import { createPortal } from "react-dom";

const ModalPortal = props => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('uk-modal', 'bg-close: true');
    modalRoot.id = props.id;

    useEffect(() => {
        document.body.appendChild(modalRoot);
        return () => {
            document.body.removeChild(modalRoot);
        }
    });

    return createPortal(props.children, modalRoot);
  }

  export default ModalPortal;
