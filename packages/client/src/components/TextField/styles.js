import styled from 'styled-components/macro';

import {
    borderColor,
    baseTextColor,
    errorTextColor,
    smallFontSize,
} from 'styles/variables';

export const TextFieldWrap = styled.div`
    width: 100%;
    margin-bottom: 5px;
`;

export const TextFieldLabel = styled.label`
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
`;

export const TextFieldFloating = styled.span`
    position: absolute;
    top: 0.6em;
    left: 0.9rem;
    font-size: 0.6875em;
    margin-bottom: 0.6153846154em;
    color: ${baseTextColor};
    z-index: 1;
    transform: translateY(3px);
    transition-property: opacity, transform, -webkit-transform;
    transition-duration: 150ms;
    opacity: ${props => (props.isActive ? 1 : 0)};
`;

export const TextFieldInput = styled.input`
    display: inline-block;
    position: relative;
    width: 100%;
    height: 3.6em;
    font-size: inherit;
    padding: 1em;
    padding-top: ${props => (props.isLabelActive ? '2.1em' : '')};
    background-color: #fff;
    border: 0;
    box-shadow: 0 0 0 1px ${borderColor};
    transition: padding 150ms;
    appearance: none;

    &:focus {
        box-shadow: 0 0 0 2px primaryButtonColor;
    }
`;

export const TextFieldError = styled.div`
    display: block;
    font-size: ${smallFontSize};
    color: ${errorTextColor};
    margin-top: 5px;
`;
