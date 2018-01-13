import * as React from 'react';
import * as classNames from 'classnames';
import './Modal.css';

interface ModalProps {
  isOpen?: boolean;
}

const Modal: React.SFC<ModalProps> = ({children, isOpen}) => (
  <div className={classNames('Modal', {'Modal_open': isOpen})}>
    <div className="Modal-Content">
      {children}
    </div>
  </div>
);

export default Modal;