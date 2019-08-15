import styled from 'styled-components/macro';
import { baseTextColor, primaryButtonColor } from 'styles/variables';

export const Nav = styled.nav`
    display: block;
`;

export const Wrap = styled.div`
    display: block;
    position: absolute;
    top: 1px;
    left: 0;
    padding-top: 14px;
    padding-left: 12px;
    z-index: 10;
    user-select: none;
`;

export const Input = styled.input`
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 55px;
    height: 50px;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
    -webkit-touch-callout: none;
`;

export const HamburgerButtonWrap = styled.button`
    display: block;
    border: 0;
    background: none;
`;

export const HamburgerSpan = styled.span`
    display: block;
    position: relative;
    width: 30px;
    height: 4px;
    margin-bottom: 5px;
    border-radius: 3px;
    z-index: 1;

    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;

    background: ${props => (props.isOpen ? '#232323' : '#fff')};
    opacity: 1;
    transform: ${props =>
        props.isOpen ? 'rotate(45deg) translate(-1px, -1px)' : 'none'};

    &:first-child {
        transform-origin: 0 0;
    }

    &:nth-child(2) {
        opacity: ${props => (props.isOpen ? 0 : 1)};
        transform: ${props =>
            props.isOpen ? 'rotate(0deg) scale(0.2, 0.2)' : 'none'};
    }

    &:last-child {
        transform-origin: 0 100%;
        transform: ${props =>
            props.isOpen ? 'rotate(-45deg) translate(0, 0)' : 'none'};
    }
`;

export const Menu = styled.ul`
    position: fixed;
    width: 300px;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    padding: 50px;
    padding-top: 100px;
    background: #ededed;
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    transform-origin: 0% 0%;
    transform: ${props =>
        props.isOpen ? 'scale(1, 1) translate(0, 0)' : 'translate(-100%, 0)'};
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
`;

export const MenuItem = styled.li`
    padding: 10px 0;
`;

export const MenuLink = styled.div`
    display: block;
`;
export const MenuButton = styled.button`
    display: block;
    font-size: 22px;
    color: ${baseTextColor};
    transition: color 0.3s ease;
    border: 0;
    background: none;
    cursor: pointer;

    &:hover {
        color: ${primaryButtonColor};
    }
`;
