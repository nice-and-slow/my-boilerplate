import styled from 'styled-components/macro';

import { borderColor, smallFontSize, errorTextColor } from 'styles/variables';

export const CheckboxWrapper = styled.div`
    position: relative;
    min-width: 17px;
    min-height: 15px;
    line-height: 17px;
`;

export const Input = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    outline: 0;
    z-index: -1;

    &:checked ~ span::after {
        opacity: 1;
    }
`;

export const Label = styled.label`
    position: relative;
    display: flex;
    user-select: none;
    cursor: pointer;
    align-items: center;
`;

export const Span = styled.span`
    display: inline-block;
    position: relative;
    width: 16px;
    height: 16px;
    margin-right: 0.4em;
    vertical-align: middle;
    background-color: #fff;
    transition: border 0.1s ease, opacity 0.1s ease, transform 0.1s ease,
        box-shadow 0.1s ease;
    border: 1px solid ${borderColor};

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 3px;
        width: 7px;
        height: 11px;
        border: 2px solid #000;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(0.7);
        opacity: 0;
    }
`;

export const Error = styled.div`
    display: block;
    margin-top: 5px;
    font-size: ${smallFontSize};
    color: ${errorTextColor};
`;
