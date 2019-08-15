import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// components
import Button from 'components/Button';
// styles
import { ModalWrap, Modal, ModalContainer, ModalContent } from './styles';

const ModalComponent = ({ isVisible, children, buttonText }) => {
    const [isModalVisible, setIsVisible] = useState(isVisible);

    const handleClick = () => {
        setIsVisible(false);
    };

    return isModalVisible
        ? ReactDOM.createPortal(
              <React.Fragment>
                  <ModalWrap>
                      <Modal>
                          <ModalContainer>
                              <ModalContent>{children}</ModalContent>
                              <div className="modal-btn-area">
                                  <Button
                                      content={buttonText ? buttonText : '확인'}
                                      primary
                                      block
                                      small
                                      onClick={handleClick}
                                  />
                              </div>
                          </ModalContainer>
                      </Modal>
                  </ModalWrap>
              </React.Fragment>,
              document.body,
          )
        : null;
};

ModalComponent.propTypes = {
    isVisible: PropTypes.bool,
    close: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    buttonText: PropTypes.string,
};

ModalComponent.defaultProps = {
    isVisible: false,
    close: () => {},
    children: React.createElement('div'),
    buttonText: '',
};

export default ModalComponent;
