import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// apollo
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
// scenes
import Main from 'scenes/Main';
import Signin from 'scenes/Signin';
import Signup from 'scenes/Signup';
import Contracts from 'scenes/Contracts';
import NewContract from 'scenes/NewContract';
import NotFound from 'scenes/NotFound';
// components
import PrivateRoute from './Private';
import Header from 'components/Header';
// normalize CSS
import { Normalize } from 'styled-normalize';
// utils
import { isLoggedIn } from 'utils';
import ApolloConfigs from './apolloConfigs';
import history from './history';
// styls
import GlobalStyles from 'styles/GlobalStyles';

const { link, cache, defaultOptions } = ApolloConfigs;

const client = new ApolloClient({
    link,
    cache,
    defaultOptions,
});

const hasAuth = isLoggedIn();

const routes = (
    <ApolloProvider client={client}>
        <Router history={history}>
            <Normalize />
            <GlobalStyles />
            <Header />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <PrivateRoute
                    authed={hasAuth}
                    path="/contracts"
                    component={Contracts}
                />
                <PrivateRoute
                    authed={hasAuth}
                    path="/new"
                    component={NewContract}
                />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    </ApolloProvider>
);
export default routes;
