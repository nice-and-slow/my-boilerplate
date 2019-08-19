import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// utils
import { isLoggedIn } from 'utils';

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
}
