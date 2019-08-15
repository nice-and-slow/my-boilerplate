import styled from 'styled-components/macro';

export const ModalWrap = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 320px;
    min-height: 320px;
    z-index: 100;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
`;

export const Modal = styled.div`
    display: flex;
    position: relative;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 50vw;
    padding: 30px 20px;
`;

export const ModalContainer = styled.div`
    text-algin: center;
`;

export const ModalContent = styled.div`
    padding: 0.5em;
    margin-bottom: 1em;
`;
