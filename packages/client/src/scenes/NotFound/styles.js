import styled from 'styled-components/macro';
import { primaryColor, primaryButtonColor } from 'styles/variables';

export const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 200px);
`;

export const Content = styled.div`
    color: ${primaryButtonColor};
`;

export const Text = styled.div`
    margin-top: 2em;
    font-size: 18px;
    font-weight: 700;
    color: ${primaryColor};
`;
