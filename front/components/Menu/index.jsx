import React, { useCallback } from 'react';
import { CreateMenu, CloseModalButton } from '@components/Menu/style';
import PropTypes from 'proptypes';

const Menu = ({ children, show, onCloseModal, menuStyle, closeButton = true, }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <>
      <CreateMenu onClick={onCloseModal}>
        <div style={menuStyle} onClick={stopPropagation}>
          {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
          {children}
        </div>
      </CreateMenu>
    </>
  );
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  menuStyle: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Menu;