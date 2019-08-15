import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router';
// apollo
import { useApolloClient } from '@apollo/react-hooks';
// utils
import { isLoggedIn } from 'utils';
// styles
import { AppBarButton } from './styles';

const LogInOutButton = ({ history }) => {
    const client = useApolloClient();

    const login = () => {
        history.push('/signin');
    };

    const logOut = () => {
        client.resetStore && client.resetStore();
        localStorage.removeItem('authToken');
        history.push('/signin');
    };

    const button = isLoggedIn() ? (
        <AppBarButton type="button" onClick={logOut}>
            LOGOUT
        </AppBarButton>
    ) : window.location.pathname !== '/signin' ? (
        <AppBarButton type="button" onClick={login}>
            LOGIN
        </AppBarButton>
    ) : null;
    return button;
};

export default withRouter(LogInOutButton);

LogInOutButton.propTypes = {
    client: PropTypes.any,
};

LogInOutButton.defaultProps = {
    client: {},
};
