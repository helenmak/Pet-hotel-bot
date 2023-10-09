import React from 'react';
import classnames from 'classnames'

import styles       from './Modal.module.css';


const Modal = (props) => {
  const handleDialogWrapperClick = (event) => {
    const {target} = event
    
    if (target.id === 'dialog-wrapper') {
      props.onClose()
    }
  }
  
  
  return (
    <div
      id='dialog-wrapper'
      className={classnames(styles.dialogWrapper, props.open && styles.dialogWrapperOpen)}
      onClick={handleDialogWrapperClick}
    >
      <dialog className={classnames(styles.dialog, props.className || styles.commonDialog)} open={props.open}>
        {props.children}
      </dialog>
    </div>
  );
};

export default Modal;
