import React, { useCallback } from 'react';
import { CreateModal, CloseModalButton } from '@components/Modal/style';
import PropTypes from 'proptypes';

const Modal = ({ children, show, onCloseModal, }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }
  
  return (
    <>
      <CreateModal onClick={onCloseModal}>
        <div onClick={stopPropagation}>
          <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
          {children}
        </div>
      </CreateModal>
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;