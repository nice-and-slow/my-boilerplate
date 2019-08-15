import styled from 'styled-components/macro';

export const Header = styled.div`
    display: flex;
    margin-bottom: 1em;
    align-items: center;
`;

export const Title = styled.h2`
    font-size: 24px;
`;

export const ButtonWrap = styled.div`
    margin-left: auto;
`;

export const List = styled.div`
    border-top: 1px solid #dfe3e8;
`;

export const ListItem = styled.div`
    background-color: #fff;
    border-bottom: 1px solid #dfe3e8;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #f9fafb;
    }
`;

export const ItemWrap = styled.div`
    display: flex;
    padding: 1.2em 1em;
`;

export const Item = styled.div`
    padding: 0 1em;
    flex: 1;
`;

export const SpinnerWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 200px);
`;
