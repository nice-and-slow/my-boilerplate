import React from 'react';
import { Dizzy } from 'styled-icons/fa-solid';
// styles
import { Wrap, Content, Text } from './styles';

const NotFound = ({ history }) => (
    <Wrap>
        <Content>
            <Dizzy size="150" />
            <Text>Page not found :(</Text>
        </Content>
    </Wrap>
);

export default NotFound;
