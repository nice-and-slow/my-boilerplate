import styled from 'styled-components/macro';
import { primaryColor, headerFontSize } from 'styles/variables';

export const AppBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 1em;
    background-color: ${primaryColor};
    color: #fff;
    align-items: center;
`;

export const AppBarContent = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    padding-left: 20px;
`;

export const AppBarUtils = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

export const AppBarTitle = styled.h1`
    margin: 0 1em;
    font-size: ${headerFontSize};
`;

export const AppBarButton = styled.button`
    background: none;
    border: 0;
    cursor: pointer;
    color: #fff;
`;
